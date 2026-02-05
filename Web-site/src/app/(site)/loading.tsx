export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header Skeleton */}
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo skeleton */}
          <div className="h-8 w-32 animate-pulse rounded bg-neutral-200" />

          {/* Nav skeleton - hidden on mobile */}
          <div className="hidden items-center gap-6 md:flex">
            <div className="h-4 w-16 animate-pulse rounded bg-neutral-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-neutral-200" />
            <div className="h-4 w-20 animate-pulse rounded bg-neutral-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-neutral-200" />
          </div>

          {/* CTA skeleton */}
          <div className="h-10 w-28 animate-pulse rounded bg-neutral-200" />
        </div>
      </header>

      {/* Hero Skeleton */}
      <section className="relative bg-gradient-to-br from-primary/80 via-primary-dark/80 to-primary/80 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          {/* Badge skeleton */}
          <div className="mx-auto mb-4 h-4 w-32 animate-pulse rounded bg-white/20" />

          {/* Title skeleton */}
          <div className="mx-auto mb-4 h-10 w-3/4 max-w-lg animate-pulse rounded bg-white/20 md:h-14" />

          {/* Description skeleton */}
          <div className="mx-auto h-6 w-2/3 max-w-md animate-pulse rounded bg-white/20" />
        </div>
      </section>

      {/* Main Content Skeleton */}
      <main className="flex-grow bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section title skeleton */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-2 h-3 w-24 animate-pulse rounded bg-neutral-200" />
            <div className="mx-auto mb-4 h-8 w-64 animate-pulse rounded bg-neutral-200" />
            <div className="mx-auto h-4 w-96 max-w-full animate-pulse rounded bg-neutral-200" />
          </div>

          {/* Cards grid skeleton */}
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-100 bg-white p-6"
              >
                {/* Icon skeleton */}
                <div className="mb-6 h-14 w-14 animate-pulse rounded bg-neutral-200" />

                {/* Title skeleton */}
                <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-neutral-200" />

                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-neutral-100" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-neutral-100" />
                  <div className="h-3 w-4/6 animate-pulse rounded bg-neutral-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t border-border bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Logo skeleton */}
            <div className="h-8 w-32 animate-pulse rounded bg-neutral-200" />

            {/* Links skeleton */}
            <div className="flex gap-4">
              <div className="h-4 w-20 animate-pulse rounded bg-neutral-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-neutral-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-neutral-200" />
            </div>
          </div>

          {/* Copyright skeleton */}
          <div className="mt-8 border-t border-border pt-6 text-center">
            <div className="mx-auto h-3 w-48 animate-pulse rounded bg-neutral-200" />
          </div>
        </div>
      </footer>
    </div>
  );
}
