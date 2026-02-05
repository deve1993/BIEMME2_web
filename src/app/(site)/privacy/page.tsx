import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";
import { getPrivacyPageData } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPrivacyPageData();
  return {
    title: page.seo?.title ?? "Privacy Policy | BIEMME 2 Costruzioni",
    description:
      page.seo?.description ??
      "Informativa sulla privacy di BIEMME 2 S.r.l. ai sensi del GDPR (Regolamento UE 2016/679).",
  };
}

export default async function PrivacyPage() {
  const { page } = await getPrivacyPageData();

  // Company data from CMS or fallback
  const company = {
    name: page.companyInfo?.name ?? "BIEMME 2 S.r.l.",
    address:
      page.companyInfo?.address ?? "Via Cav. Agliardi, 18 - 24050 Morengo (BG)",
    piva: page.companyInfo?.vatNumber ?? "03002360166",
    email: page.companyInfo?.email ?? "info@biemme2.com",
    phone: page.companyInfo?.phone ?? "+39 0363958310",
  };

  // Header data from CMS
  const headerBadge = page.header?.badge ?? "Informativa Legale";
  const headerTitle = page.header?.title ?? "Privacy Policy";
  const headerSubtitle =
    page.header?.subtitle ??
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)";
  const lastUpdate = page.header?.lastUpdate
    ? new Date(page.header.lastUpdate).toLocaleDateString("it-IT", {
        month: "long",
        year: "numeric",
      })
    : "Dicembre 2024";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-background py-16 transition-theme">
        <article className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 border-b border-border pb-8">
            <span className="text-sm font-light uppercase tracking-widest text-primary">
              {headerBadge}
            </span>
            <h1 className="mt-2 text-4xl font-light uppercase tracking-tight text-text-primary md:text-5xl">
              {headerTitle}
            </h1>
            <p className="mt-4 font-light text-text-secondary">
              {headerSubtitle}
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Ultimo aggiornamento: {lastUpdate}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8 font-light text-text-secondary">
            {/* Section 1 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                1. Titolare del Trattamento
              </h2>
              <p>
                Il Titolare del trattamento dei dati personali è{" "}
                <strong className="text-text-primary">{company.name}</strong>,
                con sede legale in {company.address}, P.IVA {company.piva}.
              </p>
              <p>
                Per esercitare i diritti previsti dal GDPR o per qualsiasi
                informazione relativa al trattamento dei dati personali, è
                possibile contattare il Titolare ai seguenti recapiti:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${company.email}`}
                    className="text-primary hover:underline"
                  >
                    {company.email}
                  </a>
                </li>
                <li>Telefono: {company.phone}</li>
                <li>Indirizzo: {company.address}</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                2. Tipologie di Dati Raccolti
              </h2>
              <p>
                I dati personali raccolti, in modo autonomo o tramite terze
                parti, includono:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <strong className="text-text-primary">
                    Dati di contatto:
                  </strong>{" "}
                  nome, cognome, email, numero di telefono
                </li>
                <li>
                  <strong className="text-text-primary">
                    Dati di navigazione:
                  </strong>{" "}
                  indirizzo IP, tipo di browser, sistema operativo, pagine
                  visitate, orari di accesso
                </li>
                <li>
                  <strong className="text-text-primary">Cookie:</strong> dati
                  raccolti tramite cookie tecnici e, previo consenso, cookie di
                  profilazione (vedi Cookie Policy)
                </li>
              </ul>
              <p>
                I dati sono forniti volontariamente dall&apos;utente attraverso
                la compilazione dei moduli di contatto presenti sul sito.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                3. Finalità del Trattamento
              </h2>
              <p>I dati personali sono trattati per le seguenti finalità:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Rispondere alle richieste di informazioni e preventivi inviate
                  tramite i moduli di contatto
                </li>
                <li>Gestire la corrispondenza commerciale e professionale</li>
                <li>
                  Adempiere agli obblighi previsti dalla legge, dai regolamenti
                  e dalla normativa europea
                </li>
                <li>
                  Migliorare la navigazione e l&apos;esperienza utente sul sito
                </li>
                <li>
                  Analizzare statisticamente il traffico del sito in forma
                  anonima e aggregata
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                4. Base Giuridica del Trattamento
              </h2>
              <p>Il trattamento dei dati personali si basa su:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <strong className="text-text-primary">
                    Consenso dell&apos;interessato
                  </strong>{" "}
                  (art. 6, par. 1, lett. a GDPR) per l&apos;invio di
                  comunicazioni commerciali
                </li>
                <li>
                  <strong className="text-text-primary">
                    Esecuzione di misure precontrattuali
                  </strong>{" "}
                  (art. 6, par. 1, lett. b GDPR) per rispondere alle richieste
                  di preventivo
                </li>
                <li>
                  <strong className="text-text-primary">
                    Legittimo interesse
                  </strong>{" "}
                  (art. 6, par. 1, lett. f GDPR) per la sicurezza del sito e
                  l&apos;analisi statistica
                </li>
                <li>
                  <strong className="text-text-primary">Obblighi legali</strong>{" "}
                  (art. 6, par. 1, lett. c GDPR) per adempimenti fiscali e
                  contabili
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                5. Modalità di Trattamento e Conservazione
              </h2>
              <p>
                Il trattamento dei dati personali è effettuato mediante
                strumenti informatici e/o telematici, con modalità organizzative
                e logiche strettamente correlate alle finalità indicate.
              </p>
              <p>
                I dati personali sono conservati per il tempo strettamente
                necessario a conseguire le finalità per cui sono stati raccolti
                e comunque:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <strong className="text-text-primary">
                    Dati di contatto:
                  </strong>{" "}
                  fino a 24 mesi dall&apos;ultimo contatto, salvo diversa
                  richiesta
                </li>
                <li>
                  <strong className="text-text-primary">Dati contabili:</strong>{" "}
                  10 anni come previsto dalla normativa fiscale italiana
                </li>
                <li>
                  <strong className="text-text-primary">
                    Dati di navigazione:
                  </strong>{" "}
                  massimo 12 mesi
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                6. Comunicazione e Diffusione dei Dati
              </h2>
              <p>
                I dati personali potranno essere comunicati a soggetti esterni
                che svolgono attività strumentali per conto del Titolare, quali:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Provider di servizi hosting e manutenzione del sito web</li>
                <li>Consulenti fiscali e legali</li>
                <li>Autorità pubbliche, se richiesto per legge</li>
              </ul>
              <p>
                I dati non saranno diffusi né trasferiti a paesi terzi extra-UE,
                salvo che ciò non sia necessario per l&apos;erogazione di
                specifici servizi e previo consenso dell&apos;utente.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                7. Diritti dell&apos;Interessato
              </h2>
              <p>
                Ai sensi degli artt. 15-22 del GDPR, l&apos;interessato ha il
                diritto di:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <strong className="text-text-primary">Accesso:</strong>{" "}
                  ottenere conferma dell&apos;esistenza dei dati e conoscerne il
                  contenuto
                </li>
                <li>
                  <strong className="text-text-primary">Rettifica:</strong>{" "}
                  aggiornare, modificare o integrare i dati
                </li>
                <li>
                  <strong className="text-text-primary">Cancellazione:</strong>{" "}
                  richiedere la cancellazione dei dati (&quot;diritto
                  all&apos;oblio&quot;)
                </li>
                <li>
                  <strong className="text-text-primary">Limitazione:</strong>{" "}
                  richiedere la limitazione del trattamento
                </li>
                <li>
                  <strong className="text-text-primary">Portabilità:</strong>{" "}
                  ricevere i dati in formato strutturato
                </li>
                <li>
                  <strong className="text-text-primary">Opposizione:</strong>{" "}
                  opporsi al trattamento per motivi legittimi
                </li>
                <li>
                  <strong className="text-text-primary">
                    Revoca del consenso:
                  </strong>{" "}
                  revocare il consenso in qualsiasi momento
                </li>
              </ul>
              <p>
                Per esercitare tali diritti, è possibile inviare una richiesta
                a:{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-primary hover:underline"
                >
                  {company.email}
                </a>
              </p>
              <p>
                L&apos;interessato ha inoltre il diritto di proporre reclamo
                all&apos;Autorità Garante per la Protezione dei Dati Personali
                (www.garanteprivacy.it).
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                8. Sicurezza dei Dati
              </h2>
              <p>
                Il Titolare adotta misure tecniche e organizzative adeguate per
                garantire un livello di sicurezza appropriato al rischio,
                conformemente all&apos;art. 32 del GDPR. Tali misure includono:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Crittografia delle comunicazioni (HTTPS/SSL)</li>
                <li>
                  Accesso limitato ai dati da parte del personale autorizzato
                </li>
                <li>Backup periodici dei dati</li>
                <li>Aggiornamento regolare dei sistemi di sicurezza</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="mb-4 text-2xl font-medium text-text-primary">
                9. Modifiche alla Privacy Policy
              </h2>
              <p>
                Il Titolare si riserva il diritto di modificare, aggiornare o
                integrare la presente informativa in qualsiasi momento. Le
                modifiche saranno pubblicate su questa pagina con indicazione
                della data di ultimo aggiornamento.
              </p>
              <p>
                Si consiglia di consultare periodicamente questa pagina per
                essere informati sulle eventuali modifiche.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
