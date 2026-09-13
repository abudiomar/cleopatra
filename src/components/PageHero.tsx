export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute -left-32 -top-32 size-[30rem] rounded-full bg-brand-600/25 blur-[110px]"
        aria-hidden="true"
      />

      <div className="container-page relative py-20 md:py-28">
        <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">
          {eyebrow}
        </p>
        <h1
          className="animate-fade-up mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] md:text-6xl"
          style={{ animationDelay: "60ms" }}
        >
          {title}
        </h1>
        <p
          className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-brand-100/75"
          style={{ animationDelay: "120ms" }}
        >
          {intro}
        </p>
      </div>
    </section>
  );
}
