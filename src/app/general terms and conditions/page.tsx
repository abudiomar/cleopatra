import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "General Terms and Conditions",
  description:
    "The general terms and conditions of Cleopatra Professional Cleaning.",
  alternates: { canonical: "/general-terms-and-conditions" },
  robots: { index: false, follow: true },
};

export default function GeneralTermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="General Terms and Conditions"
        intro="The terms and conditions that apply to every quote and order from Cleopatra Professional Cleaning."
      />

      <Section tone="white">
        {/* PLACEHOLDER — replace this text with the customer's final terms. Have them drafted or checked by a lawyer. */}
        <div className="max-w-2xl">
          <div className="rounded-card border border-amber-300 bg-amber-50 p-6 text-sm leading-relaxed text-amber-900">
            <strong className="font-semibold">Still to be delivered.</strong> This page doesn't have a final text yet. Provide the terms and conditions, or have them drafted,
             before the site goes live. Get in touch via {contact.email}.
          </div>
        </div>
      </Section>
    </>
  );
}
