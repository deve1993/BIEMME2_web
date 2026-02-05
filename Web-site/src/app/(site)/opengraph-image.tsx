import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "BIEMME 2 - Costruzioni Edili dal 1986";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1a1a1a",
        backgroundImage:
          "linear-gradient(135deg, #1a1a1a 0%, #2d1f1f 50%, #4a1a1e 100%)",
      }}
    >
      {/* Logo/Brand area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Company name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          BIEMME 2
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: "#e5e5e5",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          Costruzioni Edili
        </div>

        {/* Divider */}
        <div
          style={{
            width: 120,
            height: 4,
            backgroundColor: "#9E3A34",
            marginBottom: 40,
          }}
        />

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 300,
            color: "#b0b0b0",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Da oltre 40 anni al servizio dell'edilizia in Lombardia
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            marginTop: 48,
            padding: "12px 32px",
            backgroundColor: "rgba(158, 58, 52, 0.3)",
            borderRadius: 8,
            border: "1px solid rgba(158, 58, 52, 0.5)",
          }}
        >
          <span style={{ fontSize: 20, color: "#ffffff", fontWeight: 500 }}>
            DAL 1986 • MORENGO (BG)
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
