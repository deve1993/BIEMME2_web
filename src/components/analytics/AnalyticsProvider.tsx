"use client";

import { useState, useEffect, useCallback } from "react";
import { GoogleAnalytics } from "./GoogleAnalytics";
import { GoogleTagManager, GoogleTagManagerNoScript } from "./GoogleTagManager";
import { MetaPixel } from "./MetaPixel";
import { WebVitals } from "./WebVitals";

interface AnalyticsProviderProps {
  children?: React.ReactNode;
}

/**
 * AnalyticsProvider - Carica tutti gli script di analytics
 * DEFERRED: Carica analytics solo dopo 4 secondi o interazione utente
 * Risparmio: ~200-400KB di JS non caricato al page load
 *
 * Inserire nel layout:
 * - <AnalyticsHead /> nel <head> (o dopo)
 * - <AnalyticsBody /> subito dopo <body>
 */

// Script da inserire (caricati dopo l'interazione)
export function AnalyticsHead() {
  const [shouldLoad, setShouldLoad] = useState(false);

  const triggerLoad = useCallback(() => {
    setShouldLoad(true);
  }, []);

  useEffect(() => {
    // Carica dopo 5s mobile / 4s desktop, o alla prima interazione utente
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const delay = isMobile ? 5000 : 4000;
    const timeout = setTimeout(triggerLoad, delay);

    const events = ["scroll", "click", "touchstart", "mousemove", "keydown"];
    const handleInteraction = () => {
      triggerLoad();
      events.forEach((e) => window.removeEventListener(e, handleInteraction));
    };

    events.forEach((e) =>
      window.addEventListener(e, handleInteraction, {
        once: true,
        passive: true,
      }),
    );

    return () => {
      clearTimeout(timeout);
      events.forEach((e) => window.removeEventListener(e, handleInteraction));
    };
  }, [triggerLoad]);

  // Non caricare analytics fino a interazione/timeout
  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <GoogleAnalytics />
      <GoogleTagManager />
      <MetaPixel />
      <WebVitals />
    </>
  );
}

// Noscript da inserire subito dopo <body>
export function AnalyticsBody() {
  return <GoogleTagManagerNoScript />;
}

// Provider wrapper (alternativa)
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return (
    <>
      <AnalyticsHead />
      {children}
    </>
  );
}
