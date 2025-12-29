"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import {
  fallbackNavItems,
  fallbackHeaderCta,
  type NavItem,
} from "@/lib/fallback-data";

export interface HeaderProps {
  navItems?: NavItem[];
  cta?: { text: string; href: string };
}

export function Header({ navItems, cta }: HeaderProps = {}) {
  // Use CMS data if available, otherwise use fallback
  const navigation = navItems ?? fallbackNavItems;
  const ctaButton = cta ?? fallbackHeaderCta;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(
    null,
  );
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleMouseEnter = (label: string) => {
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md transition-theme">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) =>
            item.dropdown ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`
                    flex items-center gap-1 text-sm font-light uppercase tracking-wide transition-colors
                    ${
                      isActive(item.href)
                        ? "text-primary font-medium"
                        : "text-text-secondary hover:text-primary"
                    }
                  `}
                >
                  {item.label}
                  <span
                    className={`material-symbols-outlined text-sm transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`
                    absolute left-0 top-full min-w-[200px] pt-2 transition-all duration-200
                    ${openDropdown === item.label ? "visible opacity-100" : "invisible opacity-0"}
                  `}
                >
                  <div className="rounded-lg border border-border bg-background py-2 shadow-lg">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`
                          block px-4 py-2.5 text-sm font-light transition-colors
                          ${
                            pathname === subItem.href
                              ? "bg-primary-muted text-primary"
                              : "text-text-secondary hover:bg-surface hover:text-primary"
                          }
                        `}
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
                className={`
                  text-sm font-light uppercase tracking-wide transition-colors
                  ${
                    isActive(item.href)
                      ? "text-primary font-medium"
                      : "text-text-secondary hover:text-primary"
                  }
                `}
              >
                {item.label}
              </Link>
            ),
          )}

          {/* CTA Button */}
          <Link
            href={ctaButton.href}
            className="btn-gradient rounded px-5 py-2.5 text-sm font-light uppercase tracking-wide"
          >
            {ctaButton.text}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-12 w-12 items-center justify-center rounded border border-border text-text-primary transition-colors hover:border-border-hover"
            aria-label="Menu"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "24px" }}
            >
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          overflow-hidden border-t border-border bg-background transition-all duration-300 md:hidden
          ${mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navigation.map((item) =>
            item.dropdown ? (
              <div key={item.href}>
                <button
                  onClick={() => toggleMobileSubmenu(item.label)}
                  className={`
                    flex w-full items-center justify-between rounded px-4 py-3 text-sm font-light uppercase tracking-wide transition-colors
                    ${
                      isActive(item.href)
                        ? "bg-primary-muted text-primary"
                        : "text-text-secondary hover:bg-surface hover:text-primary"
                    }
                  `}
                >
                  {item.label}
                  <span
                    className={`material-symbols-outlined text-sm transition-transform ${mobileSubmenuOpen === item.label ? "rotate-180" : ""}`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Mobile Submenu */}
                <div
                  className={`
                    overflow-hidden transition-all duration-200
                    ${mobileSubmenuOpen === item.label ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <div className="ml-4 flex flex-col gap-1 border-l-2 border-primary/30 py-2 pl-4">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileSubmenuOpen(null);
                        }}
                        className={`
                          rounded px-3 py-2 text-sm font-light transition-colors
                          ${
                            pathname === subItem.href
                              ? "text-primary"
                              : "text-text-secondary hover:text-primary"
                          }
                        `}
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
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  rounded px-4 py-3 text-sm font-light uppercase tracking-wide transition-colors
                  ${
                    isActive(item.href)
                      ? "bg-primary-muted text-primary"
                      : "text-text-secondary hover:bg-surface hover:text-primary"
                  }
                `}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            href={ctaButton.href}
            onClick={() => setMobileMenuOpen(false)}
            className="btn-gradient mt-2 rounded px-4 py-3 text-center text-sm font-light uppercase tracking-wide"
          >
            {ctaButton.text}
          </Link>
        </nav>
      </div>
    </header>
  );
}
