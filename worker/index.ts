/**
 * Cloudflare Worker voor de site.
 *
 * Alle pagina's zijn statisch (Next.js export in `out/`) en worden direct door
 * Workers Static Assets geserveerd. Alleen `/api/*` komt bij deze Worker terecht
 * (zie `run_worker_first` in `wrangler.jsonc`): hier wordt het contactformulier
 * verwerkt en via de eigen mailserver (TransIP, SMTP) gemaild.
 *
 * Configuratie:
 *   - vars in wrangler.jsonc: CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, SITE_NAME,
 *                             SMTP_HOST, SMTP_PORT, SMTP_USER (optioneel)
 *   - secret:                 SMTP_PASSWORD  (`npx wrangler secret put SMTP_PASSWORD`)
 *
 * De Worker logt in op de mailbox CONTACT_FROM_EMAIL (of SMTP_USER) en stuurt
 * de aanvraag van daaruit naar CONTACT_TO_EMAIL.
 */

import { isValidAddress, sendMail } from "./smtp";

type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
  SITE_NAME: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
  SMTP_HOST: string;
  SMTP_PORT: string;
  /** Inlognaam voor SMTP; standaard CONTACT_FROM_EMAIL. */
  SMTP_USER?: string;
  SMTP_PASSWORD?: string;
};

type Payload = {
  naam?: string;
  email?: string;
  telefoon?: string;
  dienst?: string;
  bericht?: string;
  website?: string; // honeypot
};

/** Simpele in-memory rate limit, per Worker-isolate. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function handleContact(request: Request, env: Env) {
  const ip = request.headers.get("cf-connecting-ip") ?? "onbekend";

  if (rateLimited(ip)) {
    return json(
      { error: "Te veel aanvragen. Probeer het over een minuut opnieuw." },
      429,
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return json({ error: "Ongeldige aanvraag." }, 400);
  }

  // Honeypot gevuld: vrijwel zeker een bot. Doe alsof het gelukt is.
  if (body.website) {
    return json({ ok: true });
  }

  const naam = body.naam?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const telefoon = body.telefoon?.trim() ?? "";
  const dienst = body.dienst?.trim() || "Niet opgegeven";
  const bericht = body.bericht?.trim() ?? "";

  if (naam.length < 2) {
    return json({ error: "Vul uw naam in." }, 400);
  }
  if (!isValidAddress(email)) {
    return json({ error: "Vul een geldig e-mailadres in." }, 400);
  }
  if (bericht.length < 10) {
    return json({ error: "Vul een bericht in van minimaal 10 tekens." }, 400);
  }
  if (
    naam.length > 200 ||
    telefoon.length > 50 ||
    dienst.length > 200 ||
    bericht.length > 10_000
  ) {
    return json({ error: "Een van de velden is te lang." }, 400);
  }

  const html = `
    <h2>Nieuwe aanvraag via de website</h2>
    <p><strong>Naam:</strong> ${escapeHtml(naam)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefoon:</strong> ${escapeHtml(telefoon || "Niet opgegeven")}</p>
    <p><strong>Dienst:</strong> ${escapeHtml(dienst)}</p>
    <p><strong>Bericht:</strong></p>
    <p>${escapeHtml(bericht).replace(/\n/g, "<br>")}</p>
  `;

  const text = [
    "Nieuwe aanvraag via de website",
    "",
    `Naam:     ${naam}`,
    `E-mail:   ${email}`,
    `Telefoon: ${telefoon || "Niet opgegeven"}`,
    `Dienst:   ${dienst}`,
    "",
    "Bericht:",
    bericht,
  ].join("\n");

  // Geen wachtwoord geconfigureerd: alleen loggen (zichtbaar in Workers Logs).
  if (!env.SMTP_PASSWORD) {
    console.warn(
      "[contact] SMTP_PASSWORD ontbreekt — aanvraag alleen gelogd:",
      { naam, email, telefoon, dienst },
    );
    return json({ ok: true, delivered: false });
  }

  try {
    await sendMail(
      {
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        username: env.SMTP_USER || env.CONTACT_FROM_EMAIL,
        password: env.SMTP_PASSWORD,
      },
      {
        from: { name: env.SITE_NAME, address: env.CONTACT_FROM_EMAIL },
        to: env.CONTACT_TO_EMAIL,
        replyTo: email,
        subject: `Nieuwe aanvraag — ${dienst} — ${naam}`,
        text,
        html,
      },
    );

    return json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Versturen mislukt:", err);
    return json(
      {
        error:
          "Uw bericht kon niet worden verzonden. Bel ons gerust of probeer het later opnieuw.",
      },
      502,
    );
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/contact") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", {
          status: 405,
          headers: { Allow: "POST" },
        });
      }
      return handleContact(request, env);
    }

    if (pathname.startsWith("/api/")) {
      return json({ error: "Niet gevonden." }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
