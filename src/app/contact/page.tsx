import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/sections/Faq";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { contact, locations } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact en offerte",
  description:
    "Vraag vrijblijvend een offerte aan bij Cleopatra Professional Cleaning. Wij reageren binnen één werkdag en komen kosteloos langs om de situatie te bekijken.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Vraag vrijblijvend een offerte aan"
        intro="Vertel kort wat u zoekt. Wij reageren binnen één werkdag en plannen een kosteloze kennismaking op locatie."
      />

      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-card border border-sand-200 bg-white p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
                Direct contact
              </h2>

              <ul className="mt-6 space-y-5">
                <li>
                  <a
                    href={contact.phoneHref}
                    className="group flex items-start gap-4"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-900 group-hover:text-white">
                      <Icon name="phone" className="size-4" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-sm text-sand-500">
                        Telefoon
                      </span>
                      <span className="mt-0.5 block font-medium">
                        {contact.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-100 text-accent-600 transition-colors group-hover:bg-accent-400 group-hover:text-white">
                      <Icon name="whatsapp" className="size-4" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-sm text-sand-500">
                        WhatsApp
                      </span>
                      <span className="mt-0.5 block font-medium">
                        {contact.whatsappDisplay}
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={contact.emailHref}
                    className="group flex items-start gap-4"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-900 group-hover:text-white">
                      <Icon name="mail" className="size-4" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-sm text-sand-500">
                        E-mail
                      </span>
                      <span className="mt-0.5 block font-medium break-all">
                        {contact.email}
                      </span>
                    </span>
                  </a>
                </li>
              </ul>

              <div className="mt-8 border-t border-sand-200 pt-7">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
                  Bereikbaarheid
                </h3>
                <dl className="mt-5 space-y-2.5 text-sm">
                  {contact.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4">
                      <dt className="text-sand-600">{h.days}</dt>
                      <dd className="font-medium">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 border-t border-sand-200 pt-7">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
                  Werkgebied
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-sand-600">
                  {locations.map((l) => l.city).join(", ")} en directe
                  omgeving.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Faq />
    </>
  );
}
