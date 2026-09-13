import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "white" | "dark" | "tint";
}) {
  const tones = {
    light: "bg-sand-50 text-brand-950",
    white: "bg-white text-brand-950",
    tint: "bg-brand-50 text-brand-950",
    dark: "bg-brand-950 text-white",
  } as const;

  return (
    <section
      id={id}
      className={`${tones[tone]} py-20 md:py-28 ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p
          className={`mb-4 text-xs font-semibold uppercase tracking-[0.16em] ${
            isDark ? "text-brand-300" : "text-brand-600"
          }`}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={`text-3xl font-semibold leading-[1.15] md:text-[2.75rem] ${
          isDark ? "text-white" : "text-brand-950"
        }`}
      >
        {title}
      </h2>

      {intro && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            isDark ? "text-brand-100/80" : "text-sand-600"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
