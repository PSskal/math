import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Serve modern image formats (avif > webp > original) — big LCP win on mobile
  images: {
    formats: ["image/avif", "image/webp"],
    // 30-day cache for optimized images (default is 60s — way too short)
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // Don't advertise Next.js in response headers
  poweredByHeader: false,

  // Inline small images as base64 (saves a round-trip per tiny icon)
  experimental: {
    inlineCss: false, // keep off until stable
  },
};

export default nextConfig;
