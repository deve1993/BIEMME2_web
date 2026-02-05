import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getServiziPageData } from "@/lib/data";
import { getMediaUrl } from "@/lib/payload";

// ISR: Revalidate every 5 minutes for optimal caching
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Servizi | BIEMME 2 Costruzioni",
  description:
    "Edilizia residenziale, industriale, scavi e movimento terra. Scopri tutti i servizi offerti da BIEMME 2.",
};

export default async function ServiziPage() {
  const { page, header, footer } = await getServiziPageData();

  // Get data from page global
  const services = page.servicesSection?.services ?? [];
  const pillars = page.pillarsSection?.pillars ?? [];
  const benefits = page.benefitsSection?.benefits ?? [];
  const machinery = page.machinerySection?.machinery ?? [];

  // Hero Section data
  const heroBadge = page.hero?.badge ?? "Esperienza e Solidità";
  const heroTitle = page.hero?.title ?? "Le Nostre Specializzazioni";
  const heroDescription =
    page.hero?.description ??
    "Eccellenza tecnica e potenza operativa per ogni cantiere. Costruiamo infrastrutture solide per un futuro durevole.";

  // Pillars Section titles
  const pillarsSubtitle =
    page.pillarsSection?.subtitle ?? "Il Nostro Approccio";
  const pillarsTitle =
    page.pillarsSection?.title ?? "I 4 Pilastri del Servizio";

  // Benefits Section titles
  const benefitsSubtitle = page.benefitsSection?.subtitle ?? "PERCHÉ BIEMME 2";
  const benefitsTitle =
    page.benefitsSection?.title ?? "I Vantaggi di Sceglierci";

  // Machinery Section titles
  const machineryTitle =
    page.machinerySection?.title ?? "Il Nostro Parco Macchine";

  // CTA Section data
  const ctaTitle = page.ctaSection?.title ?? "Pronto a Costruire il Futuro?";
  const ctaDescription =
    page.ctaSection?.description ??
    "Contattaci oggi per una consulenza tecnica gratuita o per richiedere un preventivo personalizzato per il tuo prossimo cantiere.";
  const ctaButtonLabel = page.ctaSection?.buttonLabel ?? "Richiedi Preventivo";
  const ctaButtonHref = page.ctaSection?.buttonHref ?? "/contatti";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative flex min-h-[60vh] flex-col items-center justify-center p-4 text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(44, 15, 18, 0.65), rgba(44, 15, 18, 0.8)), url("/img/fondazioni-opt.webp")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex max-w-4xl flex-col gap-6">
            <span className="text-sm font-light uppercase tracking-widest text-primary">
              {heroBadge}
            </span>
            <h1 className="text-5xl font-light uppercase leading-tight tracking-tight text-white md:text-7xl">
              {heroTitle}
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white/70 md:text-xl">
              {heroDescription}
            </p>
            <div className="mt-4">
              <DynamicIcon
                name="chevron_down"
                size={24}
                className="animate-bounce text-primary"
              />
            </div>
          </div>
        </section>

        {/* Services */}
        <div className="mx-auto w-full max-w-[1280px] px-4 py-16 md:px-10">
          <div className="flex flex-col gap-24">
            {services.map((service, index) => {
              // Map service slugs to local images (WebP ottimizzati < 100KB)
              const serviceImages: Record<string, string> = {
                "edilizia-residenziale": "/img/bagno-opt.webp",
                "edilizia-industriale": "/img/fondazioni-2-opt.webp",
                "scavi-movimento-terra": "/img/fondazioni-opt.webp",
                "zootecnico": "/img/stalla-opt.webp",
              };
              const imageUrl = service.image
                ? getMediaUrl(service.image)
                : (serviceImages[service.slug ?? ""] ?? "/img/team-opt.webp");
              const imageFirst = index % 2 === 0;
              return (
                <section
                  key={service.slug || index}
                  id={service.slug}
                  className="grid items-center gap-12 lg:grid-cols-2"
                >
                  {/* Image con next/image ottimizzato */}
                  <div
                    className={`group relative aspect-[4/3] overflow-hidden rounded-xl ${
                      imageFirst ? "order-2 lg:order-1" : "order-2"
                    }`}
                  >
                    <div className="absolute inset-0 z-10 bg-primary/10 transition-colors group-hover:bg-transparent" />
                    <Image
                      src={imageUrl}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={80}
                      loading="lazy"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex flex-col gap-6 ${
                      imageFirst ? "order-1 lg:order-2" : "order-1"
                    }`}
                  >
                    <div className="flex items-center gap-3 text-primary">
                      <DynamicIcon
                        name={service.icon ?? "construction"}
                        size={24}
                      />
                      <span className="text-sm font-light uppercase tracking-wider">
                        Servizio {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-4xl font-light leading-tight text-text-primary md:text-5xl">
                      {service.title}
                    </h3>

                    <p className="border-l-2 border-primary/30 pl-6 text-lg font-light leading-relaxed text-text-secondary">
                      {service.excerpt}
                    </p>

                    {/* Features list */}
                    {service.features && service.features.length > 0 && (
                      <ul className="mt-2 flex flex-col gap-3">
                        {service.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-text-secondary"
                          >
                            <DynamicIcon
                              name="check_circle"
                              size={16}
                              className="shrink-0 text-primary"
                            />
                            <span className="font-light">{feature.title}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        {/* 4 Pilastri del Servizio */}
        <section className="w-full bg-background py-20 transition-theme">
          <div className="mx-auto max-w-[1280px] px-4 md:px-10">
            <div className="mb-12 text-center">
              <span className="text-sm font-light uppercase tracking-widest text-primary">
                {pillarsSubtitle}
              </span>
              <h2 className="mt-2 text-3xl font-light uppercase tracking-tight text-text-primary md:text-4xl">
                {pillarsTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-light text-text-secondary">
                I principi fondamentali che guidano ogni nostro progetto, dalla
                pianificazione alla consegna.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {pillars.map((pillar, idx) => (
                <Card key={idx} className="group">
                  <CardContent className="flex gap-5">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <DynamicIcon
                        name={pillar.icon ?? "construction"}
                        size={28}
                      />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-medium uppercase tracking-wide text-text-primary">
                        {pillar.title}
                      </h3>
                      <p className="text-sm font-light leading-relaxed text-text-secondary">
                        {pillar.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full border-y border-border bg-surface py-20 transition-theme">
          <div className="mx-auto max-w-[1280px] px-4 md:px-10">
            <SectionTitle
              subtitle={benefitsSubtitle}
              title={benefitsTitle}
              description="Il valore aggiunto che portiamo in ogni progetto, frutto di esperienza e innovazione continua."
              centered
            />

            <div className="grid gap-8 md:grid-cols-3">
              {benefits.map((benefit, idx) => (
                <Card
                  key={idx}
                  className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-muted text-primary transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:text-white">
                      <DynamicIcon
                        name={benefit.icon ?? "construction"}
                        size={40}
                      />
                    </div>
                    <h3 className="mb-3 text-xl font-medium text-text-primary">
                      {benefit.title}
                    </h3>
                    <p className="text-balance font-light leading-relaxed text-text-secondary">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Machinery Section */}
        <section className="w-full border-y border-border bg-surface-elevated py-20 transition-theme">
          <div className="mx-auto max-w-[1280px] px-4 md:px-10">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="mb-2 text-3xl font-light uppercase tracking-tight text-text-primary md:text-4xl">
                  {machineryTitle}
                </h2>
                <p className="max-w-lg font-light text-text-secondary">
                  Tecnologia all&apos;avanguardia per garantire efficienza e
                  sicurezza in ogni fase del progetto.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {machinery.map((machine, idx) => (
                <Card key={idx} className="group">
                  <CardContent>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-muted text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <DynamicIcon
                        name={machine.icon ?? "construction"}
                        size={24}
                      />
                    </div>
                    <h4 className="mb-2 text-xl font-medium text-text-primary">
                      {machine.name}
                    </h4>
                    <p className="text-sm font-light text-text-secondary">
                      {machine.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-background py-24 transition-theme">
          {/* Decorative background */}
          <div
            className="absolute right-0 top-0 h-full w-1/3 skew-x-12"
            style={{ background: "var(--primary-muted)" }}
          />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center">
            <DynamicIcon
              name="building2"
              size={64}
              className="text-primary/50"
            />

            <h2 className="text-4xl font-light uppercase leading-none tracking-tight text-text-primary md:text-5xl">
              {ctaTitle}
            </h2>

            <p className="max-w-2xl text-xl font-light text-text-secondary">
              {ctaDescription}
            </p>

            <Button href={ctaButtonHref} variant="gradient" size="lg">
              {ctaButtonLabel}
              <DynamicIcon
                name="arrow_right"
                size={20}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
