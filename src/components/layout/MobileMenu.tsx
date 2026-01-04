"use client";

import { useState } from "react";
import Link from "next/link";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

interface NavItem {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
}

interface MobileMenuProps {
  navigation: NavItem[];
  ctaButton: { text: string; href: string };
}

/**
 * MobileMenu - Client Component isolato per gestire solo il menu mobile
 * Questo isola lo stato useState dall'Header principale, permettendo
 * al resto dell'header di essere un Server Component.
 */
export function MobileMenu({ navigation, ctaButton }: MobileMenuProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="flex h-12 w-12 items-center justify-center rounded border border-border text-text-primary md:hidden"
        aria-label="Menu"
      >
        <DynamicIcon name={mobileMenuOpen ? "x" : "menu"} size={24} />
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-20 border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={
                  item.dropdown
                    ? (item.dropdown[0]?.href ?? item.href)
                    : item.href
                }
                onClick={() => setMobileMenuOpen(false)}
                className="rounded px-4 py-3 text-sm font-light uppercase tracking-wide text-text-secondary hover:bg-surface hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ctaButton.href}
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gradient mt-2 rounded px-4 py-3 text-center text-sm font-light uppercase tracking-wide"
            >
              {ctaButton.text}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
