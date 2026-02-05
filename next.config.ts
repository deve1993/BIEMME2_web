import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Output standalone per Docker deployment
  output: "standalone",
  // Silenzia i warning di deprecazione Sass da @payloadcms/ui
  sassOptions: {
    silenceDeprecations: ["legacy-js-api", "import"],
  },
  // Nascondi indicatore DevTools di Next.js
  devIndicators: false,
  // Ottimizzazioni sperimentali
  experimental: {
    // Ottimizza e minifica CSS per ridurre bundle size (solo in production per evitare conflitti HMR)
    optimizeCss: process.env.NODE_ENV === "production",
  },
  // Fix per errore webpack modules con Payload CMS
  webpack: (config, { isServer, dev }) => {
    // Ignora warning di critical dependency da Payload
    config.module.exprContextCritical = false;

    // Fix per HMR con Payload CMS in dev mode
    if (dev) {
      // Disabilita caching aggressivo che causa problemi con moduli dinamici
      config.cache = false;
    }

    // Assicura che i moduli Payload vengano processati correttamente
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },
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
    // Device sizes per responsive images (480 per mobile hero)
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    // Quality values ammessi (richiesto da Next.js 16+)
    qualities: [60, 65, 70, 75, 80, 85, 90, 100],
    // Minimizza CLS con placeholder blur
    dangerouslyAllowSVG: true,
    // Cache delle immagini ottimizzate (1 anno)
    minimumCacheTTL: 31536000,
  },
  // Ottimizzazioni performance
  compress: true,
  poweredByHeader: false,
  // Transpile Payload packages
  transpilePackages: ["@payloadcms/next", "@payloadcms/richtext-lexical"],
  // Cache headers per assets statici
  async headers() {
    return [
      {
        // Immagini: cache 1 anno
        source: "/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Font e assets statici
        source: "/:path*.(woff|woff2|eot|ttf|otf|ico|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // JS e CSS chunks
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(withPayload(nextConfig));
