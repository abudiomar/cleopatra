import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeader } from "@/components/ui/Section";
import { locations } from "@/content/site";

export function Locations() {
  return (
    <Section tone="tint">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <SectionHeader
          eyebrow="Werkgebied"
          title="Actief in vijf steden, met korte lijnen"
          intro="Wij werken bewust binnen een beperkt gebied. Zo blijven reistijden kort, kunnen wij snel schakelen en kent uw teamleider de omgeving."
        />

        <ul className="grid gap-3 sm:grid-cols-2">
          {locations.map((loc) => (
            <li
              key={loc.city}
              className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white px-5 py-4 transition-colors hover:border-brand-300"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                <Icon name="pin" className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block font-medium">{loc.city}</span>
                <span className="block text-sm text-sand-500">
                  {loc.region}
                </span>
              </span>
            </li>
          ))}

          <li className="flex items-center gap-4 rounded-2xl border border-dashed border-brand-200 px-5 py-4 text-sm text-sand-600">
            Staat uw plaats er niet bij? Vraag het ons gerust.
          </li>
        </ul>
      </div>
    </Section>
  );
}
