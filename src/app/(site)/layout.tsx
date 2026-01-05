import type { Metadata } from "next";
import {
  AnalyticsHead,
  AnalyticsBody,
} from "@/components/analytics/AnalyticsServer";
import { JsonLd } from "@/components/seo";
import { LazyLivePreview } from "@/components/providers/LazyLivePreview";
import { CookieConsent } from "@/components/ui/CookieConsent";

/*
  Site Layout - Extends root layout with site-specific content.
  html/body tags are in root layout (src/app/layout.tsx).
*/

export const metadata: Metadata = {
  title: "BIEMME 2 | Costruzioni Edili",
  description:
    "Da oltre 30 anni ci occupiamo di costruzioni. Edilizia residenziale, industriale, restauro e ristrutturazioni a Morengo (BG).",
  keywords: [
    "costruzioni",
    "edilizia",
    "ristrutturazioni",
    "Morengo",
    "Bergamo",
    "BIEMME 2",
  ],
  authors: [{ name: "BIEMME 2 S.r.l." }],
  openGraph: {
    title: "BIEMME 2 | Costruzioni Edili",
    description:
      "Da oltre 30 anni ci occupiamo di costruzioni. Edilizia residenziale, industriale, restauro e ristrutturazioni.",
    type: "website",
    locale: "it_IT",
  },
  robots: {
    index: true,
    follow: true,
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
