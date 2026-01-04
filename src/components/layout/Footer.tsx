import Link from "next/link";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Logo } from "./Logo";
import { fallbackFooter } from "@/lib/fallback-data";

export interface FooterProps {
  contactInfo?: {
    address?: string;
    city?: string;
    phone?: string;
    email?: string;
    pec?: string;
    vatNumber?: string;
  };
  columns?: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
  legalLinks?: Array<{ label: string; href: string }>;
}

export function Footer({ contactInfo, columns, legalLinks }: FooterProps = {}) {
  // Use CMS data if available, otherwise use fallback
  const contact = contactInfo ?? fallbackFooter.contact ?? {};
  const footerColumns = columns ?? fallbackFooter.columns ?? [];
  const legal = legalLinks ?? fallbackFooter.legal?.links ?? [];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface transition-theme">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm font-light leading-relaxed text-text-secondary">
              Da oltre 30 anni ci occupiamo di costruzioni. Il nostro know-how
              ci permette di fornire soluzioni chiavi in mano.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {/* SOA Badge */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary shadow-sm"
                title="Attestazione SOA"
              >
                SOA
              </div>
              {/* ISO Badge */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[8px] font-bold leading-tight text-primary shadow-sm"
                title="ISO 9001:2015"
              >
                ISO
                <br />
                9001
              </div>
              {/* General Quality Badge */}
              <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1">
                <DynamicIcon
                  name="badge_check"
                  size={16}
                  className="text-primary"
                />
                <span className="text-xs font-light uppercase tracking-wider text-text-muted">
                  Qualità Certificata
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Columns from CMS */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-text-primary">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links?.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-text-secondary transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-text-primary">
              Contatti
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <DynamicIcon
                  name="location_on"
                  size={18}
                  className="shrink-0 text-primary"
                />
                <span className="text-sm font-light text-text-secondary">
                  {contact.address}
                  <br />
                  {contact.city}
                </span>
              </li>
              {contact.phone && (
                <li className="flex items-center gap-3">
                  <DynamicIcon
                    name="call"
                    size={18}
                    className="shrink-0 text-primary"
                  />
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-sm font-light text-text-secondary transition-colors hover:text-primary"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li className="flex items-center gap-3">
                  <DynamicIcon
                    name="mail"
                    size={18}
                    className="shrink-0 text-primary"
                  />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm font-light text-text-secondary transition-colors hover:text-primary"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs font-light text-text-muted text-center md:text-left">
            © {currentYear} BIEMME 2 S.r.l. - P.IVA/C.F. 01998580164 - Tutti i
            diritti riservati
          </p>
          <div className="flex items-center gap-6">
            {legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-light text-text-muted transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
