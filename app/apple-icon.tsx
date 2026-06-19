import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#faf8f4",
          padding: "16px 20px 20px",
        }}
      >
        <div style={{ display: "flex", height: 8, marginBottom: 18 }}>
          <div style={{ flex: 2, background: "#d42b32" }} />
          <div style={{ flex: 1, background: "#ffffff" }} />
          <div style={{ flex: 2, background: "#1a3580" }} />
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#122660",
            fontFamily: "serif",
            fontStyle: "italic",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          Philadelphia
        </div>
        <div
          style={{
            width: "100%",
            height: 2,
            background: "#d42b32",
            marginTop: 8,
            marginBottom: 10,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.18em",
          }}
        >
          <span style={{ color: "#d42b32" }}>PHILLY TECH</span>
          <span style={{ color: "#1a3580" }}>CHARTER</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 12,
            fontSize: 9,
            color: "#6b6358",
            letterSpacing: "0.12em",
          }}
        >
          <span>1776</span>
          <div style={{ flex: 1, height: 1, background: "#6b6358", opacity: 0.35 }} />
          <span>2026</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
