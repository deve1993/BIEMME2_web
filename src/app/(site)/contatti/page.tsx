import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import type { Metadata } from "next";
import { getContattiPageData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contatti | BIEMME 2 Costruzioni",
  description:
    "Contatta BIEMME 2 per preventivi e informazioni. Sede a Morengo (BG). Tel: +39 0363 958310.",
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
  const { contactInfo, services, header, footer } = await getContattiPageData();

  // Build service options from CMS services or use default
  const serviceOptions =
    services && services.length > 0
      ? [
          { value: "", label: "Seleziona un servizio" },
          ...services.map((s) => ({ value: s.slug, label: s.title })),
          { value: "altro", label: "Altro" },
        ]
      : defaultServiceOptions;

  // Build contact items from CMS data
  const contactItems = [
    {
      icon: "location_on",
      title: "Sede Principale",
      content: `${contactInfo?.address?.street ?? "Via Agliardi Cavaliere Quarto, 18"}, ${contactInfo?.address?.cap ?? "24050"} ${contactInfo?.address?.city ?? "Morengo"} (${contactInfo?.address?.province ?? "BG"})`,
      isLink: false,
    },
    {
      icon: "call",
      title: "Telefono",
      content: contactInfo?.phone ?? "+39 0363 958310",
      subtext: "Lun-Ven, 8:00 - 18:00",
      href: `tel:${(contactInfo?.phone ?? "+39 0363 958310").replace(/\s/g, "")}`,
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

  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2791.8!2d9.6892!3d45.5393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4781538f8aaaaaab%3A0x1234567890abcdef!2sVia%20Agliardi%20Cavaliere%20Quarto%2C%2018%2C%2024050%20Morengo%20BG!5e0!3m2!1sit!2sit!4v1703600000000!5m2!1sit!2sit";
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 py-8 md:px-10 md:py-16">
        {/* Main Split Section */}
        <div className="grid gap-12 lg:grid-cols-2 xl:gap-20">
          {/* Left Column: Contact Info */}
          <div className="flex flex-col gap-10">
            <div className="space-y-4">
              <span className="text-sm font-light uppercase tracking-widest text-primary">
                Parla con noi
              </span>
              <h1 className="text-5xl font-light leading-[1.1] tracking-tight text-text-primary md:text-6xl">
                Resta in
                <br />
                <span className="text-text-secondary">Contatto.</span>
              </h1>
              <p className="mt-4 max-w-md text-lg font-light leading-relaxed text-text-secondary">
                Compila il seguente form per richiedere informazioni o un
                preventivo gratuito. Sarai ricontattato dal nostro ufficio
                commerciale. Grazie.
              </p>
            </div>

            <div className="mt-4 space-y-8">
              {contactItems.map((item) => (
                <div key={item.title} className="group flex items-start gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "24px" }}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-medium text-text-primary">
                      {item.title}
                    </h3>
                    <div className="font-light leading-relaxed text-text-secondary">
                      {item.isLink && item.href ? (
                        <a
                          href={item.href}
                          className="text-lg font-light text-text-secondary transition-colors hover:text-text-primary"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <span>{item.content}</span>
                      )}
                      {item.subtext && (
                        <p className="mt-1 text-sm text-text-muted">
                          {item.subtext}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="mt-auto border-t border-border pt-8">
              <p className="mb-4 text-sm font-light uppercase tracking-wider text-text-muted">
                Seguici su
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  <span className="text-sm font-medium">Fb</span>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  <span className="text-sm font-medium">Ig</span>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  <span className="text-sm font-medium">In</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <Card
            id="form"
            className="relative overflow-hidden p-6 md:p-8 lg:p-10"
          >
            {/* Decorative background accent */}
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/5 blur-[80px]" />

            <CardContent>
              <h3 className="mb-6 text-2xl font-light text-text-primary">
                Inviaci un messaggio
              </h3>

              <form className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="ml-1 text-sm font-light text-text-secondary"
                    >
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Mario Rossi"
                      className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3.5 font-light text-text-primary placeholder:text-text-muted/50 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="ml-1 text-sm font-light text-text-secondary"
                    >
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+39 333 ..."
                      className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3.5 font-light text-text-primary placeholder:text-text-muted/50 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="ml-1 text-sm font-light text-text-secondary"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="mario@esempio.it"
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3.5 font-light text-text-primary placeholder:text-text-muted/50 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="service"
                    className="ml-1 text-sm font-light text-text-secondary"
                  >
                    Tipo di Lavoro
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      defaultValue=""
                      className="w-full cursor-pointer appearance-none rounded-lg border border-border bg-surface-elevated px-4 py-3.5 font-light text-text-primary transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {serviceOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          disabled={option.value === ""}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                      <span className="material-symbols-outlined">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="ml-1 text-sm font-light text-text-secondary"
                  >
                    Messaggio
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Descrivi brevemente il tuo progetto..."
                    className="w-full resize-none rounded-lg border border-border bg-surface-elevated px-4 py-3.5 font-light text-text-primary placeholder:text-text-muted/50 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                  >
                    Invia Richiesta
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="mt-20 overflow-hidden rounded-2xl border border-border">
          <div className="relative">
            {/* Section Header */}
            <div className="bg-surface px-6 py-4 border-b border-border">
              <h2 className="text-xl font-light text-text-primary flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: "24px" }}
                >
                  location_on
                </span>
                Dove Siamo
              </h2>
              <p className="mt-1 text-sm font-light text-text-secondary">
                {contactInfo?.address?.street ??
                  "Via Agliardi Cavaliere Quarto, 18"}{" "}
                | {contactInfo?.address?.cap ?? "24050"}{" "}
                {contactInfo?.address?.city ?? "Morengo"} (
                {contactInfo?.address?.province ?? "BG"})
              </p>
            </div>

            {/* Google Maps Embed */}
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sede BIEMME 2 - Morengo (BG)"
              className="w-full"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
