import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeader } from "@/components/ui/Section";
import { faq } from "@/content/site";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function Faq() {
  return (
    <Section tone="tint">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader
            eyebrow="Frequently Asked Questions"
            title="Short answer to what you’re probably thinking now"
            intro="Can't find your question? Call or email us — you’ll get a real person on the line."
          />
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-sand-200 border-y border-sand-200">
            {faq.map((item) => (
              <details key={item.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-[1.0625rem] font-medium transition-colors hover:text-brand-700">
                  {item.question}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-sand-300 text-sand-600 transition-all duration-300 group-open:rotate-45 group-open:border-brand-700 group-open:bg-brand-700 group-open:text-white">
                    <Icon name="plus" className="size-4" />
                  </span>
                </summary>
                <p className="pb-6 pr-14 text-[0.9375rem] leading-relaxed text-sand-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
