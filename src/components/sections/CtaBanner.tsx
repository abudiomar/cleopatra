import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { contact } from "@/content/site";

export function CtaBanner({
  title = "Klaar voor een pand dat er altijd goed bij staat?",
  body = "Vertel ons kort wat u zoekt. Wij reageren binnen één werkdag en plannen een vrijblijvende kennismaking op locatie.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-sand-50 pb-20 md:pb-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-900 px-8 py-14 text-white md:px-16 md:py-20">
          <div
            className="absolute inset-0 bg-grid opacity-30"
            aria-hidden="true"
          />
          <div
            className="absolute -right-24 -top-24 size-96 rounded-full bg-accent-600/25 blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-semibold leading-[1.15] md:text-4xl">
              {title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-brand-100/75">
              {body}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="white" size="lg">
                Offerte aanvragen
                <Icon name="arrow" className="size-4" />
              </Button>
              <Button
                href={contact.phoneHref}
                size="lg"
                className="bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15"
              >
                <Icon name="phone" className="size-4" />
                Bel {contact.phoneDisplay}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
