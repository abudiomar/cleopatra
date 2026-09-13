import Link from "next/link";

/**
 * Woordmerk met een simpel monogram. Bewust als code en niet als
 * afbeelding, zodat het scherp blijft en meekleurt met de achtergrond.
 */
export function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Cleopatra Professional Cleaning — naar de homepage"
    >
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-xl text-[0.9375rem] font-semibold tracking-tight transition-transform duration-300 group-hover:-rotate-6 ${
          isLight
            ? "bg-white text-brand-900"
            : "bg-brand-900 text-white"
        }`}
      >
        CP
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.9375rem] font-semibold tracking-tight ${
            isLight ? "text-white" : "text-brand-950"
          }`}
        >
          Cleopatra
        </span>
        <span
          className={`mt-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em] ${
            isLight ? "text-brand-200" : "text-sand-500"
          }`}
        >
          Professional Cleaning
        </span>
      </span>
    </Link>
  );
}
