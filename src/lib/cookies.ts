/**
 * Cookie Consent Management Utilities
 * Gestisce il consenso cookie secondo GDPR
 */

const STORAGE_KEY = "cookieConsent";
const CONSENT_VERSION = 1;
const CONSENT_EXPIRY_DAYS = 365; // 12 mesi

export interface CookiePreferences {
  analytics: boolean;
  functional: boolean;
  timestamp: number;
  version: number;
}

/**
 * Verifica se il consenso è scaduto (> 12 mesi)
 */
function isConsentExpired(timestamp: number): boolean {
  const expiryMs = CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - timestamp > expiryMs;
}

/**
 * Legge le preferenze cookie da localStorage
 * Ritorna null se non esiste consenso o è scaduto
 */
export function getCookieConsent(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const preferences: CookiePreferences = JSON.parse(stored);

    // Verifica versione e scadenza
    if (
      preferences.version !== CONSENT_VERSION ||
      isConsentExpired(preferences.timestamp)
    ) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return preferences;
  } catch {
    return null;
  }
}

/**
 * Salva le preferenze cookie in localStorage
 */
export function setCookieConsent(
  preferences: Pick<CookiePreferences, "analytics" | "functional">,
): void {
  if (typeof window === "undefined") return;

  const fullPreferences: CookiePreferences = {
    ...preferences,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(fullPreferences));

  // Dispatch evento per notificare altri componenti
  window.dispatchEvent(
    new CustomEvent("cookieConsentChanged", {
      detail: fullPreferences,
    }),
  );
}

/**
 * Verifica se l'utente ha dato il consenso per una categoria specifica
 */
export function hasConsent(category: "analytics" | "functional"): boolean {
  const preferences = getCookieConsent();
  if (!preferences) return false;
  return preferences[category] === true;
}

/**
 * Rimuove il consenso (per permettere di riaprire il modal)
 */
export function clearCookieConsent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Accetta tutti i cookie
 */
export function acceptAllCookies(): void {
  setCookieConsent({
    analytics: true,
    functional: true,
  });
}

/**
 * Rifiuta i cookie non essenziali
 */
export function rejectNonEssentialCookies(): void {
  setCookieConsent({
    analytics: false,
    functional: false,
  });
}
