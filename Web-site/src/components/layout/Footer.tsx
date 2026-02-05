"use client";

import Link from "next/link";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Logo } from "./Logo";
import { openCookieSettings } from "@/components/ui/CookieConsent";

const DEFAULT_CONTACT = {
  address: "Via Cav. Agliardi, 18",
  city: "24050 Morengo (BG)",
  phone: "+39 0363958310",
  mobilePhone: "+39 3463157500",
  email: "info@biemme2.com",
};

const DEFAULT_COLUMNS = [
  {
    title: "Azienda",
    links: [
      { label: "Chi Siamo", href: "/azienda" },
      { label: "Servizi", href: "/servizi" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
];

const DEFAULT_LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookie" },
];

export interface FooterProps {
  contactInfo?: {
    address?: string;
    city?: string;
    phone?: string;
    mobilePhone?: string;
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
  const contact = {
    address: contactInfo?.address ?? DEFAULT_CONTACT.address,
    city: contactInfo?.city ?? DEFAULT_CONTACT.city,
    phone: contactInfo?.phone ?? DEFAULT_CONTACT.phone,
    mobilePhone: contactInfo?.mobilePhone ?? DEFAULT_CONTACT.mobilePhone,
    email: contactInfo?.email ?? DEFAULT_CONTACT.email,
  };
  const footerColumns = columns?.length ? columns : DEFAULT_COLUMNS;
  const legal = legalLinks?.length ? legalLinks : DEFAULT_LEGAL;
  const allLinks = footerColumns.flatMap((col) => col.links ?? []);

  return (
    <footer
      className="border-t border-border bg-surface transition-theme"
      suppressHydrationWarning
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Centered Logo & Description */}
        <div className="flex flex-col items-center text-center">
          <Logo />
          <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-text-secondary">
            Da oltre 40 anni ci occupiamo di costruzioni. Il nostro know-how ci
            permette di fornire soluzioni chiavi in mano.
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-border" />

        {/* Navigation Links - Centered Row */}
        <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-light text-text-secondary transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-border" />

        {/* Contact Info - Centered Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-light text-text-secondary md:gap-6">
          <span className="flex items-center gap-2">
            <DynamicIcon
              name="location_on"
              size={16}
              className="text-primary"
            />
            {contact.address}, {contact.city}
          </span>
          <span className="hidden text-border md:inline">•</span>
          {contact.phone && (
            <>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <DynamicIcon name="call" size={16} className="text-primary" />
                {contact.phone}
              </a>
              <span className="hidden text-border md:inline">•</span>
            </>
          )}
          {contact.mobilePhone && (
            <>
              <a
                href={`tel:${contact.mobilePhone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <DynamicIcon
                  name="smartphone"
                  size={16}
                  className="text-primary"
                />
                {contact.mobilePhone}
              </a>
              <span className="hidden text-border md:inline">•</span>
            </>
          )}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <DynamicIcon name="mail" size={16} className="text-primary" />
              {contact.email}
            </a>
          )}
        </div>

        {/* Certifications - Centered Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* SOA Badge */}
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[9px] font-bold text-primary shadow-sm"
            title="Attestazione SOA"
          >
            SOA
          </div>
          {/* ISO Badge */}
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[7px] font-bold leading-tight text-primary shadow-sm"
            title="ISO 9001:2015"
          >
            ISO
            <br />
            9001
          </div>
          {/* Quality Badge */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
            <DynamicIcon name="verified" size={14} className="text-primary" />
            <span className="text-xs font-light uppercase tracking-wider text-text-muted">
              Qualità Certificata
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-border pt-6 md:flex-row md:justify-between">
          <p
            className="text-xs font-light text-text-muted"
            suppressHydrationWarning
          >
            © {new Date().getFullYear()} BIEMME 2 S.r.l. - P.IVA/C.F.
            03002360166 - Tutti i diritti riservati
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
            <button
              type="button"
              onClick={openCookieSettings}
              className="text-xs font-light text-text-muted transition-colors hover:text-primary"
            >
              Gestione Cookie
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
