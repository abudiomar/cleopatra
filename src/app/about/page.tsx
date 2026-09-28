import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Locations } from "@/components/sections/Locations";
import { Testimonials } from "@/components/sections/Testimonials";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeader } from "@/components/ui/Section";
import { about, hero } from "@/content/site";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Cleopatra Professional Cleaning werkt met vaste teams per klant, medewerkers in loondienst en heldere schriftelijke afspraken. Lees waar wij voor staan.",
  alternates: { canonical: "/over-ons" },
};

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Over ons"
        title={about.title}
        intro={about.intro}
      />

      <Section tone="white">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-sand-700">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-32 rounded-card border border-sand-200 bg-sand-50 p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
                In cijfers
              </h2>

              <dl className="mt-6 space-y-6">
                {hero.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-b border-sand-200 pb-6 last:border-0 last:pb-0"
                  >
                    <dt className="text-sm text-sand-500">{stat.label}</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-brand-950">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Waar wij voor staan"
          title="Vier uitgangspunten die niet onderhandelbaar zijn"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {about.values.map((value) => (
            <article
              key={value.title}
              className="rounded-card border border-sand-200 bg-white p-8"
            >
              <span className="grid size-10 place-items-center rounded-full bg-accent-100 text-accent-600">
                <Icon name="check" className="size-5" strokeWidth={2.4} />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{value.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-sand-600">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Testimonials />
      <Locations />
      <CtaBanner />
    </>
  );
}
