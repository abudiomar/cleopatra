import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Process } from "@/components/sections/Process";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Woningschoonmaak, kantoorschoonmaak, opleveringsschoonmaak, glasbewassing, vloeronderhoud en specialistische reiniging. Bekijk wat elke dienst precies inhoudt.",
  alternates: { canonical: "/diensten" },
};

export default function DienstenPage() {
  return (
    <>
      <PageHero
        eyebrow="Diensten"
        title="Schoonmaak die past bij hoe u werkt en woont"
        intro="Zes diensten die wij structureel of eenmalig uitvoeren. Elke opdracht krijgt een eigen werkomschrijving, zodat volstrekt duidelijk is wat er gebeurt."
      />

      {/* Snelnavigatie */}
      <div className="sticky top-20 z-30 border-b border-sand-200 bg-sand-50/85 backdrop-blur-xl">
        <div className="container-page flex gap-2 overflow-x-auto py-4">
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="shrink-0 rounded-full border border-sand-300 bg-white px-4 py-2 text-sm font-medium text-sand-700 transition-colors hover:border-brand-400 hover:text-brand-800"
            >
              {service.name}
            </a>
          ))}
        </div>
      </div>

      <Section tone="light" className="py-16 md:py-20">
        <div className="space-y-6">
          {services.map((service, i) => (
            <article
              key={service.slug}
              id={service.slug}
              className="scroll-mt-44 rounded-card border border-sand-200 bg-white p-8 md:p-12"
            >
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-900 text-white">
                      <Icon
                        name={service.icon as IconName}
                        className="size-6"
                      />
                    </span>
                    <span className="rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-sand-600">
                      {service.audience}
                    </span>
                    <span className="ml-auto text-sm font-medium text-sand-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="mt-7 text-2xl font-semibold md:text-3xl">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-brand-800">
                    {service.summary}
                  </p>
                  <p className="mt-5 leading-relaxed text-sand-600">
                    {service.body}
                  </p>

                  <Button
                    href="/contact"
                    variant="secondary"
                    size="sm"
                    className="mt-8"
                  >
                    Offerte voor {service.name.toLowerCase()}
                    <Icon name="arrow" className="size-4" />
                  </Button>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-sand-50 p-7">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
                      Dit is inbegrepen
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[0.9375rem]"
                        >
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-100 text-accent-600">
                            <Icon
                              name="check"
                              className="size-3"
                              strokeWidth={2.6}
                            />
                          </span>
                          <span className="text-sand-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Process />
      <CtaBanner
        title="Niet zeker welke dienst u nodig heeft?"
        body="Bel ons of stuur een korte omschrijving van uw situatie. Wij denken mee en komen vrijblijvend langs om te kijken wat er nodig is."
      />
    </>
  );
}
