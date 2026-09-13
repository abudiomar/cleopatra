import Link from "next/link";

import { Logo } from "@/components/Logo";
import { Icon } from "@/components/ui/Icon";
import { contact, locations, nav, services, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-brand-200/70">
              {site.tagline}. Vaste teams, heldere afspraken en
              milieuvriendelijke middelen.
            </p>

            <div className="mt-7 flex flex-col gap-3 text-sm">
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2.5 text-white transition-opacity hover:opacity-70"
              >
                <Icon name="phone" className="size-4 text-brand-300" />
                {contact.phoneDisplay}
              </a>
              <a
                href={contact.emailHref}
                className="inline-flex items-center gap-2.5 text-white transition-opacity hover:opacity-70"
              >
                <Icon name="mail" className="size-4 text-brand-300" />
                {contact.email}
              </a>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white transition-opacity hover:opacity-70"
              >
                <Icon name="whatsapp" className="size-4 text-accent-400" />
                WhatsApp {contact.whatsappDisplay}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">
              Diensten
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/diensten#${service.slug}`}
                    className="text-brand-100/70 transition-colors hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">
              Menu
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-brand-100/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">
              Werkgebied
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-brand-100/70">
              {locations.map((loc) => (
                <li key={loc.city}>
                  {loc.city}
                  <span className="text-brand-100/35"> · {loc.region}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">
              Openingstijden
            </h2>
            <ul className="mt-5 space-y-2 text-sm text-brand-100/70">
              {contact.hours.map((h) => (
                <li key={h.days} className="flex flex-col">
                  <span>{h.days}</span>
                  <span className="text-brand-100/40">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-brand-100/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacybeleid
            </Link>
            <Link
              href="/algemene-voorwaarden"
              className="transition-colors hover:text-white"
            >
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
