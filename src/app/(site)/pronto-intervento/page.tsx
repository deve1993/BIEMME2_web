import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import type { Metadata } from "next";
import { getProntoInterventoPageData } from "@/lib/data";

// Disable caching for Live Preview support
export const dynamic = "force-dynamic";

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

export default async function ProntoInterventoPage() {
  const { page } = await getProntoInterventoPageData();

  // Get data from CMS Global
  const hero = page.hero;
  const phone = hero?.phone ?? "+39 0363 958310";
  const phoneClean = phone.replace(/\s/g, "");
  const phoneLabel = hero?.phoneLabel ?? "Chiama Ora";
  const availability =
    hero?.availability ?? "Disponibili 24/7, festivi inclusi";
  const heroBadge = hero?.badge ?? "Servizio Emergenze";
  const heroTitle = hero?.title ?? "Pronto Intervento H24";
  const heroDescription =
    hero?.description ??
    "Biemme 2 dispone di operai specializzati, pronti ad intervenire 24 ore su 24, anche nei giorni festivi. Emergenze edili? Siamo sempre disponibili.";

  // Emergency Services from CMS
  const emergencyServicesSection = page.emergencyServicesSection;
  const emergencyServices = emergencyServicesSection?.services ?? [];
  const servicesSubtitle =
    emergencyServicesSection?.subtitle ?? "I Nostri Servizi";
  const servicesTitle =
    emergencyServicesSection?.title ?? "Interventi di Emergenza";

  // Process Steps from CMS
  const processSection = page.processSection;
  const processSteps = processSection?.steps ?? [];
  const processTitle = processSection?.title ?? "Come Funziona";

  // Why Us Section from CMS
  const whyUsSection = page.whyUsSection;
  const whyUsSubtitle = whyUsSection?.subtitle ?? "Perché Sceglierci";
  const whyUsTitle = whyUsSection?.title ?? "Esperienza e Rapidità";
  const whyUsDescription =
    whyUsSection?.description ??
    "Da oltre 30 anni, BIEMME 2 è il punto di riferimento per le emergenze edili nella provincia di Bergamo.";
  const whyUsBenefits = whyUsSection?.benefits ?? [];

  // CTA Section from CMS
  const ctaSection = page.ctaSection;
  const ctaTitle = ctaSection?.title ?? "Hai un'Emergenza?";
  const ctaDescription =
    ctaSection?.description ??
    "Non aspettare, contattaci subito. Siamo pronti ad intervenire in qualsiasi momento per risolvere il tuo problema.";

  // Stats Section from CMS
  const stats = page.statsSection?.stats ?? [
    { value: "30+", label: "Anni" },
    { value: "24/7", label: "Disponibilità" },
    { value: "100%", label: "Affidabilità" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative flex min-h-[70vh] flex-col items-center justify-center p-4 text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.75)), url("/img/pronto-intervento-opt.webp")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Emergency badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/20 px-4 py-2 backdrop-blur-sm">
            <DynamicIcon
              name="siren"
              size={20}
              className="animate-pulse text-white"
            />
            <span className="text-sm font-medium uppercase tracking-wider text-white/90">
              {heroBadge}
            </span>
          </div>

          <h1 className="mb-4 text-5xl font-light uppercase leading-tight tracking-tight text-white md:text-7xl">
            {heroTitle.includes("H24") ? (
              <>
                {heroTitle.replace(" H24", "")}{" "}
                <span className="font-normal text-primary">H24</span>
              </>
            ) : (
              heroTitle
            )}
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg font-light leading-relaxed text-white/80 md:text-xl">
            {heroDescription}
          </p>

          {/* Phone CTA */}
          <div className="flex flex-col items-center gap-4">
            <a
              href={`tel:${phoneClean}`}
              className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary-end to-primary-start px-8 py-4 text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
            >
              <DynamicIcon name="call" size={32} />
              <div className="text-left">
                <span className="block text-xs font-light uppercase tracking-wider opacity-80">
                  {phoneLabel}
                </span>
                <span className="text-2xl font-medium tracking-wide md:text-3xl">
                  {phone}
                </span>
              </div>
            </a>
            <p className="text-sm font-light text-white/60">{availability}</p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8">
            <DynamicIcon
              name="chevron_down"
              size={24}
              className="animate-bounce text-primary"
            />
          </div>
        </section>

        {/* Emergency Services */}
        <section className="bg-background py-20 transition-theme">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="text-sm font-light uppercase tracking-widest text-primary">
                {servicesSubtitle}
              </span>
              <h2 className="mt-2 text-3xl font-light uppercase tracking-tight text-text-primary md:text-4xl">
                {servicesTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-light text-text-secondary">
                Siamo in grado di offrire un servizio di pronto intervento
                immediato per urgenze che richiedono tempestività e
                professionalità.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {emergencyServices.map(
                (service: {
                  icon?: string;
                  title: string;
                  description?: string;
                  features?: Array<{ text: string }>;
                }) => (
                  <Card key={service.title} className="group h-full">
                    <CardContent className="flex h-full flex-col">
                      {/* Icon */}
                      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary-muted text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
                        <DynamicIcon
                          name={service.icon ?? "emergency"}
                          size={32}
                        />
                      </div>

                      <h3 className="mb-3 text-xl font-medium text-text-primary">
                        {service.title}
                      </h3>

                      <p className="mb-6 flex-grow font-light leading-relaxed text-text-secondary">
                        {service.description}
                      </p>

                      {/* Features */}
                      {service.features && service.features.length > 0 && (
                        <ul className="mt-auto space-y-2 border-t border-border pt-4">
                          {service.features.map((feature) => (
                            <li
                              key={feature.text}
                              className="flex items-center gap-2 text-sm text-text-secondary"
                            >
                              <DynamicIcon
                                name="check_circle"
                                size={16}
                                className="shrink-0 text-primary"
                              />
                              <span className="font-light">{feature.text}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="border-y border-border bg-surface py-20 transition-theme">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="text-sm font-light uppercase tracking-widest text-primary">
                {processTitle}
              </span>
              <h2 className="mt-2 text-3xl font-light uppercase tracking-tight text-text-primary md:text-4xl">
                {processSteps.length} Passi per la Soluzione
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map(
                (
                  step: {
                    number?: string;
                    icon?: string;
                    title: string;
                    description?: string;
                  },
                  index: number,
                ) => (
                  <div key={step.title} className="relative text-center">
                    {/* Connector line (hidden on last item and mobile) */}
                    {index < processSteps.length - 1 && (
                      <div className="absolute left-1/2 top-10 hidden h-0.5 w-full bg-gradient-to-r from-primary to-transparent lg:block" />
                    )}

                    {/* Step number circle */}
                    <div className="relative z-10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-surface shadow-lg shadow-primary/20">
                      <DynamicIcon
                        name={step.icon ?? "check_circle"}
                        size={32}
                        className="text-primary"
                      />
                    </div>

                    {/* Step number badge */}
                    <span className="mb-2 inline-block rounded bg-primary-muted px-2 py-0.5 text-xs font-medium text-primary">
                      STEP {step.number ?? String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mb-2 text-lg font-medium text-text-primary">
                      {step.title}
                    </h3>

                    <p className="font-light text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                ),
              )}
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
                  {whyUsSubtitle}
                </span>
                <h2 className="mt-2 text-3xl font-light uppercase tracking-tight text-text-primary md:text-4xl">
                  {whyUsTitle}
                </h2>
                <p className="mt-4 font-light leading-relaxed text-text-secondary">
                  {whyUsDescription}
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {whyUsBenefits.length > 0
                    ? whyUsBenefits.map(
                        (benefit: {
                          icon?: string;
                          title: string;
                          description?: string;
                        }) => (
                          <div
                            key={benefit.title}
                            className="flex items-start gap-4"
                          >
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary">
                              <DynamicIcon
                                name={benefit.icon ?? "check_circle"}
                                size={24}
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-text-primary">
                                {benefit.title}
                              </h4>
                              <p className="text-sm font-light text-text-secondary">
                                {benefit.description}
                              </p>
                            </div>
                          </div>
                        ),
                      )
                    : /* Fallback benefits if CMS is empty */
                      [
                        {
                          icon: "timer",
                          title: "Tempi Rapidi",
                          description:
                            "Intervento entro poche ore dalla chiamata",
                        },
                        {
                          icon: "verified_user",
                          title: "Certificati",
                          description: "Interventi certificati e garantiti",
                        },
                        {
                          icon: "groups",
                          title: "Team Esperto",
                          description:
                            "Operai specializzati con anni di esperienza",
                        },
                        {
                          icon: "construction",
                          title: "Attrezzatura Pro",
                          description: "Mezzi e strumenti professionali",
                        },
                      ].map((benefit) => (
                        <div
                          key={benefit.title}
                          className="flex items-start gap-4"
                        >
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary">
                            <DynamicIcon name={benefit.icon} size={24} />
                          </div>
                          <div>
                            <h4 className="font-medium text-text-primary">
                              {benefit.title}
                            </h4>
                            <p className="text-sm font-light text-text-secondary">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl lg:aspect-[4/3]">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url("/img/team-opt.webp")`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-around p-6">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="text-center text-white">
                      <span className="block text-3xl font-light">
                        {stat.value}
                      </span>
                      <span className="text-xs font-light uppercase tracking-wider opacity-80">
                        {stat.label}
                      </span>
                    </div>
                  ))}
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
            <DynamicIcon name="siren" size={80} className="text-white/20" />

            <h2 className="text-3xl font-light uppercase leading-none tracking-tight text-white md:text-5xl">
              {ctaTitle}
            </h2>

            <p className="max-w-2xl text-xl font-light text-white/80">
              {ctaDescription}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={`tel:${phoneClean}`}
                className="group flex items-center justify-center gap-3 rounded-lg bg-white px-8 py-4 text-lg font-medium text-primary shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <DynamicIcon name="call" size={24} />
                {phone}
              </a>

              <Button href="/contatti" variant="outline-light" size="lg">
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
