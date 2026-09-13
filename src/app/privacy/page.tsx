import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { contact, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Hoe Cleopatra Professional Cleaning omgaat met uw persoonsgegevens.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Juridisch"
        title="Privacybeleid"
        intro="Wij verwerken zo min mogelijk persoonsgegevens en gebruiken ze uitsluitend om onze dienstverlening uit te voeren."
      />

      <Section tone="white">
        {/* LET OP: dit is een basistekst. Laat deze vóór livegang controleren
            door een jurist en vul de ontbrekende bedrijfsgegevens aan. */}
        <div className="max-w-2xl space-y-8 leading-relaxed text-sand-700">
          <div>
            <h2 className="text-xl font-semibold text-brand-950">
              Wie wij zijn
            </h2>
            <p className="mt-3">
              {site.legalName} is verwerkingsverantwoordelijke voor de
              persoonsgegevens die via deze website worden verzameld. U bereikt
              ons via {contact.email} of {contact.phoneDisplay}.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-950">
              Welke gegevens wij verwerken
            </h2>
            <p className="mt-3">
              Wanneer u het contactformulier invult, verwerken wij uw naam,
              e-mailadres, eventueel telefoonnummer en de inhoud van uw
              bericht. Deze gegevens gebruiken wij uitsluitend om op uw
              aanvraag te reageren en, als het tot een opdracht komt, om de
              overeenkomst uit te voeren.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-950">
              Hoe lang wij gegevens bewaren
            </h2>
            <p className="mt-3">
              Aanvragen die niet tot een opdracht leiden, bewaren wij maximaal
              twaalf maanden. Gegevens die horen bij een lopende of afgeronde
              opdracht bewaren wij zolang dat wettelijk verplicht is, met name
              vanwege de fiscale bewaarplicht van zeven jaar.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-950">
              Delen met derden
            </h2>
            <p className="mt-3">
              Wij verkopen uw gegevens niet en delen ze niet met derden, tenzij
              dat noodzakelijk is voor de uitvoering van de overeenkomst of
              wettelijk verplicht is. Voor het verzenden van e-mail en het
              hosten van deze website maken wij gebruik van externe
              dienstverleners waarmee een verwerkersovereenkomst is gesloten.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-950">
              Uw rechten
            </h2>
            <p className="mt-3">
              U heeft het recht uw gegevens in te zien, te laten corrigeren of
              te laten verwijderen. Stuur daarvoor een bericht naar{" "}
              {contact.email}. U kunt ook een klacht indienen bij de Autoriteit
              Persoonsgegevens.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-950">Cookies</h2>
            <p className="mt-3">
              Deze website plaatst geen tracking- of marketingcookies. Er wordt
              uitsluitend functionele opslag gebruikt die nodig is om de site
              te laten werken.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
