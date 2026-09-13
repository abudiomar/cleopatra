import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { hero, locations } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      {/* Achtergrondlagen: raster + twee zachte lichtvlekken. */}
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute -left-40 -top-40 size-[36rem] rounded-full bg-brand-600/25 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-56 right-0 size-[32rem] rounded-full bg-accent-600/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-page relative pb-24 pt-16 md:pb-32 md:pt-24">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-brand-100 ring-1 ring-white/15 backdrop-blur">
              <span className="size-1.5 rounded-full bg-accent-400" />
              {hero.eyebrow}
            </p>

            <h1
              className="animate-fade-up mt-7 text-[2.75rem] font-semibold leading-[1.05] sm:text-6xl lg:text-[4.25rem]"
              style={{ animationDelay: "60ms" }}
            >
              {hero.title}
              <br />
              <span className="bg-gradient-to-r from-accent-400 to-brand-300 bg-clip-text text-transparent">
                {hero.titleAccent}
              </span>
            </h1>

            <p
              className="animate-fade-up mt-7 max-w-xl text-lg leading-relaxed text-brand-100/75"
              style={{ animationDelay: "120ms" }}
            >
              {hero.intro}
            </p>

            <div
              className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "180ms" }}
            >
              <Button href={hero.primaryCta.href} variant="white" size="lg">
                {hero.primaryCta.label}
                <Icon name="arrow" className="size-4" />
              </Button>
              <Button
                href={hero.secondaryCta.href}
                size="lg"
                className="bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>

            <dl
              className="animate-fade-up mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
              style={{ animationDelay: "240ms" }}
            >
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-3xl font-semibold tracking-tight">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-brand-100/55">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Visueel blok: een 'vandaag gereinigd'-kaart in plaats van een stockfoto. */}
          <div
            className="animate-fade-up lg:col-span-5"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 rounded-[2rem] bg-white/5 ring-1 ring-white/10" />

              <div className="relative rounded-[1.75rem] bg-white p-7 text-brand-950 shadow-lift">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sand-500">
                    Vandaag afgerond
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-2.5 py-1 text-[0.6875rem] font-semibold text-accent-600">
                    <span className="size-1.5 rounded-full bg-accent-400" />
                    Gecontroleerd
                  </span>
                </div>

                <ul className="mt-6 space-y-3.5">
                  {[
                    "Keuken en sanitair",
                    "Vloeren gestofzuigd en gedweild",
                    "Ramen binnenzijde",
                    "Afval gescheiden afgevoerd",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-100 text-accent-600">
                        <Icon name="check" className="size-3" strokeWidth={2.6} />
                      </span>
                      <span className="text-sand-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-center gap-3 border-t border-sand-200 pt-5">
                  <span className="grid size-9 place-items-center rounded-full bg-brand-900 text-xs font-semibold text-white">
                    ST
                  </span>
                  <div className="text-xs leading-tight">
                    <p className="font-medium">Sanne T.</p>
                    <p className="text-sand-500">Teamleider · Amsterdam</p>
                  </div>
                </div>
              </div>

              <div className="relative mt-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur">
                <div className="flex items-center gap-2 text-xs text-brand-100/70">
                  <Icon name="pin" className="size-3.5 text-accent-400" />
                  <span>
                    Actief in{" "}
                    {locations.map((l) => l.city).slice(0, 3).join(", ")} en{" "}
                    {locations.length - 3} andere steden
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
