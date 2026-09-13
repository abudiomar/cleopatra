import type { Metadata } from "next";

import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Locations } from "@/components/sections/Locations";
import { Process } from "@/components/sections/Process";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { Usps } from "@/components/sections/Usps";

export const metadata: Metadata = {
  title: "Schoonmaakbedrijf voor particulier en zakelijk",
  description:
    "Professionele schoonmaak van woningen, kantoren en bedrijfspanden in Amsterdam, Rotterdam, Utrecht, Den Haag en Eindhoven. Vaste teams, milieuvriendelijke middelen en een vaste prijs.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Usps />
      <ServicesGrid limit={6} />
      <Process />
      <Testimonials />
      <Locations />
      <Faq />
      <CtaBanner />
    </>
  );
}
