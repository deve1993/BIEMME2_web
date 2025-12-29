import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | BIEMME 2 Costruzioni",
  description:
    "Informativa sui cookie utilizzati dal sito BIEMME 2 S.r.l. ai sensi del GDPR e della normativa italiana.",
};

// Company data
const company = {
  name: "BIEMME 2 S.r.l.",
  website: "www.biemme2.com",
  email: "info@biemme2.com",
};

// Cookie types
const cookieTypes = [
  {
    category: "Cookie Tecnici (Necessari)",
    description:
      "Questi cookie sono essenziali per il corretto funzionamento del sito web. Non possono essere disattivati nei nostri sistemi.",
    consent: false,
    cookies: [
      {
        name: "session_id",
        purpose: "Gestione della sessione utente",
        duration: "Sessione",
        provider: "Prima parte",
      },
      {
        name: "csrf_token",
        purpose: "Protezione contro attacchi CSRF",
        duration: "Sessione",
        provider: "Prima parte",
      },
      {
        name: "cookie_consent",
        purpose: "Memorizza le preferenze sui cookie",
        duration: "12 mesi",
        provider: "Prima parte",
      },
    ],
  },
  {
    category: "Cookie Analitici",
    description:
      "Questi cookie ci permettono di contare le visite e le fonti di traffico per misurare e migliorare le prestazioni del nostro sito.",
    consent: true,
    cookies: [
      {
        name: "_ga",
        purpose: "Distingue gli utenti (Google Analytics)",
        duration: "2 anni",
        provider: "Google LLC",
      },
      {
        name: "_ga_*",
        purpose: "Mantiene lo stato della sessione (GA4)",
        duration: "2 anni",
        provider: "Google LLC",
      },
      {
        name: "_gid",
        purpose: "Distingue gli utenti",
        duration: "24 ore",
        provider: "Google LLC",
      },
    ],
  },
  {
    category: "Cookie di Funzionalità",
    description:
      "Questi cookie permettono al sito di fornire funzionalità avanzate e personalizzazione, come la memorizzazione delle preferenze.",
    consent: true,
    cookies: [
      {
        name: "theme_preference",
        purpose: "Memorizza la preferenza tema chiaro/scuro",
        duration: "1 anno",
        provider: "Prima parte",
      },
      {
        name: "language",
        purpose: "Memorizza la lingua preferita",
        duration: "1 anno",
        provider: "Prima parte",
      },
    ],
  },
];

export default function CookiePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-background py-16 transition-theme">
        <article className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 border-b border-border pb-8">
            <span className="text-sm font-light uppercase tracking-widest text-primary">
              Informativa Legale
            </span>
            <h1 className="mt-2 text-4xl font-light uppercase tracking-tight text-text-primary md:text-5xl">
              Cookie Policy
            </h1>
            <p className="mt-4 font-light text-text-secondary">
              Informativa sull&apos;utilizzo dei cookie ai sensi dell&apos;art.
              13 del Regolamento UE 2016/679 (GDPR) e del Provvedimento del
              Garante Privacy n. 229/2014
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Ultimo aggiornamento: Dicembre 2024
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8 font-light text-text-secondary">
            {/* Section 1 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                1. Cosa Sono i Cookie
              </h2>
              <p>
                I cookie sono piccoli file di testo che i siti web visitati
                inviano al dispositivo dell&apos;utente (computer, tablet,
                smartphone), dove vengono memorizzati per essere poi ritrasmessi
                agli stessi siti alla visita successiva.
              </p>
              <p>
                I cookie possono essere di &quot;prima parte&quot; (impostati
                direttamente dal sito visitato) o di &quot;terza parte&quot;
                (impostati da domini diversi da quello del sito visitato).
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                2. Tipologie di Cookie Utilizzati
              </h2>
              <p>
                Il sito {company.website} utilizza le seguenti tipologie di
                cookie:
              </p>

              {cookieTypes.map((type) => (
                <div
                  key={type.category}
                  className="mt-6 rounded-lg border border-border bg-surface p-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-medium text-text-primary">
                      {type.category}
                    </h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        type.consent
                          ? "bg-primary-muted text-primary"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {type.consent ? "Richiede consenso" : "Sempre attivo"}
                    </span>
                  </div>
                  <p className="mb-4 text-text-secondary">{type.description}</p>

                  {/* Cookie Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="pb-3 text-left font-medium text-text-primary">
                            Nome
                          </th>
                          <th className="pb-3 text-left font-medium text-text-primary">
                            Finalità
                          </th>
                          <th className="pb-3 text-left font-medium text-text-primary">
                            Durata
                          </th>
                          <th className="pb-3 text-left font-medium text-text-primary">
                            Fornitore
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {type.cookies.map((cookie) => (
                          <tr
                            key={cookie.name}
                            className="border-b border-border/50"
                          >
                            <td className="py-3 font-mono text-xs text-primary">
                              {cookie.name}
                            </td>
                            <td className="py-3 text-text-secondary">
                              {cookie.purpose}
                            </td>
                            <td className="py-3 text-text-muted">
                              {cookie.duration}
                            </td>
                            <td className="py-3 text-text-muted">
                              {cookie.provider}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                3. Cookie di Terze Parti
              </h2>
              <p>
                Alcuni cookie sono impostati da servizi di terze parti che
                compaiono sulle nostre pagine. Non abbiamo controllo su questi
                cookie. Per maggiori informazioni, consultare le rispettive
                informative:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-text-primary">
                    Google Analytics:
                  </strong>{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy di Google
                  </a>
                </li>
                <li>
                  <strong className="text-text-primary">Google Maps:</strong>{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy di Google
                  </a>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                4. Gestione dei Cookie
              </h2>
              <p>
                L&apos;utente può gestire le proprie preferenze relative ai
                cookie attraverso le funzionalità presenti nel proprio browser.
                Di seguito i link alle guide dei principali browser:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Apple Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                <strong className="text-text-primary">Nota:</strong> La
                disattivazione dei cookie tecnici potrebbe compromettere il
                corretto funzionamento di alcune parti del sito.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                5. Consenso
              </h2>
              <p>
                Al primo accesso al sito, viene mostrato un banner informativo
                che consente di:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Accettare tutti i cookie</li>
                <li>Rifiutare i cookie non essenziali</li>
                <li>Personalizzare le preferenze per categoria</li>
              </ul>
              <p>
                Il consenso può essere revocato in qualsiasi momento modificando
                le impostazioni del browser o contattandoci all&apos;indirizzo{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-primary hover:underline"
                >
                  {company.email}
                </a>
                .
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                6. Aggiornamenti della Cookie Policy
              </h2>
              <p>
                La presente Cookie Policy può essere soggetta a modifiche nel
                tempo. La data dell&apos;ultimo aggiornamento è indicata in cima
                a questa pagina. Si consiglia di consultare periodicamente
                questa pagina.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                7. Maggiori Informazioni
              </h2>
              <p>
                Per maggiori informazioni sul trattamento dei dati personali,
                consultare la nostra{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <p>
                Per qualsiasi domanda o richiesta relativa ai cookie,
                contattare:{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-primary hover:underline"
                >
                  {company.email}
                </a>
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
