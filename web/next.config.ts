import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [70, 80],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Any path, with or without sizing params (?w=…&q=…)
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      new URL("https://www.dutchbanglabank.com/img/**"),
      new URL("https://www.dutchbanglabank.com/images/**"),
      // Rocket's official app icon, as published on its Google Play listing
      new URL("https://play-lh.googleusercontent.com/**"),
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
