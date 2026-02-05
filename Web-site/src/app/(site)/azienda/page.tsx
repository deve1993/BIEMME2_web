import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import type { Metadata } from "next";
import { getAziendaPageData } from "@/lib/data";
import { getMediaUrl } from "@/lib/payload";

// ISR: Revalidate every 5 minutes for optimal caching
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Chi Siamo | BIEMME 2 Costruzioni",
  description:
    "Scopri la storia, i valori e il team di BIEMME 2. Da oltre 40 anni costruiamo con passione, efficienza e innovazione.",
};

export default async function AziendaPage() {
  const { page, header, footer } = await getAziendaPageData();

  // Get data from page global
  const timeline = page.storiaSection?.timeline ?? [];
  const values = page.valoriSection?.values ?? [];
  const team = page.teamSection?.members ?? [];
  const certifications = page.certificazioniSection?.certifications ?? [];
  const certificationsTitle =
    page.certificazioniSection?.title ?? "Qualità Certificata";
  const certificationsDescription =
    page.certificazioniSection?.description ??
    "Operiamo secondo i più alti standard internazionali per garantire sicurezza, affidabilità e rispetto dell'ambiente.";

  // Hero Section data
  const heroBadge = page.hero?.badge ?? "La Nostra Identità";
  const heroTitle = page.hero?.title ?? "Chi Siamo";
  const heroDescription =
    page.hero?.description ??
    "COSTRUTTORI PER PASSIONE. PASSIONE EFFICIENZA INNOVAZIONE SONO I NOSTRI REQUISITI PER MIGLIORARE IL NOSTRO TERRITORIO.";

  // Storia Section data
  const storiaTitle = page.storiaSection?.title ?? "La Nostra Storia";
  const storiaDescription =
    page.storiaSection?.description ??
    "BIEMME 2 è una impresa generale di costruzioni radicata in Morengo (BG), con cantieri attivi in tutta la regione.";

  // Valori Section data
  const valoriTitle = page.valoriSection?.title ?? "I Nostri Valori";

  // Team Section data
  const teamTitle = page.teamSection?.title ?? "La Squadra";
  const teamDescription =
    page.teamSection?.description ??
    "Le persone che rendono possibile l'impossibile, ogni giorno.";

  // Organigramma Section data
  const organigrammaTitle = page.organigrammaSection?.title ?? "Organigramma";
  const direzioneTitle =
    page.organigrammaSection?.direzione?.title ?? "Direzione Generale";
  const direzioneSubtitle =
    page.organigrammaSection?.direzione?.subtitle ??
    "Strategia, Sviluppo & Controllo";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary py-20 md:py-28">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/5" />
            <DynamicIcon
              name="building2"
              size={144}
              className="absolute right-10 top-10 text-white/10"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-white/90">
              {heroBadge}
            </span>
            <h1 className="text-4xl font-medium leading-tight text-white drop-shadow-sm md:text-5xl lg:text-6xl">
              {heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/90">
              {heroDescription}
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section
          id="storia"
          className="relative overflow-hidden bg-background py-20 transition-theme"
        >
          <div className="mx-auto max-w-[960px] px-6 lg:px-8">
            <SectionTitle
              subtitle="Chi Siamo"
              title={storiaTitle}
              description={storiaDescription}
            />

            <div className="relative mt-12 grid grid-cols-[60px_1fr] gap-x-4 md:grid-cols-[100px_1fr] md:gap-x-8">
              {/* Vertical Line */}
              <div
                className="absolute bottom-4 left-[29px] top-4 w-0.5 md:left-[49px]"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--primary-end), var(--primary-start), transparent)",
                }}
              />

              {timeline.map(
                (
                  item: {
                    year: string;
                    title: string;
                    description?: string;
                    icon?: string;
                  },
                  index: number,
                ) => (
                  <div key={index} className="contents">
                    {/* Icon Column */}
                    <div className="relative z-10 flex flex-col items-center pt-2">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-surface shadow-lg shadow-primary/20">
                        <DynamicIcon
                          name={item.icon ?? "construction"}
                          size={24}
                          className="text-white"
                        />
                      </div>
                    </div>

                    {/* Content Column */}
                    <div
                      className={`flex flex-col pt-4 ${index < timeline.length - 1 ? "pb-12" : ""}`}
                    >
                      <span className="mb-1 text-sm font-light uppercase tracking-widest text-primary">
                        {item.year}
                      </span>
                      <h3 className="mb-2 text-xl font-medium text-text-primary md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="font-light leading-relaxed text-text-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section
          id="valori"
          className="border-y border-border bg-surface py-20 transition-theme"
        >
          <div className="mx-auto max-w-[1100px] px-6 lg:px-8">
            <SectionTitle
              title={valoriTitle}
              description="I pilastri solidi su cui costruiamo ogni singolo progetto, dal piccolo intervento alla grande opera."
              centered
            />

            <div className="grid gap-6 md:grid-cols-3">
              {values.map(
                (
                  value: { title: string; description?: string; icon?: string },
                  idx: number,
                ) => (
                  <Card key={idx} className="group">
                    <CardContent>
                      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-primary-muted text-primary transition-transform duration-300 group-hover:scale-110">
                        <DynamicIcon
                          name={value.icon ?? "construction"}
                          size={40}
                        />
                      </div>
                      <h3 className="mb-2 text-xl font-medium text-text-primary">
                        {value.title}
                      </h3>
                      <p className="font-light leading-relaxed text-text-secondary">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Organigramma Section */}
        <section className="border-y border-border bg-surface-elevated py-20 transition-theme">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-8">
            <SectionTitle
              title={organigrammaTitle}
              description="Una struttura organizzata per garantire efficienza e precisione in ogni commessa."
              centered
            />

            <div className="mt-16 flex flex-col items-center">
              {/* Level 1: Direzione */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex w-72 flex-col items-center gap-2 rounded-xl border border-primary/20 bg-surface p-6 text-center shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10">
                  <span className="rounded-full bg-primary/10 p-3 text-primary">
                    <DynamicIcon name="gem" size={32} />
                  </span>
                  <h4 className="text-xl font-medium text-primary">
                    {direzioneTitle}
                  </h4>
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/30 to-transparent my-1"></div>
                  <p className="text-sm font-light text-text-secondary">
                    {direzioneSubtitle}
                  </p>
                </div>
                {/* Vertical Connector Down */}
                <div className="h-12 w-px bg-border"></div>
              </div>

              {/* Level 2: Departments Container */}
              <div className="relative grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-4">
                {/* Horizontal Connector (Desktop Only) */}
                <div className="absolute left-0 right-0 top-0 -z-0 hidden justify-center md:flex">
                  <div className="h-px w-[66%] bg-border"></div>
                </div>

                {/* --- Area Tecnica --- */}
                <div className="flex flex-col items-center">
                  {/* Vertical Connector Top */}
                  <div className="hidden h-8 w-px bg-border md:block"></div>

                  {/* Department Card */}
                  <div className="group relative mb-6 flex w-full max-w-[320px] cursor-default flex-col items-center rounded-lg border border-border bg-surface p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                    <span className="mb-3 text-primary transition-transform duration-300 group-hover:scale-110">
                      <DynamicIcon name="wrench" size={32} />
                    </span>
                    <h5 className="mb-1 text-lg font-medium text-text-primary group-hover:text-primary">
                      Area Tecnica
                    </h5>
                    <p className="text-xs uppercase tracking-wider text-text-secondary opacity-80">
                      Progettazione & Sicurezza
                    </p>
                  </div>

                  {/* Vertical Connector Middle */}
                  <div className="h-6 w-px bg-border"></div>

                  {/* Sub-functions */}
                  <div className="flex w-full max-w-[280px] flex-col gap-3">
                    <div className="relative flex items-center justify-center rounded border border-border bg-background px-4 py-3 text-center text-sm text-text-secondary shadow-sm transition-colors hover:border-primary/20 hover:text-primary">
                      Capi Cantiere
                    </div>
                    <div className="relative flex items-center justify-center rounded border border-border bg-background px-4 py-3 text-center text-sm text-text-secondary shadow-sm transition-colors hover:border-primary/20 hover:text-primary">
                      Team Operativo
                      <span className="ml-2 text-[10px] text-text-secondary/50">
                        (Specializzati)
                      </span>
                    </div>
                    <div className="relative flex items-center justify-center rounded border border-border bg-background px-4 py-3 text-center text-sm text-text-secondary shadow-sm transition-colors hover:border-primary/20 hover:text-primary">
                      Gestione Mezzi
                    </div>
                  </div>
                </div>

                {/* --- Amministrazione --- */}
                <div className="flex flex-col items-center">
                  {/* Vertical Connector Top */}
                  <div className="hidden h-8 w-px bg-border md:block"></div>

                  {/* Department Card */}
                  <div className="group relative mb-6 flex w-full max-w-[320px] cursor-default flex-col items-center rounded-lg border border-border bg-surface p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                    <span className="mb-3 text-primary transition-transform duration-300 group-hover:scale-110">
                      <DynamicIcon name="user_cog" size={32} />
                    </span>
                    <h5 className="mb-1 text-lg font-medium text-text-primary group-hover:text-primary">
                      Amministrazione
                    </h5>
                    <p className="text-xs uppercase tracking-wider text-text-secondary opacity-80">
                      Finanza & HR
                    </p>
                  </div>

                  {/* Vertical Connector Middle */}
                  <div className="h-6 w-px bg-border"></div>

                  {/* Sub-functions */}
                  <div className="flex w-full max-w-[280px] flex-col gap-3">
                    <div className="relative flex items-center justify-center rounded border border-border bg-background px-4 py-3 text-center text-sm text-text-secondary shadow-sm transition-colors hover:border-primary/20 hover:text-primary">
                      Contabilità Generale
                    </div>
                    <div className="relative flex items-center justify-center rounded border border-border bg-background px-4 py-3 text-center text-sm text-text-secondary shadow-sm transition-colors hover:border-primary/20 hover:text-primary">
                      Risorse Umane
                    </div>
                    <div className="relative flex items-center justify-center rounded border border-border bg-background px-4 py-3 text-center text-sm text-text-secondary shadow-sm transition-colors hover:border-primary/20 hover:text-primary">
                      Controllo di Gestione
                    </div>
                  </div>
                </div>

                {/* --- Commerciale --- */}
                <div className="flex flex-col items-center">
                  {/* Vertical Connector Top */}
                  <div className="hidden h-8 w-px bg-border md:block"></div>

                  {/* Department Card */}
                  <div className="group relative mb-6 flex w-full max-w-[320px] cursor-default flex-col items-center rounded-lg border border-border bg-surface p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                    <span className="mb-3 text-primary transition-transform duration-300 group-hover:scale-110">
                      <DynamicIcon name="handshake" size={32} />
                    </span>
                    <h5 className="mb-1 text-lg font-medium text-text-primary group-hover:text-primary">
                      Commerciale
                    </h5>
                    <p className="text-xs uppercase tracking-wider text-text-secondary opacity-80">
                      Vendite & Gare
                    </p>
                  </div>

                  {/* Vertical Connector Middle */}
                  <div className="h-6 w-px bg-border"></div>

                  {/* Sub-functions */}
                  <div className="flex w-full max-w-[280px] flex-col gap-3">
                    <div className="relative flex items-center justify-center rounded border border-border bg-background px-4 py-3 text-center text-sm text-text-secondary shadow-sm transition-colors hover:border-primary/20 hover:text-primary">
                      Ufficio Acquisti
                    </div>
                    <div className="relative flex items-center justify-center rounded border border-border bg-background px-4 py-3 text-center text-sm text-text-secondary shadow-sm transition-colors hover:border-primary/20 hover:text-primary">
                      Relazioni Clienti
                    </div>
                    <div className="relative flex items-center justify-center rounded border border-border bg-background px-4 py-3 text-center text-sm text-text-secondary shadow-sm transition-colors hover:border-primary/20 hover:text-primary">
                      Ufficio Gare
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-background py-20 transition-theme">
          <div className="mx-auto max-w-[960px] px-6 lg:px-8">
            <div className="mb-12 flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-end">
              <h2 className="text-3xl font-light text-text-primary md:text-4xl">
                {teamTitle}
              </h2>
              <p className="font-light text-text-secondary md:max-w-[400px] md:text-right">
                {teamDescription}
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map(
                (
                  member: {
                    name: string;
                    role?: string;
                    bio?: string;
                    photo?: any;
                  },
                  idx: number,
                ) => {
                  // Use local photo based on name, or CMS photo if available
                  const nameSlug = member.name
                    .toLowerCase()
                    .replace(/^geom\.\s*/i, "")
                    .replace(/\s+/g, "-")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");
                  const localPhoto = `/img/team/${nameSlug}.webp`;
                  const imageUrl = member.photo
                    ? getMediaUrl(member.photo)
                    : localPhoto;
                  return (
                    <div
                      key={idx}
                      className="group flex flex-col items-center text-center"
                    >
                      <div className="relative mb-6">
                        <div className="relative z-10 h-40 w-40 overflow-hidden rounded-full border-4 border-surface grayscale transition-all duration-300 group-hover:grayscale-0">
                          <Image
                            src={imageUrl}
                            alt={member.name}
                            fill
                            sizes="160px"
                            quality={80}
                            loading="lazy"
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute -inset-2 z-0 scale-90 rounded-full border border-primary/30 transition-transform duration-300 group-hover:scale-100" />
                      </div>
                      <h3 className="mb-1 text-xl font-medium text-text-primary">
                        {member.name}
                      </h3>
                      <span className="mb-3 text-sm font-light uppercase tracking-wider text-primary">
                        {member.role}
                      </span>
                      <p className="whitespace-pre-line px-4 text-sm font-light text-text-secondary">
                        {member.bio}
                      </p>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </section>

        <section
          className="py-20"
          style={{ background: "var(--gradient-primary-horizontal)" }}
        >
          <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-12 px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-light uppercase tracking-tight text-white md:text-4xl">
                {certificationsTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-lg font-light text-white/80">
                {certificationsDescription}
              </p>
            </div>

            <div className="grid w-full gap-8 md:grid-cols-3">
              {certifications.map(
                (
                  cert: {
                    name: string;
                    description?: string;
                    icon?: string;
                    imageUrl?: string;
                  },
                  idx: number,
                ) => (
                  <a
                    key={idx}
                    href={cert.imageUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
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
                          <DynamicIcon
                            name={cert.icon ?? "verified"}
                            size={48}
                          />
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
                  </a>
                ),
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-background py-20 transition-theme">
          <div className="mx-auto max-w-[960px] px-6 lg:px-8">
            <Card className="flex flex-col items-center justify-between gap-8 p-8 md:flex-row md:p-12">
              <div className="flex flex-col gap-3 text-center md:text-left">
                <h2 className="text-3xl font-light uppercase leading-none tracking-tight text-text-primary md:text-4xl">
                  Vuoi lavorare con noi?
                </h2>
                <p className="text-lg font-light text-text-secondary">
                  Siamo sempre alla ricerca di nuovi talenti da inserire nel
                  nostro team.
                </p>
              </div>
              <Button
                href="/contatti"
                variant="gradient"
                size="lg"
                className="shrink-0"
              >
                Contattaci Ora
              </Button>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
