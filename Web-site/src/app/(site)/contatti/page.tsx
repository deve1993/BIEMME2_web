import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { LazyMap } from "@/components/ui/LazyMap";
import type { Metadata } from "next";
import { getContattiPageData } from "@/lib/data";
import { ContactFormWithRecaptcha } from "./ContactFormWithRecaptcha";

// ISR: Revalidate every 5 minutes for optimal caching
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contatti | BIEMME 2 Costruzioni",
  description:
    "Contatta BIEMME 2 per preventivi e informazioni. Sede a Morengo (BG). Tel: +39 0363 958310 / +39 346 3157500.",
};

// Static service options for form
const defaultServiceOptions = [
  { value: "", label: "Seleziona un servizio" },
  { value: "residenziale", label: "Edilizia Residenziale" },
  { value: "industriale", label: "Edilizia Industriale" },
  { value: "ristrutturazione", label: "Ristrutturazione" },
  { value: "scavi", label: "Scavi e Movimento Terra" },
  { value: "consulenza", label: "Consulenza Tecnica" },
  { value: "altro", label: "Altro" },
];

export default async function ContattiPage() {
  const { page, header, footer } = await getContattiPageData();

  // Get contact info from page global
  const contactInfo = page.contactInfo;
  const formServices = page.formSection?.servizi;

  // Build service options from CMS or use default
  // Filter out "altro" from CMS data to avoid duplicates, then add it at the end
  const serviceOptions =
    formServices && formServices.length > 0
      ? [
          { value: "", label: "Seleziona un servizio" },
          ...formServices
            .filter((s: { value: string }) => s.value !== "altro")
            .map((s: { label: string; value: string }) => ({
              value: s.value,
              label: s.label,
            })),
          { value: "altro", label: "Altro" },
        ]
      : defaultServiceOptions;

  // Build contact items from CMS data
  // contactInfo now has flat structure: address, city, phone, email, pec, vatNumber
  const addressLine =
    contactInfo?.address && contactInfo?.city
      ? `${contactInfo.address}, ${contactInfo.city}`
      : "Via Cavalier Quarto Agliardi, 18, 24050 Morengo (BG)";

  const phoneNumber = contactInfo?.phone ?? "+39 0363 958310";
  const mobileNumber = contactInfo?.mobilePhone ?? "+39 346 3157500";
  const phoneDisplay = `${phoneNumber} / ${mobileNumber}`;

  const contactItems = [
    {
      icon: "location_on",
      title: "Sede Principale",
      content: addressLine,
      isLink: false,
    },
    {
      icon: "call",
      title: "Telefono",
      content: phoneDisplay,
      subtext: "Lun-Ven, 8:00 - 18:00",
      href: `tel:${phoneNumber.replace(/\s/g, "")}`,
      isLink: true,
    },
    {
      icon: "smartphone",
      title: "Cellulare",
      content: mobileNumber,
      href: `tel:${mobileNumber.replace(/\s/g, "")}`,
      isLink: true,
    },
    {
      icon: "mail",
      title: "Email",
      content: contactInfo?.email ?? "info@biemme2.com",
      href: `mailto:${contactInfo?.email ?? "info@biemme2.com"}`,
      isLink: true,
    },
  ];

  // Hero Section data
  const heroBadge = page.hero?.badge ?? "Parla con noi";
  const heroTitle = page.hero?.title ?? "Resta in Contatto";
  const heroDescription =
    page.hero?.description ??
    "Compila il form per richiedere informazioni o un preventivo gratuito. Ti ricontatteremo al più presto.";

  // Google Maps embed URL from CMS or fallback
  const mapSection = page.mapSection;
  const mapEmbedUrl =
    mapSection?.embedUrl ??
    "https://maps.google.com/maps?q=Via+Cavalier+Quarto+Agliardi+18,+24050+Morengo+BG,+Italia&t=&z=16&ie=UTF8&iwloc=&output=embed";
  const mapTitle = mapSection?.title ?? "Dove Siamo";
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section with gradient background */}
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
            name="mail"
            size={144}
            className="absolute left-10 top-10 text-white/10"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <span className="mb-4 inline-block text-sm font-light uppercase tracking-widest text-white/80">
            {heroBadge}
          </span>
          <h1 className="text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-light text-white/80">
            {heroDescription}
          </p>
        </div>
      </section>

      <main className="flex-grow bg-neutral-50">
        {/* Contact Cards + Form Section */}
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-10">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
            {/* Left Column: Contact Info Cards */}
            <div className="space-y-6 lg:col-span-2">
              <h2 className="mb-8 text-2xl font-light text-text-primary">
                I nostri recapiti
              </h2>

              {contactItems.map((item) => (
                <div
                  key={item.title}
                  className="group flex items-center gap-5 rounded-2xl border border-neutral-100 bg-white p-4 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/5 text-primary transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
                    <DynamicIcon name={item.icon} size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
                      {item.title}
                    </h3>
                    {item.isLink && item.href ? (
                      <a
                        href={item.href}
                        className="text-base font-medium text-text-primary transition-colors hover:text-primary"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <span className="text-sm leading-snug text-text-primary">
                        {item.content}
                      </span>
                    )}
                    {item.subtext && (
                      <p className="mt-0.5 text-xs text-text-muted">
                        {item.subtext}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Quick action buttons */}
              <div className="flex gap-3 pt-4">
                <a
                  href={`tel:${(contactInfo?.phone ?? "+39 0363 958310").replace(/\s/g, "")}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  <DynamicIcon name="call" size={20} />
                  Chiama Ora
                </a>
                <a
                  href={`mailto:${contactInfo?.email ?? "info@biemme2.com"}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary bg-white px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                >
                  <DynamicIcon name="mail" size={20} />
                  Scrivi Email
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <Card
              id="form"
              className="relative overflow-hidden border-neutral-200 bg-white p-6 shadow-lg lg:col-span-3 md:p-8 lg:p-10"
            >
              {/* Decorative accent */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary via-primary-dark to-primary" />

              <CardContent>
                <h3 className="mb-2 text-2xl font-medium text-text-primary">
                  Inviaci un messaggio
                </h3>
                <p className="mb-6 text-sm text-text-muted">
                  Compila tutti i campi obbligatori (*) e ti risponderemo entro
                  24 ore.
                </p>

                <ContactFormWithRecaptcha serviceOptions={serviceOptions} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-10">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-light text-text-primary">
                {mapTitle}
              </h2>
              <p className="mt-2 text-text-secondary">{addressLine}</p>
            </div>

            <LazyMap
              embedUrl={mapEmbedUrl}
              title="Sede BIEMME 2 - Morengo (BG)"
              height={400}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
