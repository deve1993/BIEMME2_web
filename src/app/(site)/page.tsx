import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card, CardContent } from "@/components/ui/Card";
import { HeroSlider } from "@/components/ui/HeroSlider";
import Link from "next/link";
import Image from "next/image";
import { getHomePageData } from "@/lib/data";
import { getMediaUrl } from "@/lib/payload";
import type { Menu } from "@/types/payload";

export default async function HomePage() {
  const { features, stats, highlights, projects, header, footer } =
    await getHomePageData();

  // Transform header data for Header component
  // navigation can be a Menu object or a string (slug reference)
  const navigation =
    header?.navigation && typeof header.navigation !== "string"
      ? (header.navigation as Menu)
      : undefined;

  const headerNavItems = navigation?.items?.map((item) => ({
    href: item.url ?? "/",
    label: item.label,
    dropdown: item.children?.map((child) => ({
      href: child.url ?? "/",
      label: child.label,
    })),
  }));

  const headerCta = header?.cta?.enabled
    ? {
        text: header.cta.text ?? "Quotazione",
        href: header.cta.link ?? "/contatti#form",
      }
    : undefined;

  // Transform footer data
  const footerColumns = footer?.columns?.map((col) => ({
    title: col.title,
    links:
      col.links?.map((link) => ({
        label: link.label,
        href: link.url,
      })) ?? [],
  }));

  const footerLegalLinks = footer?.bottomBar?.legalLinks?.map((link) => ({
    label: link.label,
    href: link.url,
  }));
  return (
    <div className="flex min-h-screen flex-col">
      <Header navItems={headerNavItems} cta={headerCta} />

      <main className="flex-1">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Features Section */}
        <section className="bg-background py-20 transition-theme">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle
              subtitle="I NOSTRI SERVIZI"
              title="Quello che ti serve"
              description="Soluzioni complete per ogni esigenza costruttiva."
            />

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className="group relative overflow-hidden"
                >
                  {/* Background icon */}
                  <div className="absolute right-0 top-0 p-4 opacity-[0.03] transition-opacity group-hover:opacity-[0.05]">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontSize: "120px" }}
                    >
                      {feature.icon}
                    </span>
                  </div>

                  <CardContent>
                    {/* Icon */}
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded bg-primary-muted text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "28px" }}
                      >
                        {feature.icon}
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-medium uppercase tracking-wide text-text-primary">
                      {feature.title}
                    </h3>

                    {feature.subtitle && (
                      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-primary">
                        {feature.subtitle}
                      </p>
                    )}

                    <p className="font-light leading-relaxed text-text-secondary">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Chi Siamo Highlights */}
            <div className="mt-20 grid gap-8 rounded-2xl bg-surface px-6 py-10 md:grid-cols-3 md:px-12">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight.id}
                  className={`text-center ${index === 1 ? "md:border-x md:border-border/50" : ""}`}
                >
                  <h4 className="text-xl font-light uppercase text-primary">
                    {highlight.title}
                  </h4>
                  <p className="mt-2 font-light text-text-secondary">
                    {highlight.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section - Redesigned */}
        <section className="border-y border-border bg-surface py-20 transition-theme">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.id}
                  className={`flex flex-col items-center justify-center gap-2 ${
                    index !== stats.length - 1
                      ? "md:border-r md:border-border"
                      : ""
                  }`}
                >
                  <span className="text-6xl font-light tracking-tight text-primary md:text-7xl">
                    {stat.prefix}
                    {stat.value}
                    {stat.suffix}
                  </span>
                  <span className="text-sm font-light uppercase tracking-widest text-text-secondary">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="bg-surface py-20 transition-theme">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
              <SectionTitle
                subtitle="Portfolio"
                title="Ultime Realizzazioni"
                description="Uno sguardo ai nostri progetti recenti."
                className="mb-0"
              />

              <Link
                href="/servizi"
                className="group flex items-center gap-2 text-sm font-light uppercase tracking-wide text-primary transition-colors hover:text-primary-hover"
              >
                Vedi tutti i servizi
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => {
                // Array di immagini placeholder diversificate
                const placeholders = [
                  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80", // Construction 1
                  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80", // Architecture 1
                  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", // Skyscraper
                  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80", // Building
                ];

                const imageUrl = project.featuredImage
                  ? getMediaUrl(project.featuredImage)
                  : placeholders[index % placeholders.length];
                return (
                  <div
                    key={project.id}
                    className="group relative h-72 w-full overflow-hidden rounded-lg md:h-96"
                  >
                    {/* Background Image con next/image per ottimizzazione */}
                    <Image
                      src={imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={80}
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0 z-10 opacity-80 transition-opacity group-hover:opacity-90"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(44, 15, 18, 0.95), rgba(44, 15, 18, 0.3), transparent)",
                      }}
                    />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 z-20 w-full p-8">
                      <span className="mb-3 inline-block rounded bg-gradient-to-r from-primary-end to-primary-start px-3 py-1 text-xs font-light uppercase tracking-wider text-white">
                        {project.category}
                      </span>
                      <h3 className="mb-1 text-2xl font-light uppercase text-white">
                        {project.title}
                      </h3>
                      <p className="translate-y-4 text-sm font-light text-white/70 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {project.excerpt}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-surface-elevated py-24 transition-theme">
          {/* Abstract background pattern */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-5">
            <span
              className="material-symbols-outlined absolute -right-20 -top-20 rotate-12 text-text-primary"
              style={{ fontSize: "400px" }}
            >
              construction
            </span>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
            <h2 className="mb-6 text-2xl sm:text-3xl font-light uppercase text-text-primary md:text-5xl">
              Pronti a Costruire il Tuo Progetto?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg font-light text-text-secondary">
              Contattaci oggi per una consulenza gratuita. Dal preventivo alla
              posa della prima pietra, siamo il partner solido che cerchi.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="/contatti" variant="gradient" size="lg">
                Richiedi Preventivo
              </Button>
              <Button href="/contatti" variant="outline" size="lg">
                Contattaci
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer
        contactInfo={footer?.contactInfo}
        columns={footerColumns}
        legalLinks={footerLegalLinks}
      />
    </div>
  );
}
