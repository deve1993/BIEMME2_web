"use client";

import { useState, useEffect, useCallback } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

interface RecaptchaProviderProps {
  children: React.ReactNode;
}

/**
 * Lazy-loading reCAPTCHA Provider
 * Carica reCAPTCHA solo dopo interazione utente per migliorare LCP/TBT
 * Risparmio: ~150-200KB di JS non caricato al page load
 */
export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [shouldLoad, setShouldLoad] = useState(false);

  // Carica reCAPTCHA dopo interazione o timeout
  const triggerLoad = useCallback(() => {
    setShouldLoad(true);
  }, []);

  useEffect(() => {
    // Carica dopo 5 secondi su mobile, 3 secondi su desktop, o alla prima interazione
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const delay = isMobile ? 5000 : 3000;
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

  // Se non c'è la site key, renderizza solo i children senza reCAPTCHA
  if (!siteKey) {
    return <>{children}</>;
  }

  // Non caricare reCAPTCHA fino a interazione
  if (!shouldLoad) {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      language="it"
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
