import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden van Cleopatra Professional Cleaning.",
  alternates: { canonical: "/algemene-voorwaarden" },
  robots: { index: false, follow: true },
};

export default function VoorwaardenPage() {
  return (
    <>
      <PageHero
        eyebrow="Juridisch"
        title="Algemene voorwaarden"
        intro="De voorwaarden die gelden bij iedere offerte en opdracht van Cleopatra Professional Cleaning."
      />

      <Section tone="white">
        {/* PLAATSHOUDER — vervang deze tekst door de definitieve voorwaarden
            van de klant. Laat ze opstellen of controleren door een jurist. */}
        <div className="max-w-2xl">
          <div className="rounded-card border border-amber-300 bg-amber-50 p-6 text-sm leading-relaxed text-amber-900">
            <strong className="font-semibold">Nog aan te leveren.</strong> Deze
            pagina bevat nog geen definitieve tekst. Lever de algemene
            voorwaarden aan, of laat ze opstellen, voordat de site live gaat.
            Neem contact op via {contact.email}.
          </div>
        </div>
      </Section>
    </>
  );
}
