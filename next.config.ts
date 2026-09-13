import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cleopatraschoonmaak.nl",
      },
    ],
  },

  // Oude One.com-URLs doorsturen naar de nieuwe Nederlandse routes.
  async redirects() {
    return [
      { source: "/services", destination: "/diensten", permanent: true },
      { source: "/about", destination: "/over-ons", permanent: true },
      { source: "/blog", destination: "/", permanent: false },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
