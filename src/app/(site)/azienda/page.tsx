import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import type { Metadata } from "next";
import { getAziendaPageData } from "@/lib/data";
import { getMediaUrl } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Chi Siamo | BIEMME 2 Costruzioni",
  description:
    "Scopri la storia, i valori e il team di BIEMME 2. Da oltre 30 anni costruiamo con passione, efficienza e innovazione.",
};

export default async function AziendaPage() {
  const { timeline, values, team, certifications, header, footer } =
    await getAziendaPageData();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative flex min-h-[500px] flex-col items-center justify-center p-4"
          style={{
            backgroundImage: `linear-gradient(rgba(44, 15, 18, 0.65), rgba(44, 15, 18, 0.8)), url("https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex max-w-[960px] flex-col items-center gap-6 text-center">
            <div className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary-muted px-4 py-1.5 backdrop-blur-sm">
              <span className="text-xs font-light uppercase tracking-widest text-white">
                La Nostra Identità
              </span>
            </div>
            <h1 className="text-5xl font-light uppercase leading-tight tracking-tight text-white md:text-7xl">
              Chi Siamo
            </h1>
            <p className="max-w-[700px] text-lg font-light leading-relaxed text-white/70 md:text-xl">
              COSTRUTTORI PER PASSIONE. PASSIONE EFFICIENZA INNOVAZIONE SONO I
              NOSTRI REQUISITI PER MIGLIORARE IL NOSTRO TERRITORIO.
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
              title="La Nostra Storia"
              description="BIEMME 2 è una impresa generale di costruzioni radicata in Morengo (BG), con cantieri attivi in tutta la regione. Il suo nome rappresenta la 'memoria storica' delle proprie origini. Mantenerlo oggi serve per avere costantemente presente i valori cui si sono ispirati i soci fondatori, Berta Giovanni e Maffioletti Giuseppe."
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

              {timeline.map((item, index) => (
                <div key={item.id} className="contents">
                  {/* Icon Column */}
                  <div className="relative z-10 flex flex-col items-center pt-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-surface shadow-lg shadow-primary/20">
                      <span
                        className="material-symbols-outlined text-white"
                        style={{ fontSize: "24px" }}
                      >
                        {item.icon}
                      </span>
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
              ))}
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
              title="I Nostri Valori"
              description="I pilastri indistruttibili su cui costruiamo ogni singolo progetto, dal piccolo intervento alla grande opera."
              centered
            />

            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <Card key={value.id} className="group">
                  <CardContent>
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-primary-muted text-primary transition-transform duration-300 group-hover:scale-110">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "40px" }}
                      >
                        {value.icon}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-medium text-text-primary">
                      {value.title}
                    </h3>
                    <p className="font-light leading-relaxed text-text-secondary">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-background py-20 transition-theme">
          <div className="mx-auto max-w-[960px] px-6 lg:px-8">
            <div className="mb-12 flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-end">
              <h2 className="text-3xl font-light text-text-primary md:text-4xl">
                La Squadra
              </h2>
              <p className="font-light text-text-secondary md:max-w-[400px] md:text-right">
                Le persone che rendono possibile l&apos;impossibile, ogni
                giorno.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {team.map((member) => {
                const imageUrl = member.photo
                  ? getMediaUrl(member.photo)
                  : "https://images.unsplash.com/photo-1581092921461-eab62e97a78e?w=400&q=80";
                return (
                  <div
                    key={member.id}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative mb-6">
                      <div className="relative z-10 h-40 w-40 overflow-hidden rounded-full border-4 border-surface grayscale transition-all duration-500 group-hover:grayscale-0">
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
                      <div className="absolute -inset-2 z-0 scale-90 rounded-full border border-primary/30 transition-transform duration-500 group-hover:scale-100" />
                    </div>
                    <h3 className="mb-1 text-xl font-medium text-text-primary">
                      {member.name}
                    </h3>
                    <span className="mb-3 text-sm font-light uppercase tracking-wider text-primary">
                      {member.role}
                    </span>
                    <p className="px-4 text-sm font-light text-text-secondary">
                      {member.bio}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section
          className="py-16"
          style={{ background: "var(--gradient-primary-horizontal)" }}
        >
          <div className="mx-auto flex max-w-[960px] flex-col items-center justify-between gap-8 px-6 md:flex-row lg:px-8">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h2 className="text-2xl font-light text-white">
                Le nostre Certificazioni
              </h2>
              <p className="text-sm font-light text-white/70">
                Qualità riconosciuta a livello internazionale.
              </p>
            </div>
            <div className="mt-8 grid w-full gap-6 md:grid-cols-3">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex flex-col gap-3 rounded-lg border border-white/20 bg-white/5 p-6 backdrop-blur-sm transition-transform hover:-translate-y-1"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-white"
                      style={{ fontSize: "28px" }}
                    >
                      verified
                    </span>
                    <span className="text-xl font-medium text-white">
                      {cert.name}
                    </span>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-white/80">
                    {cert.description}
                  </p>
                </div>
              ))}
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
