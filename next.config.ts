import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Prevents duplicate double-invocation of rAF and physics effects in dev mode
  outputFileTracingRoot: path.join(__dirname),
  transpilePackages: ["framer-motion"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
