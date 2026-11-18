import type { NextConfig } from "next";

/**
 * De site wordt als statische export gebouwd (`out/`) en geserveerd via
 * Cloudflare Workers Static Assets. Redirects en security headers staan
 * daarom in `public/_redirects` en `public/_headers`, en het contactformulier
 * wordt afgehandeld door de Worker in `worker/index.ts`.
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // Geen Next.js image-server bij een statische export.
    unoptimized: true,
  },
};

export default nextConfig;
