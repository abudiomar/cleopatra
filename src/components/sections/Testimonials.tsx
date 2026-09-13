import { Section, SectionHeader } from "@/components/ui/Section";
import { testimonials } from "@/content/site";

export function Testimonials() {
  return (
    <Section tone="white">
      <SectionHeader
        eyebrow="Ervaringen"
        title="Wat onze klanten erover zeggen"
        align="center"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item) => (
          <figure
            key={item.name}
            className="flex flex-col rounded-card border border-sand-200 bg-sand-50 p-8"
          >
            <span
              className="text-4xl leading-none text-brand-300"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-brand-950">
              {item.quote}
            </blockquote>

            <figcaption className="mt-7 flex items-center gap-3 border-t border-sand-200 pt-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-900 text-xs font-semibold text-white">
                {item.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-medium">{item.name}</span>
                <span className="block text-sand-500">{item.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
