import { ImageResponse } from "next/og";

export const alt = "Programmers directory: Next.js frontend for an Express + MongoDB API";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0f766e",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 34, color: "#99f6e4" }}>Next.js + Express + MongoDB</div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 12 }}>Programmers directory</div>
        <div style={{ fontSize: 34, color: "#ccfbf1", marginTop: 24 }}>Search, filter by stack and add programmers.</div>
      </div>
    ),
    size,
  );
}
