"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "./Button";

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaHref: string;
}

const slides: Slide[] = [
  {
    title: "Costruzioni",
    subtitle: "INDUSTRIALI",
    description:
      "La nostra esperienza e la nostra competenza ci permette di realizzare progetti industriali di ogni dimensione e complessità.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
    ctaText: "Scopri di più",
    ctaHref: "/servizi#industriale",
  },
  {
    title: "Costruzioni",
    subtitle: "CIVILI",
    description:
      "Il nostro Know how ci permette di realizzare qualsiasi progetto dal disegno all'opera finita, rispettando le esigenze del committente.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80",
    ctaText: "Scopri di più",
    ctaHref: "/servizi#residenziale",
  },
  {
    title: "Ristrutturazione",
    subtitle: "E RESTAURO",
    description:
      "Possiamo ristrutturare e restaurare immobili, in base alle esigenze tecniche richieste.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
    ctaText: "Scopri di più",
    ctaHref: "/servizi",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning],
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-[650px] w-full overflow-hidden md:h-[750px]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image con next/image */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 z-10 bg-black/40" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary-start/80 to-transparent" />
            <Image
              src={slide.image}
              alt={`${slide.title} ${slide.subtitle}`}
              fill
              priority={index === 0}
              sizes="100vw"
              quality={85}
              className={`object-cover transition-transform duration-[8000ms] ${
                index === currentSlide ? "scale-105" : "scale-100"
              }`}
            />
          </div>

          {/* Content */}
          <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-center px-6 lg:px-8">
            <div
              className={`max-w-3xl space-y-6 transition-all duration-700 ${
                index === currentSlide
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: index === currentSlide ? "200ms" : "0ms",
              }}
            >
              <div className="inline-flex items-center gap-2 border-l-2 border-primary-end pl-4">
                <span className="text-sm font-light uppercase tracking-widest text-white/80">
                  Dal 1990
                </span>
              </div>

              <h1 className="text-4xl font-light uppercase leading-tight tracking-tight text-white sm:text-5xl md:text-7xl">
                {slide.title} <br />
                <span className="font-normal text-white">{slide.subtitle}</span>
              </h1>

              <p className="max-w-xl text-lg font-light leading-relaxed text-white/70 md:text-xl">
                {slide.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button href={slide.ctaHref} variant="gradient" size="lg">
                  {slide.ctaText}
                </Button>
                <Button
                  href="/contatti"
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:border-white hover:bg-white/10"
                >
                  Richiedi Preventivo
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Navigation: Arrow Left + Indicators + Arrow Right */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4">
        {/* Arrow Left */}
        <button
          onClick={() =>
            goToSlide((currentSlide - 1 + slides.length) % slides.length)
          }
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-black/40"
          aria-label="Slide precedente"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "20px" }}
          >
            chevron_left
          </span>
        </button>

        {/* Indicators */}
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Vai alla slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow Right */}
        <button
          onClick={nextSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-black/40"
          aria-label="Slide successiva"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "20px" }}
          >
            chevron_right
          </span>
        </button>
      </div>

      {/* Bottom decorative strip */}
      <div
        className="absolute bottom-0 left-0 z-20 h-1 w-full"
        style={{ background: "var(--gradient-primary-horizontal)" }}
      />
    </section>
  );
}
