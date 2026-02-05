import dynamic from "next/dynamic";
import { getHomePageData } from "@/lib/data";
import { fallbackFooter } from "@/lib/fallback-data";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card, CardContent } from "@/components/ui/Card";

// Dynamic imports per Client Components - risolve errori Webpack in Next.js 15
const Header = dynamic(
  () => import("@/components/layout/Header").then((mod) => mod.Header),
  { ssr: true },
);
const Footer = dynamic(
  () => import("@/components/layout/Footer").then((mod) => mod.Footer),
  { ssr: true },
);
const HeroSlider = dynamic(
  () => import("@/components/ui/HeroSlider").then((mod) => mod.HeroSlider),
  { ssr: true },
);

// ISR: rigenera ogni 60 secondi (compatibile con Live Preview)
export const revalidate = 60;

export default async function HomePage() {
  const { page, header, footer } = await getHomePageData();

  // Get data from page global
  const features = page.featuresSection?.features ?? [];
  const stats = page.statsSection?.stats ?? [];
  const highlights = page.highlightsSection?.highlights ?? [];

  // Transform header data for Header component
  const headerNavItems = header?.navigation?.map((item) => ({
    href: item.href ?? "/",
    label: item.label,
    dropdown: item.children?.length
      ? item.children.map((child) => ({
          href: child.href ?? "/",
          label: child.label,
        }))
      : undefined,
  }));

  const headerCta = header?.cta
    ? {
        text: header.cta.label ?? "Contattaci",
        href: header.cta.href ?? "/contatti",
      }
    : undefined;

  // Transform footer data
  const footerColumns = footer?.columns?.length
    ? footer.columns.map((col) => ({
        title: col.title,
        links:
          col.links?.map((link) => ({
            label: link.label,
            href: link.href ?? "/",
          })) ?? [],
      }))
    : undefined;

  const footerLegalLinks = footer?.legal?.links?.length
    ? footer.legal.links.map((link) => ({
        label: link.label,
        href: link.href ?? "/",
      }))
    : fallbackFooter.legal?.links?.map((link) => ({
        label: link.label,
        href: link.href ?? "/",
      }));

  // Merge CMS contact data with fallback to ensure consistency between server and client
  const contactInfo = {
    address: footer?.contact?.address ?? fallbackFooter.contact?.address,
    city: footer?.contact?.city ?? fallbackFooter.contact?.city,
    phone: footer?.contact?.phone ?? fallbackFooter.contact?.phone,
    mobilePhone:
      footer?.contact?.mobilePhone ?? fallbackFooter.contact?.mobilePhone,
    email: footer?.contact?.email ?? fallbackFooter.contact?.email,
    vatNumber: footer?.contact?.vatNumber ?? fallbackFooter.contact?.vatNumber,
  };

  return (
    <div className="flex min-h-screen flex-col" suppressHydrationWarning>
      <Header navItems={headerNavItems} cta={headerCta} />

      <main className="flex-1" suppressHydrationWarning>
        {/* Hero Slider - 3 foto rotanti con testi */}
        <div suppressHydrationWarning>
          <HeroSlider
            badge={page.heroSlider?.badge}
            slides={page.heroSlider?.slides}
            secondaryCta={page.heroSlider?.secondaryCta}
            autoplayInterval={page.heroSlider?.autoplayInterval ?? 8000}
          />
        </div>

        {/* Features Section */}
        <section className="bg-background py-20 transition-theme">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle
              subtitle={page.featuresSection?.subtitle ?? "I NOSTRI SERVIZI"}
              title={page.featuresSection?.title ?? "Quello che ti serve"}
              description={
                page.featuresSection?.description ??
                "Soluzioni complete per ogni esigenza costruttiva."
              }
            />

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="group relative overflow-hidden">
                  {/* Background icon */}
                  <div className="absolute right-0 top-0 p-4 opacity-[0.03] transition-opacity group-hover:opacity-[0.05]">
                    <DynamicIcon
                      name={feature.icon ?? "construction"}
                      size={120}
                      className="text-primary"
                    />
                  </div>

                  <CardContent>
                    {/* Icon */}
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded bg-primary-muted text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      <DynamicIcon
                        name={feature.icon ?? "construction"}
                        size={28}
                      />
                    </div>

                    <h3 className="mb-2 text-lg font-medium uppercase tracking-wide text-text-primary">
                      {feature.title}
                    </h3>

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
                  key={index}
                  className={`flex flex-col items-center text-center ${index === 1 ? "md:border-x md:border-border/50" : ""}`}
                >
                  {/* Icon */}
                  {highlight.icon && (
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-muted text-primary">
                      <DynamicIcon name={highlight.icon} size={28} />
                    </div>
                  )}
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
                  key={index}
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

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary py-24 transition-theme">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute inset-0">
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
            {/* Corner accent - only bottom left */}
            <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-white/5" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
            <h2 className="mb-6 text-2xl font-light uppercase text-white sm:text-3xl md:text-5xl">
              {page.ctaSection?.title ?? "Pronti a Costruire il Tuo Progetto?"}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg font-light text-white/80">
              {page.ctaSection?.description ??
                "Contattaci oggi per una consulenza gratuita. Dal preventivo alla posa della prima pietra, siamo il partner solido che cerchi."}
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                href={page.ctaSection?.buttonHref ?? "/contatti"}
                variant="solid"
                size="lg"
                className="!bg-white !text-primary hover:!bg-gray-100 hover:!text-primary-dark"
              >
                {page.ctaSection?.buttonLabel ?? "Richiedi Preventivo"}
              </Button>
              <Button
                href={`tel:${page.ctaSection?.phone ?? "+39 0363 958310"}`}
                variant="outline-light"
                size="lg"
              >
                <DynamicIcon name="call" size={20} className="mr-2" />
                Chiama Ora
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer
        contactInfo={contactInfo}
        columns={footerColumns}
        legalLinks={footerLegalLinks}
      />
    </div>
  );
}
