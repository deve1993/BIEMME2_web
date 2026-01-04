import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 24,
        background: "#4a1a1e",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Testa del martello */}
        <rect
          x="12"
          y="2"
          width="10"
          height="5"
          rx="1"
          fill="#c9a66b"
          stroke="#a8864d"
          strokeWidth="0.5"
        />
        {/* Manico */}
        <rect
          x="8"
          y="6"
          width="3"
          height="16"
          rx="1"
          fill="#8B5A2B"
          stroke="#6B4423"
          strokeWidth="0.5"
        />
        {/* Dettaglio testa */}
        <rect x="13" y="3" width="8" height="1" fill="#d4b896" opacity="0.6" />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
