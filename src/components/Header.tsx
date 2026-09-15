"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Image } from "@/components/ui/Image";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { contact, nav } from "@/content/site";


export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu sluiten bij navigatie.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Don't let the background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-brand-900 focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
      >
        To main content
      </a>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-sand-200/80 bg-sand-50/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-20 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Hoofdmenu" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors ${
                        active
                          ? "text-brand-900"
                          : "text-sand-600 hover:text-brand-900"
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-600" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-brand-900 transition-opacity hover:opacity-70"
            >
              <Icon name="phone" className="size-4" />
              {contact.phoneDisplay}
            </a>
            <Button href="/contact" size="sm">
              Offerte aanvragen
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobiel-menu"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            className="grid size-11 place-items-center rounded-full text-brand-900 ring-1 ring-sand-300 transition-colors hover:bg-white lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="size-5" />
          </button>
        </div>
      </header>

      {/* Mobiel menu */}
      <div
        id="mobiel-menu"
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-sand-50 px-5 pb-10 pt-4 lg:hidden"
      >
        <nav aria-label="Mobiel menu">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-sand-200">
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-5 text-xl font-medium text-brand-950"
                >
                  {item.label}
                  <Icon name="arrow" className="size-5 text-sand-400" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <Button href="/contact" size="lg">
            Offerte aanvragen
          </Button>
          <Button href={contact.phoneHref} variant="secondary" size="lg">
            <Icon name="phone" className="size-4" />
            Bel {contact.phoneDisplay}
          </Button>
        </div>
      </div>
    </>
  );
}
