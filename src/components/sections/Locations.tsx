import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeader } from "@/components/ui/Section";
import { locations } from "@/content/site";

export function Locations() {
  return (
    <Section tone="tint">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <SectionHeader
          eyebrow="Area of ​​operation"
          title="Active in five cities, with short lines of communication"
          intro="We deliberately operate within a limited area. This keeps travel times short, allows us to respond quickly, and ensures your team leader knows the local area."

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
            Does your city not appear? Please let us know.
          </li>
        </ul>
      </div>
    </Section>
  );
}
