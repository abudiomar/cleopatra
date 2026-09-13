import { NextResponse } from "next/server";

import { contact, site } from "@/content/site";

export const runtime = "nodejs";

type Payload = {
  naam?: string;
  email?: string;
  telefoon?: string;
  dienst?: string;
  bericht?: string;
  website?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Simpele in-memory rate limit. Voldoende voor één instance. */
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

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "onbekend";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Te veel aanvragen. Probeer het over een minuut opnieuw." },
      { status: 429 },
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  // Honeypot gevuld: vrijwel zeker een bot. Doe alsof het gelukt is.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const naam = body.naam?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const telefoon = body.telefoon?.trim() ?? "";
  const dienst = body.dienst?.trim() || "Niet opgegeven";
  const bericht = body.bericht?.trim() ?? "";

  if (naam.length < 2) {
    return NextResponse.json({ error: "Vul uw naam in." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Vul een geldig e-mailadres in." },
      { status: 400 },
    );
  }
  if (bericht.length < 10) {
    return NextResponse.json(
      { error: "Vul een bericht in van minimaal 10 tekens." },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? contact.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? `website@${new URL(site.url).hostname}`;
  const apiKey = process.env.RESEND_API_KEY;

  const html = `
    <h2>Nieuwe aanvraag via de website</h2>
    <p><strong>Naam:</strong> ${escapeHtml(naam)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefoon:</strong> ${escapeHtml(telefoon || "Niet opgegeven")}</p>
    <p><strong>Dienst:</strong> ${escapeHtml(dienst)}</p>
    <p><strong>Bericht:</strong></p>
    <p>${escapeHtml(bericht).replace(/\n/g, "<br>")}</p>
  `;

  // Geen mailprovider geconfigureerd: loggen zodat lokaal testen werkt.
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY ontbreekt — aanvraag alleen gelogd:",
      { naam, email, telefoon, dienst },
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${site.name} <${from}>`,
        to: [to],
        reply_to: email,
        subject: `Nieuwe aanvraag — ${dienst} — ${naam}`,
        html,
      }),
    });

    if (!res.ok) {
      throw new Error(`Resend gaf status ${res.status}`);
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Versturen mislukt:", err);
    return NextResponse.json(
      {
        error:
          "Uw bericht kon niet worden verzonden. Bel ons gerust of probeer het later opnieuw.",
      },
      { status: 502 },
    );
  }
}
