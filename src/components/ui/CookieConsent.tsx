"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getCookieConsent, setCookieConsent } from "@/lib/cookies";

interface CookieCategory {
  id: "technical" | "analytics" | "functional";
  name: string;
  description: string;
  required: boolean;
  defaultEnabled: boolean;
}

const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: "technical",
    name: "Cookie Tecnici",
    description: "Necessari per il funzionamento del sito. Sempre attivi.",
    required: true,
    defaultEnabled: true,
  },
  {
    id: "analytics",
    name: "Cookie Analitici",
    description: "Per analizzare il traffico e migliorare il sito.",
    required: false,
    defaultEnabled: true,
  },
  {
    id: "functional",
    name: "Cookie Funzionali",
    description: "Per ricordare le tue preferenze di navigazione.",
    required: false,
    defaultEnabled: true,
  },
];

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
  label: string;
}

function ToggleSwitch({
  enabled,
  onChange,
  disabled,
  label,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!enabled)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
        transition-colors duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        ${disabled ? "cursor-not-allowed opacity-50" : ""}
        ${enabled ? "bg-gradient-to-r from-primary-end to-primary-start" : "bg-gray-200"}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0
          transition duration-200 ease-in-out
          ${enabled ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  );
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: true,
    functional: true,
  });

  // Controlla se mostrare il modal all'avvio
  useEffect(() => {
    const consent = getCookieConsent();
    if (!consent) {
      // Piccolo delay per evitare flash durante hydration
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listener per riaprire il modal (da footer/altre pagine)
  useEffect(() => {
    const handleOpenModal = () => {
      const consent = getCookieConsent();
      if (consent) {
        setPreferences({
          analytics: consent.analytics,
          functional: consent.functional,
        });
      }
      setIsVisible(true);
    };

    window.addEventListener("openCookieSettings", handleOpenModal);
    return () =>
      window.removeEventListener("openCookieSettings", handleOpenModal);
  }, []);

  const handleSave = useCallback(
    (allAccepted: boolean) => {
      const newPreferences = allAccepted
        ? { analytics: true, functional: true }
        : preferences;

      setCookieConsent(newPreferences);
      setIsVisible(false);
    },
    [preferences],
  );

  const handleReject = useCallback(() => {
    setCookieConsent({ analytics: false, functional: false });
    setIsVisible(false);
  }, []);

  const handleAcceptAll = useCallback(() => {
    handleSave(true);
  }, [handleSave]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleReject}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-surface p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-300 md:p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2
            id="cookie-title"
            className="text-xl font-medium text-text-primary md:text-2xl"
          >
            Gestione Cookie
          </h2>
          <p className="mt-2 text-sm font-light text-text-secondary">
            Questo sito utilizza cookie per garantirti la migliore esperienza di
            navigazione e per finalità analitiche.
          </p>
        </div>

        {/* Cookie Categories */}
        <div className="mb-6 space-y-4">
          {COOKIE_CATEGORIES.map((category) => {
            const isEnabled = category.required
              ? true
              : category.id === "analytics"
                ? preferences.analytics
                : preferences.functional;

            return (
              <div
                key={category.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface-elevated p-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-text-primary">
                      {category.name}
                    </span>
                    {category.required && (
                      <span className="rounded-full bg-primary-muted px-2 py-0.5 text-xs font-light text-primary">
                        Sempre attivo
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs font-light text-text-muted">
                    {category.description}
                  </p>
                </div>
                <ToggleSwitch
                  enabled={isEnabled}
                  onChange={(newEnabled) => {
                    if (category.id === "analytics") {
                      setPreferences((prev) => ({
                        ...prev,
                        analytics: newEnabled,
                      }));
                    } else if (category.id === "functional") {
                      setPreferences((prev) => ({
                        ...prev,
                        functional: newEnabled,
                      }));
                    }
                  }}
                  disabled={category.required}
                  label={`${category.required ? "Sempre attivo" : isEnabled ? "Attivo" : "Disattivo"}: ${category.name}`}
                />
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleReject}
            className="rounded-lg border-2 border-primary px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Rifiuta Non Essenziali
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="rounded-lg bg-gradient-to-r from-primary-end to-primary-start px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all hover:from-primary-start hover:to-primary-end hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Accetta Tutti
          </button>
        </div>

        {/* Footer Link */}
        <div className="mt-4 text-center">
          <Link
            href="/cookie"
            className="text-xs font-light text-text-muted underline transition-colors hover:text-primary"
            onClick={() => setIsVisible(false)}
          >
            Maggiori informazioni nella Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook per aprire il modal cookie settings da altri componenti
 */
export function openCookieSettings(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openCookieSettings"));
  }
}
