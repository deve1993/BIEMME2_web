/*
  Root Layout - Minimo per permettere a Payload e Site di avere i propri layout.
  Non includiamo <html> o <body> qui perché:
  - Payload ha il suo layout in (payload)/layout.tsx
  - Il sito ha il suo layout in (site)/layout.tsx
*/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
