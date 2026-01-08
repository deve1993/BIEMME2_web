import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { IconSprite } from "@/components/ui/IconSprite";
import "./globals.css";

/*
  Root Layout - Next.js 15.5.9 requires html/body tags in root layout.
  Route groups (payload) and (site) extend this with their specific content.

  Font: Space Grotesk self-hosted per GDPR compliance (no Google Fonts requests)
*/

const spaceGrotesk = localFont({
  src: "../../public/fonts/SpaceGrotesk-Variable.woff2",
  variable: "--font-space-grotesk",
  display: "swap",
  weight: "300 700",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4a1a1e",
};

export const metadata: Metadata = {
  title: "BIEMME 2",
  description: "Costruzioni Edili",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        {/* SVG Sprite per icone - definito una volta, usato ovunque */}
        <IconSprite />
        {children}
      </body>
    </html>
  );
}
