import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute -left-32 -top-32 size-[30rem] rounded-full bg-brand-600/25 blur-[110px]"
        aria-hidden="true"
      />

      <div className="container-page relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">
          Foutcode 404
        </p>
        <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-tight md:text-5xl">
          Deze pagina hebben wij niet kunnen vinden
        </h1>
        <p className="mt-5 max-w-md leading-relaxed text-brand-100/70">
          Mogelijk is de pagina verplaatst of bestaat de link niet meer. Ga
          terug naar de homepage of bekijk direct onze diensten.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="white" size="lg">
            Naar de homepage
            <Icon name="arrow" className="size-4" />
          </Button>
          <Button
            href="/diensten"
            size="lg"
            className="bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"
          >
            Bekijk onze diensten
          </Button>
        </div>
      </div>
    </section>
  );
}
