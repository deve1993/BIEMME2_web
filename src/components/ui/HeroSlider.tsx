"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  Component,
  type ReactNode,
} from "react";
import Image from "next/image";
import { DynamicIcon } from "./DynamicIcon";
import { Button } from "./Button";
import type { HeroSlide, Media } from "@/types/payload";

// Error Boundary per catturare errori da estensioni browser
class HeroErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Ignora errori da estensioni browser
    if (error.stack?.includes("chrome-extension://")) {
      this.setState({ hasError: false });
      return;
    }
    console.error("HeroSlider error:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface HeroSliderProps {
  badge?: string;
  slides?: HeroSlide[];
  secondaryCta?: {
    label?: string;
    href?: string;
  };
  autoplayInterval?: number;
}

const DEFAULT_IMAGES = [
  { desktop: "/img/hero-1-opt.webp", mobile: "/img/hero-1-mobile.webp" },
  { desktop: "/img/hero-2-opt.webp", mobile: "/img/hero-2-mobile.webp" },
  { desktop: "/img/hero-3-opt.webp", mobile: "/img/hero-3-mobile.webp" },
];

const defaultSlides: HeroSlide[] = [
  {
    title: "Costruzioni",
    subtitle: "INDUSTRIALI",
    description:
      "La nostra esperienza e la nostra competenza ci permette di realizzare progetti industriali di ogni dimensione e complessità.",
    imageUrl: DEFAULT_IMAGES[0].desktop,
    mobileImageUrl: DEFAULT_IMAGES[0].mobile,
    ctaText: "Scopri di più",
    ctaHref: "/servizi#industriale",
  },
  {
    title: "Costruzioni",
    subtitle: "CIVILI",
    description:
      "Il nostro Know how ci permette di realizzare qualsiasi progetto dal disegno all'opera finita, rispettando le esigenze del committente.",
    imageUrl: DEFAULT_IMAGES[1].desktop,
    mobileImageUrl: DEFAULT_IMAGES[1].mobile,
    ctaText: "Scopri di più",
    ctaHref: "/servizi#residenziale",
  },
  {
    title: "Ristrutturazione",
    subtitle: "E RESTAURO",
    description:
      "Possiamo ristrutturare e restaurare immobili, in base alle esigenze tecniche richieste.",
    imageUrl: DEFAULT_IMAGES[2].desktop,
    mobileImageUrl: DEFAULT_IMAGES[2].mobile,
    ctaText: "Scopri di più",
    ctaHref: "/servizi",
  },
];

/**
 * Ottiene URL immagine con fallback robusto
 * Priorità: 1) Media object con url 2) imageUrl string 3) fallback default
 */
function getImageUrl(slide: HeroSlide, slideIndex: number = 0): string {
  // 1. Se image è un oggetto Media con url valido
  if (slide.image && typeof slide.image === "object") {
    const mediaUrl = (slide.image as Media).url;
    if (mediaUrl && mediaUrl.trim()) {
      return mediaUrl;
    }
  }
  // 2. Se imageUrl è una stringa non vuota
  if (slide.imageUrl && slide.imageUrl.trim()) {
    return slide.imageUrl;
  }
  // 3. Fallback al default per questa slide
  const fallbackIndex = Math.min(slideIndex, DEFAULT_IMAGES.length - 1);
  return DEFAULT_IMAGES[fallbackIndex].desktop;
}

// Fallback statico per quando c'è un errore
function HeroFallback() {
  return (
    <section className="relative aspect-[4/3] min-h-[400px] w-full overflow-hidden bg-primary sm:aspect-[16/10] sm:min-h-[450px] md:aspect-[16/9] md:min-h-[500px] lg:h-[750px] lg:min-h-[750px]">
      <div className="absolute inset-0">
        <Image
          src="/img/hero-1-opt.webp"
          alt="BIEMME 2 - Costruzioni"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-light uppercase text-white sm:text-5xl md:text-7xl">
            Costruzioni <br />
            <span className="font-normal">INDUSTRIALI</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

// Componente interno con la logica dello slider
function HeroSliderInner({
  badge = "Dal 1986",
  slides: propSlides,
  secondaryCta,
  autoplayInterval = 8000,
}: HeroSliderProps) {
  const slides =
    propSlides && propSlides.length > 0 ? propSlides : defaultSlides;
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Memoized slide navigation
  const goToSlide = useCallback((index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentSlide(index);
  }, []);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Singolo useEffect per autoplay - semplificato
  useEffect(() => {
    timerRef.current = setTimeout(goToNextSlide, autoplayInterval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlide, autoplayInterval, goToNextSlide]);

  const slide = slides[currentSlide];

  return (
    <section
      className="relative aspect-[4/3] min-h-[400px] w-full overflow-hidden sm:aspect-[16/10] sm:min-h-[450px] md:aspect-[16/9] md:min-h-[500px] lg:h-[750px] lg:min-h-[750px]"
      suppressHydrationWarning
    >
      {/* Background Image - picture element per responsive mobile/desktop */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 z-10 bg-black/40" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary-start/80 to-transparent" />

        {/* Prima slide: Next.js Image con priority per LCP ottimale */}
        {/* Altre slides: Next.js Image con lazy loading */}
        {currentSlide === 0 ? (
          <Image
            src={getImageUrl(slide, currentSlide)}
            alt={`${slide.title} ${slide.subtitle}`}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1023px) 100vw, 1920px"
            quality={90}
            className="object-cover"
          />
        ) : (
          <Image
            key={currentSlide}
            src={getImageUrl(slide, currentSlide)}
            alt={`${slide.title} ${slide.subtitle}`}
            fill
            loading="lazy"
            sizes="(max-width: 1023px) 100vw, 1920px"
            quality={90}
            className="object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-center px-6 lg:px-8">
        <div className="max-w-3xl space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 border-l-2 border-primary-end pl-4">
            <span className="text-sm font-light uppercase tracking-widest text-white/80">
              {badge}
            </span>
          </div>

          <h1 className="text-4xl font-light uppercase leading-tight tracking-tight text-white sm:text-5xl md:text-7xl">
            {slide.title} <br />
            <span className="font-normal text-white">{slide.subtitle}</span>
          </h1>

          <p className="max-w-xl text-base font-light leading-relaxed text-white/70 md:text-xl">
            {slide.description}
          </p>

          <div className="flex flex-wrap gap-3 pt-2 md:gap-4 md:pt-4">
            <Button
              href={slide.ctaHref ?? "/servizi"}
              variant="gradient"
              size="lg"
            >
              {slide.ctaText ?? "Scopri di più"}
            </Button>
            <Button
              href={secondaryCta?.href ?? "/contatti"}
              variant="outline-light"
              size="lg"
            >
              {secondaryCta?.label ?? "Richiedi Preventivo"}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation - senza transizioni per performance mobile */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 md:bottom-8 md:gap-4">
        <button
          onClick={() => {
            if (timerRef.current) clearTimeout(timerRef.current);
            goToPrevSlide();
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white md:h-12 md:w-12 md:hover:bg-black/40"
          aria-label="Slide precedente"
        >
          <DynamicIcon name="chevron_left" size={20} />
        </button>

        {/* Fixed-width dot containers to prevent layout shift */}
        <div className="flex gap-2 md:gap-3">
          {slides.map((_, index) => (
            <div
              key={index}
              className="flex h-2 w-6 items-center justify-center md:w-8"
            >
              <button
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full ${
                  index === currentSlide
                    ? "w-full bg-white"
                    : "w-2 bg-white/40 md:hover:bg-white/60"
                }`}
                aria-label={`Vai alla slide ${index + 1}`}
                aria-current={index === currentSlide ? "true" : undefined}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            if (timerRef.current) clearTimeout(timerRef.current);
            goToNextSlide();
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white md:h-12 md:w-12 md:hover:bg-black/40"
          aria-label="Slide successiva"
        >
          <DynamicIcon name="chevron_right" size={20} />
        </button>
      </div>

      {/* Bottom strip */}
      <div
        className="absolute bottom-0 left-0 z-20 h-1 w-full"
        style={{ background: "var(--gradient-primary-horizontal)" }}
      />
    </section>
  );
}

// Componente esportato con Error Boundary
export function HeroSlider(props: HeroSliderProps) {
  return (
    <HeroErrorBoundary fallback={<HeroFallback />}>
      <HeroSliderInner {...props} />
    </HeroErrorBoundary>
  );
}
