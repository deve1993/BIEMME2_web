import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import type { Metadata } from "next";
import { getProntoInterventoPageData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pronto Intervento H24 | BIEMME 2 Costruzioni",
  description:
    "Servizio di pronto intervento edile 24 ore su 24, anche nei festivi. Idraulico, puntellature, messa in sicurezza tetti. Morengo (BG). Tel: +39 0363 958310",
  keywords: [
    "pronto intervento edile",
    "emergenza idraulica",
    "puntellatura",
    "messa in sicurezza tetti",
    "Bergamo",
    "Morengo",
    "24 ore",
  ],
};

// Static data for emergency services section (can be moved to CMS later)
const emergencyServices = [
  {
    icon: "plumbing",
    title: "Pronto Intervento Idraulico",
    description:
      "Intervento immediato per rotture tubazioni, ingorghi scarichi, perdite d'acqua e guasti all'impianto idrico. I nostri idraulici specializzati sono pronti ad intervenire con attrezzature professionali.",
    features: [
      "Disponibilità 24/7",
      "Diagnosi rapida",
      "Riparazione garantita",
    ],
  },
  {
    icon: "foundation",
    title: "Puntellatura e Stabilizzazione",
    description:
      "Sistemi di puntellatura verticali singoli o doppi per stabilizzare strutture pericolanti mediante elementi compressi e biette. Interveniamo tempestivamente per mettere in sicurezza edifici a rischio.",
    features: [
      "Messa in sicurezza immediata",
      "Certificazione intervento",
      "Coordinamento VVF",
    ],
  },
  {
    icon: "roofing",
    title: "Messa in Sicurezza Tetti",
    description:
      "Interventi urgenti su edifici con cedimenti di copertura e rischio di crollo. Garantiamo la sicurezza pubblica e privata con coperture provvisorie e ripristini definitivi.",
    features: [
      "Coperture provvisorie",
      "Rimozione detriti",
      "Ripristino definitivo",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    icon: "call",
    title: "Chiamata",
    description:
      "Contattaci al numero di emergenza, siamo sempre raggiungibili.",
  },
  {
    number: "02",
    icon: "search",
    title: "Valutazione",
    description:
      "Analizziamo il problema telefonicamente per preparare l'intervento.",
  },
  {
    number: "03",
    icon: "engineering",
    title: "Intervento",
    description:
      "La nostra squadra arriva sul posto in tempi rapidi con l'attrezzatura necessaria.",
  },
  {
    number: "04",
    icon: "task_alt",
    title: "Risoluzione",
    description:
      "Risolviamo il problema e rilasciamo certificazione dell'intervento.",
  },
];

export default async function ProntoInterventoPage() {
  const { service, contactInfo, header, footer } =
    await getProntoInterventoPageData();

  const phoneClean = contactInfo?.phone?.replace(/\s/g, "") ?? "+390363958310";
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative flex min-h-[70vh] flex-col items-center justify-center p-4 text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.75)), url("https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1920&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Emergency badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/20 px-4 py-2 backdrop-blur-sm">
            <span className="material-symbols-outlined animate-pulse text-primary">
              emergency
            </span>
            <span className="text-sm font-medium uppercase tracking-wider text-white/90">
              Servizio Emergenze
            </span>
          </div>

          <h1 className="mb-4 text-5xl font-light uppercase leading-tight tracking-tight text-white md:text-7xl">
            Pronto Intervento{" "}
            <span className="font-normal text-primary">H24</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg font-light leading-relaxed text-white/80 md:text-xl">
            Biemme 2 dispone di operai specializzati, pronti ad intervenire{" "}
            <strong className="text-white">24 ore su 24</strong>, anche nei
            giorni festivi. Emergenze edili? Siamo sempre disponibili.
          </p>

          {/* Phone CTA */}
          <div className="flex flex-col items-center gap-4">
            <a
              href={`tel:${phoneClean}`}
              className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary-end to-primary-start px-8 py-4 text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "32px" }}
              >
                call
              </span>
              <div className="text-left">
                <span className="block text-xs font-light uppercase tracking-wider opacity-80">
                  Chiama Ora
                </span>
                <span className="text-2xl font-medium tracking-wide md:text-3xl">
                  {contactInfo?.phone ?? "+39 0363 958310"}
                </span>
              </div>
            </a>
            <p className="text-sm font-light text-white/60">
              Disponibili 24/7, festivi inclusi
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8">
            <span className="material-symbols-outlined animate-bounce text-primary">
              keyboard_arrow_down
            </span>
          </div>
        </section>

        {/* Emergency Services */}
        <section className="bg-background py-20 transition-theme">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="text-sm font-light uppercase tracking-widest text-primary">
                I Nostri Servizi
              </span>
              <h2 className="mt-2 text-3xl font-light uppercase tracking-tight text-text-primary md:text-4xl">
                Interventi di Emergenza
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-light text-text-secondary">
                Siamo in grado di offrire un servizio di pronto intervento
                immediato per urgenze che richiedono tempestività e
                professionalità.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {emergencyServices.map((service) => (
                <Card key={service.title} className="group h-full">
                  <CardContent className="flex h-full flex-col">
                    {/* Icon */}
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary-muted text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "32px" }}
                      >
                        {service.icon}
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-medium text-text-primary">
                      {service.title}
                    </h3>

                    <p className="mb-6 flex-grow font-light leading-relaxed text-text-secondary">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="mt-auto space-y-2 border-t border-border pt-4">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-text-secondary"
                        >
                          <span className="material-symbols-outlined text-primary text-sm">
                            check_circle
                          </span>
                          <span className="font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="border-y border-border bg-surface py-20 transition-theme">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="text-sm font-light uppercase tracking-widest text-primary">
                Come Funziona
              </span>
              <h2 className="mt-2 text-3xl font-light uppercase tracking-tight text-text-primary md:text-4xl">
                4 Passi per la Soluzione
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative text-center">
                  {/* Connector line (hidden on last item and mobile) */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute left-1/2 top-10 hidden h-0.5 w-full bg-gradient-to-r from-primary to-transparent lg:block" />
                  )}

                  {/* Step number circle */}
                  <div className="relative z-10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-surface shadow-lg shadow-primary/20">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontSize: "32px" }}
                    >
                      {step.icon}
                    </span>
                  </div>

                  {/* Step number badge */}
                  <span className="mb-2 inline-block rounded bg-primary-muted px-2 py-0.5 text-xs font-medium text-primary">
                    STEP {step.number}
                  </span>

                  <h3 className="mb-2 text-lg font-medium text-text-primary">
                    {step.title}
                  </h3>

                  <p className="font-light text-text-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-background py-20 transition-theme">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Content */}
              <div>
                <span className="text-sm font-light uppercase tracking-widest text-primary">
                  Perché Sceglierci
                </span>
                <h2 className="mt-2 text-3xl font-light uppercase tracking-tight text-text-primary md:text-4xl">
                  Esperienza e Rapidità
                </h2>
                <p className="mt-4 font-light leading-relaxed text-text-secondary">
                  Da oltre 30 anni, BIEMME 2 è il punto di riferimento per le
                  emergenze edili nella provincia di Bergamo. La nostra squadra
                  è in grado di diagnosticare i problemi e risolverli con
                  competenza e velocità.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary">
                      <span className="material-symbols-outlined">timer</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">
                        Tempi Rapidi
                      </h4>
                      <p className="text-sm font-light text-text-secondary">
                        Intervento entro poche ore dalla chiamata
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary">
                      <span className="material-symbols-outlined">
                        verified_user
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">
                        Certificati
                      </h4>
                      <p className="text-sm font-light text-text-secondary">
                        Interventi certificati e garantiti
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary">
                      <span className="material-symbols-outlined">groups</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">
                        Team Esperto
                      </h4>
                      <p className="text-sm font-light text-text-secondary">
                        Operai specializzati con anni di esperienza
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary">
                      <span className="material-symbols-outlined">
                        construction
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">
                        Attrezzatura Pro
                      </h4>
                      <p className="text-sm font-light text-text-secondary">
                        Mezzi e strumenti professionali
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl lg:aspect-[4/3]">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80")`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-around p-6">
                  <div className="text-center text-white">
                    <span className="block text-3xl font-light">30+</span>
                    <span className="text-xs font-light uppercase tracking-wider opacity-80">
                      Anni
                    </span>
                  </div>
                  <div className="text-center text-white">
                    <span className="block text-3xl font-light">24/7</span>
                    <span className="text-xs font-light uppercase tracking-wider opacity-80">
                      Disponibilità
                    </span>
                  </div>
                  <div className="text-center text-white">
                    <span className="block text-3xl font-light">100%</span>
                    <span className="text-xs font-light uppercase tracking-wider opacity-80">
                      Affidabilità
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="relative overflow-hidden py-24"
          style={{ background: "var(--gradient-primary-horizontal)" }}
        >
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
            <span
              className="material-symbols-outlined text-white/20"
              style={{ fontSize: "80px" }}
            >
              emergency
            </span>

            <h2 className="text-3xl font-light uppercase leading-none tracking-tight text-white md:text-5xl">
              Hai un&apos;Emergenza?
            </h2>

            <p className="max-w-2xl text-xl font-light text-white/80">
              Non aspettare, contattaci subito. Siamo pronti ad intervenire in
              qualsiasi momento per risolvere il tuo problema.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={`tel:${phoneClean}`}
                className="group flex items-center justify-center gap-3 rounded-lg bg-white px-8 py-4 text-lg font-medium text-primary shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <span className="material-symbols-outlined">call</span>
                {contactInfo?.phone ?? "+39 0363 958310"}
              </a>

              <Button
                href="/contatti"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Richiedi Preventivo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
