import { contact, locations, services, site } from "@/content/site";

/**
 * Gestructureerde data voor Google. Belangrijk voor een lokaal
 * dienstverlenend bedrijf: hiermee kan de zaak in de lokale resultaten
 * en in het kennispaneel verschijnen.
 */
export function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "@id": `${site.url}/#organisatie`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: `+31${contact.phone.replace(/^0/, "")}`,
    email: contact.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NL",
      addressLocality: "Amsterdam",
    },
    areaServed: locations.map((loc) => ({
      "@type": "City",
      name: loc.city,
      containedInPlace: { "@type": "State", name: loc.region },
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "16:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Schoonmaakdiensten",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.summary,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
