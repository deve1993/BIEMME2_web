"use client";

import { useEffect } from "react";
import Link from "next/link";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error per debugging (in produzione va a servizi esterni)
    console.error("Site error:", error);
  }, [error]);

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

      {/* Error Content */}
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
            <DynamicIcon name="error" size={48} className="text-red-500" />
          </div>

          {/* Text */}
          <h1 className="mb-4 text-3xl font-light text-text-primary md:text-4xl">
            Si è verificato un errore
          </h1>
          <p className="mx-auto mb-8 max-w-md text-lg font-light text-text-secondary">
            Ci scusiamo per l&apos;inconveniente. Qualcosa non ha funzionato
            correttamente. Prova a ricaricare la pagina.
          </p>

          {/* Actions */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button onClick={() => reset()} variant="solid" size="lg">
              <DynamicIcon name="refresh" size={20} className="mr-2" />
              Riprova
            </Button>
            <Button href="/" variant="outline" size="lg">
              <DynamicIcon name="home" size={20} className="mr-2" />
              Torna alla Home
            </Button>
          </div>

          {/* Error ID per supporto */}
          {error.digest && (
            <p className="mt-8 text-xs text-text-muted">
              Codice errore: {error.digest}
            </p>
          )}
        </div>
      </main>

      {/* Footer minimale */}
      <footer className="border-t border-border bg-white py-6">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-text-muted">
            Hai bisogno di assistenza?{" "}
            <a
              href="tel:+390363958310"
              className="text-primary hover:underline"
            >
              Chiamaci al +39 0363 958310
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
