"use client";

import { useState, useEffect, useRef } from "react";

interface LazyMapProps {
  embedUrl: string;
  title: string;
  height?: number;
  className?: string;
}

/**
 * LazyMap - Carica l'iframe Google Maps solo quando entra nel viewport
 * Risparmio: ~100-150KB di risorse non caricate al page load
 */
export function LazyMap({
  embedUrl,
  title,
  height = 400,
  className = "",
}: LazyMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }, // Precarica 200px prima che sia visibile
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden rounded-2xl border border-neutral-200 shadow-lg ${className}`}
      style={{ minHeight: height }}
    >
      {isLoaded ? (
        <iframe
          src={embedUrl}
          width="100%"
          height={height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
          className="w-full"
        />
      ) : (
        <div
          className="flex items-center justify-center bg-neutral-100"
          style={{ height }}
        >
          <div className="text-center text-neutral-500">
            <div className="mb-2 h-8 w-8 animate-pulse rounded-full bg-neutral-300 mx-auto" />
            <p className="text-sm">Caricamento mappa...</p>
          </div>
        </div>
      )}
    </div>
  );
}
