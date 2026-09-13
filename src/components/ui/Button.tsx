import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-all duration-200 whitespace-nowrap " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-900 text-white shadow-soft hover:bg-brand-800 hover:shadow-lift " +
    "active:translate-y-px",
  secondary:
    "bg-white text-brand-900 ring-1 ring-sand-300 hover:ring-brand-300 " +
    "hover:bg-brand-50 active:translate-y-px",
  ghost: "text-brand-900 hover:bg-brand-50",
  white:
    "bg-white text-brand-900 shadow-soft hover:bg-sand-100 active:translate-y-px",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-13 px-8 text-base",
};

type ButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "className" | "children"
> & {
  /** Aanwezig? Dan rendert de component een link in plaats van een button. */
  href?: string;
  /** Forceert target="_blank" voor een interne URL. */
  external?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  href,
  external,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const isAbsolute = href.startsWith("http");
    const isProtocol = href.startsWith("tel:") || href.startsWith("mailto:");

    // Externe links en tel:/mailto: gaan buiten de router om.
    if (external || isAbsolute || isProtocol) {
      return (
        <a
          href={href}
          className={classes}
          target={isAbsolute ? "_blank" : undefined}
          rel={isAbsolute ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
