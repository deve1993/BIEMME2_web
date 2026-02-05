import type { Metadata } from "next";
import {
  AnalyticsHead,
  AnalyticsBody,
} from "@/components/analytics/AnalyticsServer";
import { JsonLd } from "@/components/seo";
import { LazyLivePreview } from "@/components/providers/LazyLivePreview";
import { CookieConsent } from "@/components/ui/CookieConsent";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://biemme2.it";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "BIEMME 2 | Costruzioni Edili dal 1986",
    template: "%s | BIEMME 2",
  },
  description:
    "Da oltre 40 anni ci occupiamo di costruzioni. Edilizia residenziale, industriale, restauro e ristrutturazioni a Morengo (BG).",
  keywords: [
    "costruzioni edili",
    "edilizia residenziale",
    "edilizia industriale",
    "ristrutturazioni",
    "scavi",
    "movimento terra",
    "zootecnico",
    "Morengo",
    "Bergamo",
    "Lombardia",
    "BIEMME 2",
  ],
  authors: [{ name: "BIEMME 2 S.r.l." }],
  creator: "BIEMME 2 S.r.l.",
  publisher: "BIEMME 2 S.r.l.",
  openGraph: {
    title: "BIEMME 2 | Costruzioni Edili dal 1986",
    description:
      "Da oltre 40 anni ci occupiamo di costruzioni. Edilizia residenziale, industriale, restauro e ristrutturazioni in Lombardia.",
    type: "website",
    locale: "it_IT",
    url: BASE_URL,
    siteName: "BIEMME 2 Costruzioni",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIEMME 2 | Costruzioni Edili dal 1986",
    description:
      "Da oltre 40 anni ci occupiamo di costruzioni. Edilizia residenziale, industriale, restauro e ristrutturazioni.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Preconnect per font Google - riduce latenza */}
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* DNS Prefetch per analytics - caricati dopo interazione */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://connect.facebook.net" />

      {/* Preload hero images per LCP ottimale - desktop e mobile */}
      <link
        rel="preload"
        as="image"
        href="/img/hero-1-opt.webp"
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/img/hero-1-mobile.webp"
        media="(max-width: 768px)"
        fetchPriority="high"
      />

      {/* Analytics Scripts (GA4, GTM, Meta Pixel) - deferred after interaction */}
      <AnalyticsHead />

      {/* SEO Structured Data (JSON-LD) */}
      <JsonLd type="all" />

      {/* GTM NoScript fallback */}
      <AnalyticsBody />

      {/* Live Preview listener for CMS real-time updates - lazy loaded */}
      <LazyLivePreview />

      <div className="site-wrapper">{children}</div>

      {/* Cookie Consent Modal - GDPR compliant */}
      <CookieConsent />
    </>
  );
}
