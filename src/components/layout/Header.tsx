/**
 * Header - Server Component con MobileMenu Client isolato
 *
 * Ottimizzazione:
 * - Desktop nav: Server rendered, zero JS
 * - Dropdown desktop: CSS-only hover
 * - Mobile menu: Client Component isolato (MobileMenu.tsx)
 *
 * Questo riduce il JS necessario per l'header da ~3KB a ~500B
 */

import Link from "next/link";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { fallbackHeader } from "@/lib/fallback-data";

export interface NavItem {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
}

export interface HeaderProps {
  navItems?: NavItem[];
  cta?: { text: string; href: string };
}

export function Header({ navItems, cta }: HeaderProps = {}) {
  const navigation =
    navItems ??
    fallbackHeader.navigation?.map((item) => ({
      href: item.href,
      label: item.label,
      dropdown: item.children?.map((child) => ({
        href: child.href,
        label: child.label,
      })),
    })) ??
    [];

  const ctaButton = cta ?? {
    text: fallbackHeader.cta?.label ?? "Contattaci",
    href: fallbackHeader.cta?.href ?? "/contatti",
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Logo />

        {/* Desktop Navigation - Server rendered, CSS-only dropdown */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) =>
            item.dropdown ? (
              <div key={item.href} className="group relative">
                <button className="flex items-center gap-1 text-sm font-light uppercase tracking-wide text-text-secondary transition-colors hover:text-primary">
                  {item.label}
                  <DynamicIcon
                    name="chevron_down"
                    size={16}
                    className="transition-transform group-hover:rotate-180"
                  />
                </button>

                {/* Dropdown con CSS hover - nessun JavaScript */}
                <div className="invisible absolute left-0 top-full min-w-[200px] pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-lg border border-border bg-background py-2 shadow-lg">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-2.5 text-sm font-light text-text-secondary transition-colors hover:bg-surface hover:text-primary"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-light uppercase tracking-wide text-text-secondary transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ),
          )}

          <Link
            href={ctaButton.href}
            className="btn-gradient rounded px-5 py-2.5 text-sm font-light uppercase tracking-wide"
          >
            {ctaButton.text}
          </Link>
        </nav>

        {/* Mobile Menu - Client Component isolato */}
        <MobileMenu navigation={navigation} ctaButton={ctaButton} />
      </div>
    </header>
  );
}
