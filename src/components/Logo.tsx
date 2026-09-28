import Link from "next/link";
import Image from "next/image";

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
      aria-label="Cleopatra Professional Cleaning — to the homepage"
    >
      <Image
        src="/image/cleobatra-logo.png"
        alt=""
        width={80}
        height={80}
        className="size-10 shrink-0 rounded-xl object-contain transition-transform duration-300 group-hover:-rotate-6"
        priority
      />

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
