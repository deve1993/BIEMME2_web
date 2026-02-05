import Link from "next/link";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagina non trovata | BIEMME 2",
  description: "La pagina che stai cercando non esiste o è stata spostata.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header minimale */}
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <Link href="/" className="text-xl font-medium text-primary">
            BIEMME 2
          </Link>
        </div>
      </header>

      {/* 404 Content */}
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="text-center">
          {/* 404 Big Number */}
          <div className="relative mb-8">
            <span className="text-[120px] font-light leading-none text-primary/10 md:text-[180px]">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-muted">
                <DynamicIcon
                  name="search_off"
                  size={40}
                  className="text-primary"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <h1 className="mb-4 text-3xl font-light text-text-primary md:text-4xl">
            Pagina non trovata
          </h1>
          <p className="mx-auto mb-8 max-w-md text-lg font-light text-text-secondary">
            La pagina che stai cercando non esiste, è stata rimossa o
            l&apos;indirizzo potrebbe essere errato.
          </p>

          {/* Actions */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/" variant="solid" size="lg">
              <DynamicIcon name="home" size={20} className="mr-2" />
              Torna alla Home
            </Button>
            <Button href="/contatti" variant="outline" size="lg">
              <DynamicIcon name="mail" size={20} className="mr-2" />
              Contattaci
            </Button>
          </div>

          {/* Suggerimenti */}
          <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-text-muted">
              Pagine utili
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/servizi"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-text-primary transition-colors hover:bg-primary-muted hover:text-primary"
              >
                <DynamicIcon name="construction" size={16} />
                Servizi
              </Link>
              <Link
                href="/azienda"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-text-primary transition-colors hover:bg-primary-muted hover:text-primary"
              >
                <DynamicIcon name="business" size={16} />
                Chi Siamo
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer minimale */}
      <footer className="border-t border-border bg-white py-6">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} BIEMME 2 S.r.l. — Costruzioni Edili dal
            1986
          </p>
        </div>
      </footer>
    </div>
  );
}
