# Cleopatra Professional Cleaning — website

Nieuwe website voor Cleopatra Professional Cleaning, ter vervanging van de
bestaande site op cleopatraschoonmaak.nl.

## Uitgangspunten

De huidige site draait **niet** op WordPress, maar op de **One.com Web
Editor** — een gehoste drag-and-drop bouwer. Er is dus geen thema, geen
PHP en geen database om te migreren. Alle content in dit project is
overgenomen van de live site en herschreven.

| | Oud | Nieuw |
| --- | --- | --- |
| Platform | One.com Web Editor | Next.js 15 (App Router) |
| Styling | Editor-gegenereerd | Tailwind CSS v4 |
| Content | In de editor | `src/content/site.ts` |
| Talen | Nederlands | Nederlands |
| Hosting | One.com | Vrij te kiezen (Vercel aanbevolen) |

## Aan de slag

```bash
npm install
cp .env.example .env.local
npm run dev
```

De site draait dan op http://localhost:3000.

```bash
npm run build      # productiebuild
npm run start      # productiebuild lokaal draaien
npm run lint       # ESLint
npm run typecheck  # TypeScript zonder build
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
│   ├── api/contact/route.ts        Verwerking van het contactformulier
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

De route `POST /api/contact` valideert de invoer, past een honeypot en een
eenvoudige rate limit toe, en verstuurt de aanvraag via
[Resend](https://resend.com).

Zonder `RESEND_API_KEY` wordt de aanvraag alleen naar de console gelogd —
handig tijdens ontwikkeling, maar **niet geschikt voor productie**. Zet de
volgende variabelen vóór livegang:

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=info@cleopatraschoonmaak.nl
CONTACT_FROM_EMAIL=website@cleopatraschoonmaak.nl
NEXT_PUBLIC_SITE_URL=https://cleopatraschoonmaak.nl
```

Wil de klant liever via de bestaande One.com-mailbox versturen, dan kan de
Resend-aanroep in `src/app/api/contact/route.ts` worden vervangen door
Nodemailer met SMTP.

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
- [ ] Bevestigen of `info@cleopatraschoonmaak.nl` het juiste adres is
- [ ] Algemene voorwaarden aanleveren
- [ ] Privacybeleid juridisch laten controleren
- [ ] Testimonials vervangen door geverifieerde klantcitaten met toestemming
- [ ] Besluiten of de blog terugkomt (nu doorgestuurd naar de homepage)
- [ ] Google Search Console koppelen en de sitemap indienen
- [ ] Besluiten of er een logistieke tak op de site moet komen

## Deployment

Aanbevolen: Vercel. Repository koppelen, de omgevingsvariabelen uit
`.env.example` invullen, en het domein `cleopatraschoonmaak.nl`
overzetten. Werkt verder op elke host die Node draait.

Oude URLs worden afgevangen via `next.config.ts`:
`/services` → `/diensten`, `/about` → `/over-ons`, `/blog` → `/`.
