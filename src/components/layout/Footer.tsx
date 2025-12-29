import Link from "next/link";
import { Logo } from "./Logo";
import {
  fallbackContactInfo,
  fallbackFooterColumns,
  fallbackFooterLegal,
} from "@/lib/fallback-data";
import type { ContactInfo } from "@/types/payload";

// Fallback links structure
const defaultFooterLinks = {
  azienda: [
    { href: "/azienda", label: "Chi Siamo" },
    { href: "/azienda#valori", label: "I Nostri Valori" },
    { href: "/azienda#storia", label: "La Nostra Storia" },
  ],
  servizi: [
    { href: "/servizi", label: "Tutti i Servizi" },
    { href: "/servizi#residenziale", label: "Edilizia Residenziale" },
    { href: "/servizi#industriale", label: "Edilizia Industriale" },
    { href: "/servizi#scavi", label: "Scavi e Movimento Terra" },
    { href: "/pronto-intervento", label: "Pronto Intervento H24" },
  ],
  contatti: [
    { href: "/contatti", label: "Contattaci" },
    { href: "/contatti#form", label: "Richiedi Preventivo" },
  ],
};

export interface FooterProps {
  contactInfo?: ContactInfo;
  columns?: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
  legalLinks?: Array<{ label: string; href: string }>;
}

export function Footer({ contactInfo, columns, legalLinks }: FooterProps = {}) {
  // Use CMS data if available, otherwise use fallback
  const contact = contactInfo ?? fallbackContactInfo;
  const footerColumns = columns ?? fallbackFooterColumns;
  const legal = legalLinks ?? fallbackFooterLegal;
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
            <div className="mt-6 flex items-center gap-3">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontSize: "20px" }}
              >
                verified
              </span>
              <span className="text-xs font-light uppercase tracking-wider text-text-muted">
                Qualità Certificata
              </span>
            </div>
          </div>

          {/* Dynamic Columns from CMS */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-text-primary">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
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
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: "18px" }}
                >
                  location_on
                </span>
                <span className="text-sm font-light text-text-secondary">
                  {contact.address?.street}
                  <br />
                  {contact.address?.cap} {contact.address?.city} (
                  {contact.address?.province})
                </span>
              </li>
              {contact.phone && (
                <li className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontSize: "18px" }}
                  >
                    phone
                  </span>
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
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontSize: "18px" }}
                  >
                    mail
                  </span>
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
