"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface Certificate {
  name: string;
  description?: string;
  imageUrl?: string;
}

interface CertificateLightboxProps {
  certifications: Certificate[];
}

export function CertificateLightbox({
  certifications,
}: CertificateLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight")
        setActiveIndex((i) =>
          i !== null ? (i + 1) % certifications.length : null,
        );
      if (e.key === "ArrowLeft")
        setActiveIndex((i) =>
          i !== null
            ? (i - 1 + certifications.length) % certifications.length
            : null,
        );
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, certifications.length]);

  return (
    <>
      <div className="grid w-full gap-8 md:grid-cols-3">
        {certifications.map((cert, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="group flex flex-col items-center gap-4"
            aria-label={`Visualizza certificato ${cert.name}`}
          >
            <div className="relative overflow-hidden rounded-lg border-2 border-white/30 bg-white shadow-2xl shadow-black/20 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-white/60 group-hover:shadow-black/30">
              {cert.imageUrl ? (
                <Image
                  src={cert.imageUrl}
                  alt={cert.name}
                  width={360}
                  height={509}
                  quality={85}
                  loading="lazy"
                  className="h-auto w-full"
                />
              ) : (
                <div className="flex h-[509px] w-[360px] items-center justify-center bg-white/10 text-white/50">
                  Certificato
                </div>
              )}
            </div>

            <div className="text-center">
              <h3 className="text-lg font-medium text-white transition-colors group-hover:text-white/90 md:text-xl">
                {cert.name}
              </h3>
              {cert.description && (
                <p className="mt-1 text-sm font-light text-white/70">
                  {cert.description}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null && certifications[activeIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificato: ${certifications[activeIndex].name}`}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Chiudi"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {certifications.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(
                    (activeIndex - 1 + certifications.length) %
                      certifications.length,
                  );
                }}
                className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Precedente"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(
                    (activeIndex + 1) % certifications.length,
                  );
                }}
                className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Successivo"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg shadow-2xl md:max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {certifications[activeIndex].imageUrl && (
              <Image
                src={certifications[activeIndex].imageUrl!}
                alt={certifications[activeIndex].name}
                width={1200}
                height={1698}
                quality={90}
                className="h-auto max-h-[90vh] w-auto object-contain"
                priority
              />
            )}
          </div>

          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-lg font-medium text-white">
              {certifications[activeIndex].name}
            </p>
            {certifications[activeIndex].description && (
              <p className="mt-1 text-sm text-white/70">
                {certifications[activeIndex].description}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
