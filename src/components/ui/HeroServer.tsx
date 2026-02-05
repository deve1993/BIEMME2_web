/**
 * HeroServer - Server Component per LCP ottimale
 *
 * IMPORTANTE: Questo è un SERVER COMPONENT (no "use client")
 * L'immagine viene renderizzata lato server senza dipendenza da JavaScript.
 * Questo è CRITICO per LCP perché il browser vede l'immagine immediatamente
 * nel HTML iniziale, senza attendere hydration.
 */

import Image from "next/image";
import Link from "next/link";
import type { Media } from "@/types/payload";

interface HeroServerProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  image?: Media | string;
  imageUrl?: string;
}

const DEFAULT_IMAGE = "/img/hero-1-opt.webp";

const defaults = {
  badge: "Dal 1986",
  title: "Costruzioni",
  subtitle: "INDUSTRIALI",
  description:
    "La nostra esperienza e la nostra competenza ci permette di realizzare progetti industriali di ogni dimensione e complessità.",
  ctaText: "Scopri di più",
  ctaHref: "/servizi#industriale",
  secondaryCtaText: "Richiedi Preventivo",
  secondaryCtaHref: "/contatti",
};

/**
 * Estrae l'URL dell'immagine da varie fonti (CMS Media object, string URL, o fallback)
 */
function getHeroImageUrl(image?: Media | string, imageUrl?: string): string {
  // 1. Se image è un oggetto Media con url
  if (image && typeof image === "object" && image.url) {
    return image.url;
  }
  // 2. Se image è una stringa non vuota
  if (image && typeof image === "string") {
    return image;
  }
  // 3. Se imageUrl è una stringa non vuota
  if (imageUrl && imageUrl.trim()) {
    return imageUrl;
  }
  // 4. Fallback al default
  return DEFAULT_IMAGE;
}

export function HeroServer({
  badge = defaults.badge,
  title = defaults.title,
  subtitle = defaults.subtitle,
  description = defaults.description,
  ctaText = defaults.ctaText,
  ctaHref = defaults.ctaHref,
  secondaryCtaText = defaults.secondaryCtaText,
  secondaryCtaHref = defaults.secondaryCtaHref,
  image,
  imageUrl,
}: HeroServerProps) {
  const heroImageUrl = getHeroImageUrl(image, imageUrl);

  return (
    <section className="relative aspect-[4/3] min-h-[400px] w-full overflow-hidden sm:aspect-[16/10] sm:min-h-[450px] md:aspect-[16/9] md:min-h-[500px] lg:h-[750px] lg:min-h-[750px]">
      {/* Background Image - Server rendered, priority per LCP */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 z-10 bg-black/40" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary-start/80 to-transparent" />

        {/* Next.js Image con priority - Server Component = no JS dependency */}
        <Image
          src={heroImageUrl}
          alt={`${title} ${subtitle}`}
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
          quality={75}
          className="object-cover"
        />
      </div>

      {/* Content - Server rendered */}
      <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-center px-6 lg:px-8">
        <div className="max-w-3xl space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 border-l-2 border-primary-end pl-4">
            <span className="text-sm font-light uppercase tracking-widest text-white/80">
              {badge}
            </span>
          </div>

          <h1 className="text-4xl font-light uppercase leading-tight tracking-tight text-white sm:text-5xl md:text-7xl">
            {title} <br />
            <span className="font-normal text-white">{subtitle}</span>
          </h1>

          <p className="max-w-xl text-base font-light leading-relaxed text-white/70 md:text-xl">
            {description}
          </p>

          <div className="flex flex-wrap gap-3 pt-2 md:gap-4 md:pt-4">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 rounded bg-gradient-to-r from-primary-end to-primary-start px-6 py-3 text-base font-light uppercase tracking-wide text-white hover:from-primary-start hover:to-primary-end hover:shadow-lg hover:shadow-primary/20"
            >
              {ctaText}
            </Link>
            <Link
              href={secondaryCtaHref}
              className="inline-flex items-center justify-center gap-2 rounded border-2 border-white/30 bg-transparent px-6 py-3 text-base font-light uppercase tracking-wide text-white hover:border-white hover:bg-white/10"
            >
              {secondaryCtaText}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="absolute bottom-0 left-0 z-20 h-1 w-full"
        style={{ background: "var(--gradient-primary-horizontal)" }}
      />
    </section>
  );
}
