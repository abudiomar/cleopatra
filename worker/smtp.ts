/**
 * Minimale SMTP-client voor Cloudflare Workers.
 *
 * Verstuurt één e-mail via de eigen mailserver (TransIP: smtp.transip.email,
 * poort 465, TLS vanaf de eerste byte) met de TCP-sockets van Workers.
 * Poort 25 is in Workers geblokkeerd; 465 werkt wel.
 *
 * Bewust klein gehouden: één verbinding, één bericht, AUTH PLAIN of LOGIN.
 * Tekst en HTML worden base64-gecodeerd, zodat er geen dot-stuffing of
 * regellengteproblemen kunnen ontstaan.
 */
import { connect, type Socket } from "cloudflare:sockets";

export type SmtpConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
};

export type Mail = {
  from: { name?: string; address: string };
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
};

type Reply = { code: number; lines: string[]; text: string };

const TIMEOUT_MS = 15_000;
const encoder = new TextEncoder();

/**
 * E-mailadres zonder tekens die in een header of SMTP-commando iets anders
 * kunnen betekenen (spaties, regeleinden, <>, quotes, komma's, ...).
 */
const ADDRESS_RE =
  /^[^\s<>()[\]\\,;:"@]+@[^\s<>()[\]\\,;:"@]+\.[^\s<>()[\]\\,;:"@]{2,}$/;

export function isValidAddress(value: string) {
  return ADDRESS_RE.test(value);
}

export async function sendMail(config: SmtpConfig, mail: Mail): Promise<void> {
  for (const address of [mail.from.address, mail.to, mail.replyTo]) {
    if (address !== undefined && !isValidAddress(address)) {
      throw new Error(`SMTP: ongeldig e-mailadres "${address}"`);
    }
  }

  const socket = connect(
    { hostname: config.host, port: config.port },
    { secureTransport: "on" },
  );

  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`SMTP: geen antwoord binnen ${TIMEOUT_MS / 1000}s`)),
      TIMEOUT_MS,
    );
  });

  const run = session(socket, config, mail);
  run.catch(() => {}); // voorkomt een 'unhandled rejection' als de timeout wint

  try {
    await Promise.race([run, timeout]);
  } finally {
    clearTimeout(timer);
    socket.close().catch(() => {});
  }
}

async function session(socket: Socket, config: SmtpConfig, mail: Mail) {
  const writer = socket.writable.getWriter();
  const replies = replyReader(socket.readable.getReader());

  // `step` komt in foutmeldingen terecht; de verstuurde regel zelf niet,
  // zodat het wachtwoord nooit in de logs belandt.
  async function expect(step: string, accepted: number[]) {
    const reply = await replies.next();
    if (!accepted.includes(reply.code)) {
      throw new Error(`SMTP ${step}: ${reply.code} ${reply.text}`);
    }
    return reply;
  }

  async function command(line: string, step: string, accepted: number[]) {
    await writer.write(encoder.encode(`${line}\r\n`));
    return expect(step, accepted);
  }

  await expect("verbinding", [220]);

  const ehlo = await command(
    `EHLO ${mail.from.address.split("@")[1]}`,
    "EHLO",
    [250],
  );
  const auth = ehlo.lines.find((l) => /^AUTH[ =]/i.test(l)) ?? "";

  if (/\bPLAIN\b/i.test(auth)) {
    const token = base64(`\0${config.username}\0${config.password}`);
    await command(`AUTH PLAIN ${token}`, "AUTH PLAIN", [235]);
  } else if (/\bLOGIN\b/i.test(auth)) {
    await command("AUTH LOGIN", "AUTH LOGIN", [334]);
    await command(base64(config.username), "AUTH LOGIN (gebruiker)", [334]);
    await command(base64(config.password), "AUTH LOGIN (wachtwoord)", [235]);
  } else {
    throw new Error(`SMTP: server biedt geen AUTH PLAIN of LOGIN aan (${auth || "geen AUTH"})`);
  }

  await command(`MAIL FROM:<${mail.from.address}>`, "MAIL FROM", [250]);
  await command(`RCPT TO:<${mail.to}>`, "RCPT TO", [250, 251]);
  await command("DATA", "DATA", [354]);
  await command(`${buildMessage(mail)}\r\n.`, "bericht", [250]);

  // Het bericht is afgeleverd. Netjes afsluiten, maar een trage of foute
  // reactie op QUIT mag de verzending niet alsnog laten mislukken.
  await Promise.race([
    command("QUIT", "QUIT", [221]),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ]).catch(() => {});
}

/** Leest SMTP-antwoorden; "250-..." betekent dat er nog regels volgen. */
function replyReader(reader: ReadableStreamDefaultReader<Uint8Array>) {
  const decoder = new TextDecoder();
  let buffer = "";

  async function readLine(): Promise<string> {
    for (;;) {
      const end = buffer.indexOf("\n");
      if (end !== -1) {
        const line = buffer.slice(0, end).replace(/\r$/, "");
        buffer = buffer.slice(end + 1);
        return line;
      }
      const { value, done } = await reader.read();
      if (done) throw new Error("SMTP: verbinding onverwacht gesloten");
      buffer += decoder.decode(value, { stream: true });
    }
  }

  return {
    async next(): Promise<Reply> {
      const lines: string[] = [];
      for (;;) {
        const line = await readLine();
        lines.push(line.slice(4));
        if (line.charAt(3) !== "-") {
          return { code: Number(line.slice(0, 3)), lines, text: lines.join(" ") };
        }
      }
    },
  };
}

export function buildMessage(
  mail: Mail,
  now = new Date(),
  id: string = crypto.randomUUID(),
): string {
  const domain = mail.from.address.split("@")[1];
  const boundary = `=_${id}`;

  const headers = [
    `From: ${mail.from.name ? `${displayName(mail.from.name)} ` : ""}<${mail.from.address}>`,
    `To: <${mail.to}>`,
    ...(mail.replyTo ? [`Reply-To: <${mail.replyTo}>`] : []),
    `Subject: ${encodeWords(mail.subject)}`,
    `Date: ${now.toUTCString().replace("GMT", "+0000")}`,
    `Message-ID: <${id}@${domain}>`,
    "MIME-Version: 1.0",
  ];

  if (!mail.html) {
    return [...headers, ...bodyPart("text/plain", mail.text)].join("\r\n");
  }

  return [
    ...headers,
    `Content-Type: multipart/alternative;\r\n boundary="${boundary}"`,
    "",
    `--${boundary}`,
    ...bodyPart("text/plain", mail.text),
    `--${boundary}`,
    ...bodyPart("text/html", mail.html),
    `--${boundary}--`,
  ].join("\r\n");
}

function bodyPart(type: string, body: string): string[] {
  return [
    `Content-Type: ${type}; charset=utf-8`,
    "Content-Transfer-Encoding: base64",
    "",
    ...(base64(body).match(/.{1,76}/g) ?? []),
  ];
}

function displayName(name: string) {
  return /^[\x20-\x7e]*$/.test(name) && !/["\\]/.test(name)
    ? `"${name}"`
    : encodeWords(name);
}

/**
 * RFC 2047: tekst als =?UTF-8?B?...?= coderen, in stukken van maximaal
 * 42 bytes (= max. 68 tekens per encoded-word, zodat ook de eerste regel met
 * "Subject: " onder de 78 tekens blijft), gevouwen over meerdere regels.
 */
function encodeWords(value: string) {
  const chunks: string[] = [];
  let chunk = "";
  for (const char of value) {
    if (encoder.encode(chunk + char).length > 42) {
      chunks.push(chunk);
      chunk = "";
    }
    chunk += char;
  }
  chunks.push(chunk);
  return chunks.map((c) => `=?UTF-8?B?${base64(c)}?=`).join("\r\n ");
}

function base64(value: string) {
  let binary = "";
  for (const byte of encoder.encode(value)) binary += String.fromCharCode(byte);
  return btoa(binary);
}
