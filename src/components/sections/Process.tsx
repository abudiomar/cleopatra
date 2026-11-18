import { Section, SectionHeader } from "@/components/ui/Section";
import { workflow } from "@/content/site";

export function Process() {
  return (
    <Section tone="tint" className="relative overflow-hidden">
      {/* Kept faint: the header text sits on top of this photo. */}
      <div className="absolute inset-0 bg-grid opacity-10" aria-hidden="true" />
      <div
        className="absolute -right-32 top-0 size-[28rem] rounded-full bg-brand-600/20 blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative">
        <SectionHeader
          eyebrow="Working method"
          tone="light"
          title="From first question to established routine"
          intro="Four steps. You always know where you are and who will be coming by."
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-card bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map((item) => (
            <li key={item.step} className="bg-brand-700 p-8">
              <span className="text-xs font-semibold tracking-[0.2em] text-gold-300">
                {item.step}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-100">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
