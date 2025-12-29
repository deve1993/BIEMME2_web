import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4a1a1e",
};

export const metadata: Metadata = {
  title: "BIEMME 2 | Costruzioni Edili",
  description:
    "Da oltre 30 anni ci occupiamo di costruzioni. Edilizia residenziale, industriale, restauro e ristrutturazioni a Morengo (BG).",
  keywords: [
    "costruzioni",
    "edilizia",
    "ristrutturazioni",
    "Morengo",
    "Bergamo",
    "BIEMME 2",
  ],
  authors: [{ name: "BIEMME 2 S.r.l." }],
  openGraph: {
    title: "BIEMME 2 | Costruzioni Edili",
    description:
      "Da oltre 30 anni ci occupiamo di costruzioni. Edilizia residenziale, industriale, restauro e ristrutturazioni.",
    type: "website",
    locale: "it_IT",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        {/* Preconnect per risorse esterne critiche */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Material Symbols - Caricamento standard per evitare FOUC */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <div
          className={`site-wrapper ${spaceGrotesk.variable} font-body antialiased`}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
