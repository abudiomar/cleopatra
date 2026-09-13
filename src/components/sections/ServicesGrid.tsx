import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section, SectionHeader } from "@/components/ui/Section";
import { services } from "@/content/site";

export function ServicesGrid({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <Section tone="light">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Diensten"
          title="Van wekelijkse woningschoonmaak tot volledige oplevering"
          intro="Particulier of zakelijk, structureel of eenmalig — wij stellen het pakket samen op basis van wat er werkelijk nodig is."
        />

        <Button href="/diensten" variant="secondary" className="shrink-0">
          Alle diensten
          <Icon name="arrow" className="size-4" />
        </Button>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((service) => (
          <Link
            key={service.slug}
            href={`/diensten#${service.slug}`}
            className="group flex flex-col rounded-card border border-sand-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-900 group-hover:text-white">
                <Icon name={service.icon as IconName} className="size-5" />
              </span>
              <span className="rounded-full bg-sand-100 px-2.5 py-1 text-[0.6875rem] font-medium text-sand-600">
                {service.audience}
              </span>
            </div>

            <h3 className="mt-6 text-lg font-semibold leading-snug">
              {service.name}
            </h3>
            <p className="mt-2.5 flex-1 text-sm leading-relaxed text-sand-600">
              {service.summary}
            </p>

            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
              Meer over deze dienst
              <Icon
                name="arrow"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
