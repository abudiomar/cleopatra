# Cleopatra Professional Cleaning — website

New website for Cleopatra Professional Cleaning, to replace the existing site on cleopatraschoonmaak.nl.

## Uitgangspunten

The current site **does not** run on WordPress, but on the **One.com Web Editor** — a hosted drag-and-drop builder. So there is no theme, no PHP, and no database to migrate. All content in this project has been taken from the live site and rewritten.

|           | Old                | New                                 |
| --------- | ------------------ | ----------------------------------- |
| Platform  | One.com Web Editor | Next.js 15 (App Router)             |
| Styling   | Editor-generated   | Tailwind CSS v4                     |
| Content   | In the editor      | `src/content/site.ts`               |
| Languages | Dutch              | English                             |
| Hosting   | One.com            | Cloudflare Workers (static assets)  |

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site will then run at http://localhost:3000.

```bash
npm run build # production build
npm run start # run production build locally
npm run lint # ESLint
npm run typecheck # TypeScript without building
```

## Structuur

```
src/
├── app/
│   ├── layout.tsx                  Root layout, metadata, fonts
│   ├── page.tsx                    Home
│   ├── globals.css                 Design tokens + basisstijlen
│   ├── diensten/page.tsx           Overzicht van alle diensten
│   ├── over-ons/page.tsx           Bedrijfsverhaal en kernwaarden
│   ├── contact/page.tsx            Formulier en contactgegevens
│   ├── privacy/page.tsx            Privacybeleid (concept)
│   ├── algemene-voorwaarden/       Plaatshouder — nog aan te leveren
│   ├── sitemap.ts / robots.ts      SEO
│   └── not-found.tsx               404
├── components/
│   ├── Header.tsx / Footer.tsx / Logo.tsx / PageHero.tsx
│   ├── ContactForm.tsx             Client component met validatie
│   ├── JsonLd.tsx                  Schema.org LocalBusiness + FAQ
│   ├── sections/                   Herbruikbare paginasecties
│   └── ui/                         Button, Section, Icon
└── content/
    └── site.ts                     Alle teksten op één plek
```

**Alle teksten staan in `src/content/site.ts`.** Wie de kopij wil
aanpassen, hoeft geen componenten aan te raken.

## Contactformulier

Het formulier post naar `POST /api/contact`. Omdat de site statisch is,
wordt dat afgehandeld door de Cloudflare Worker in `worker/index.ts`: die
valideert de invoer, past een honeypot en een eenvoudige rate limit toe, en
verstuurt de aanvraag via de eigen mailserver van TransIP
(`smtp.transip.email`, poort 465) met de SMTP-client in `worker/smtp.ts`.

De Worker logt in op de mailbox `CONTACT_FROM_EMAIL` en mailt naar
`CONTACT_TO_EMAIL` (beide `vars` in `wrangler.jsonc`). Die afzendermailbox
moet in TransIP bestaan. Het wachtwoord als secret zetten:

```bash
npx wrangler secret put SMTP_PASSWORD
```

Zonder `SMTP_PASSWORD` wordt de aanvraag alleen gelogd (Workers Logs) —
**niet geschikt voor productie**.

## Design

Kleuren, radii en schaduwen staan als tokens in `src/app/globals.css`
onder `@theme`. Aanpassen van de merkkleur is één waarde wijzigen.

- **Brand** — diep blauw, van `brand-50` tot `brand-950`
- **Sand** — warme neutralen, voorkomt een klinische uitstraling
- **Accent** — zacht mint, verwijst naar het milieuvriendelijke werken

De site gebruikt bewust geen stockfotografie. Waar een foto zou staan,
staat nu een opgebouwd visueel element. Zodra de klant echte foto's van
teams en projecten aanlevert, zijn dat de plekken om ze te plaatsen.

## Nog te doen vóór livegang

- [ ] Echte foto's van team en projecten aanleveren en plaatsen
- [ ] KvK- en btw-nummer invullen in `src/content/site.ts`
- [ ] Vestigingsadres toevoegen (nu alleen `Amsterdam` in de schema.org-data)
- [ ] Bevestigen of `info@cleopatramultiservices.nl` het juiste adres is
- [ ] Algemene voorwaarden aanleveren
- [ ] Privacybeleid juridisch laten controleren
- [ ] Testimonials vervangen door geverifieerde klantcitaten met toestemming
- [ ] Besluiten of de blog terugkomt (nu doorgestuurd naar de homepage)
- [ ] Google Search Console koppelen en de sitemap indienen
- [ ] Besluiten of er een logistieke tak op de site moet komen

## Deployment

De site draait op **Cloudflare Workers** (account van Cleopatra, zie
`account_id` in `wrangler.jsonc`):

- `next build` maakt een statische export in `out/`, die als Static Assets
  wordt geserveerd.
- `worker/index.ts` handelt alleen `/api/*` af (het contactformulier).
- Redirects en security headers staan in `public/_redirects` en
  `public/_headers`.

```bash
npm run preview   # bouwen en lokaal draaien op de Cloudflare-runtime
npm run deploy    # bouwen en publiceren
```

Live: https://cleopatramultiservices.nl (Custom Domain van de Worker, zie
`routes` in `wrangler.jsonc`). `www` wordt met een Cloudflare Redirect Rule
naar het hoofddomein doorgestuurd.

Oude URLs worden doorgestuurd via `public/_redirects`:
`/diensten` → `/services`, `/over-ons` → `/about`,
`/algemene-voorwaarden` → `/general-terms-and-conditions`, `/blog` → `/`.
