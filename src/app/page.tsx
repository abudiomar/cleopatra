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
  title: "Cleaning company for private and business",
  description:
    "Professional cleaning of homes, offices and commercial buildings in Amsterdam, Rotterdam, Utrecht, The Hague and Eindhoven. Fixed teams, environmentally friendly products and a fixed price.",
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
