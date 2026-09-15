import { Section, SectionHeader } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { usps } from "@/content/site";
import { Image, type LogoName } from "@/components/ui/Image";

export function Usps() {
  return (
    <Section tone="white">
      <SectionHeader
        eyebrow="Why work with us"
        title="Three things you can hold us accountable for"
        intro="No empty promises, just commitments we can actually keep."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {usps.map((usp, i) => (
          <article
            key={usp.title}
            className="group relative rounded-card border border-sand-200 bg-sand-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
          >
            <span className="absolute right-7 top-7 text-5xl font-semibold leading-none text-sand-200 transition-colors group-hover:text-brand-100">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="grid size-12 place-items-center rounded-2xl bg-brand-900 text-white transition-transform duration-300 group-hover:scale-105">
              <Icon name={usp.icon as IconName} className="size-6" />
            </span>

            <h3 className="mt-6 text-xl font-semibold leading-snug">
              {usp.title}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-sand-600">
              {usp.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
