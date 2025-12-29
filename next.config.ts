import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    // Formati ottimizzati per performance
    formats: ["image/avif", "image/webp"],
    // Device sizes per responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Qualità immagini per Next.js 16+
    qualities: [75, 80, 85, 90],
    // Minimizza CLS con placeholder blur
    dangerouslyAllowSVG: true,
  },
  // Fix per Windows: evita errori Jest worker
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  // Ottimizzazioni performance
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
