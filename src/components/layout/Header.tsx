"use client";

/**
 * Header - Client Component per gestire navigation active state
 */

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Logo } from "./Logo";
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

function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative ${className ?? ""} ${isActive ? "text-primary-dark" : ""}`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary-dark" />
      )}
    </Link>
  );
}

export function Header({ navItems, cta }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) =>
            item.dropdown ? (
              <div key={item.href} className="group relative">
                <button className="flex items-center gap-1 text-sm font-light uppercase tracking-wide text-text-secondary transition-colors hover:text-primary-dark">
                  {item.label}
                  <DynamicIcon
                    name="chevron_down"
                    size={16}
                    className="transition-transform group-hover:rotate-180"
                  />
                </button>

                <div className="invisible absolute left-0 top-full min-w-[200px] pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-lg border border-border bg-background py-2 shadow-lg">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-2.5 text-sm font-light text-text-secondary transition-colors hover:bg-surface hover:text-primary-dark"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={item.href}
                href={item.href}
                className="text-sm font-light uppercase tracking-wide text-text-secondary transition-colors hover:text-primary-dark"
              >
                {item.label}
              </NavLink>
            ),
          )}

          <Link
            href={ctaButton.href}
            className="btn-gradient rounded px-5 py-2.5 text-sm font-light uppercase tracking-wide"
          >
            {ctaButton.text}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-12 w-12 items-center justify-center rounded border border-border text-text-primary md:hidden"
          aria-label="Menu"
        >
          <DynamicIcon name={mobileMenuOpen ? "x" : "menu"} size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-20 z-50 border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {navigation.map((item) => {
              const href = item.dropdown
                ? (item.dropdown[0]?.href ?? item.href)
                : item.href;
              return (
                <NavLink
                  key={item.href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded px-4 py-3 text-sm font-light uppercase tracking-wide text-text-secondary transition-colors hover:bg-surface hover:text-primary-dark"
                >
                  {item.label}
                </NavLink>
              );
            })}
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
    </header>
  );
}
