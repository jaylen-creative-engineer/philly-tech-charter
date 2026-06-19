import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#faf8f4",
        }}
      >
        <div style={{ display: "flex", height: 4 }}>
          <div style={{ flex: 2, background: "#d42b32" }} />
          <div style={{ flex: 1, background: "#ffffff" }} />
          <div style={{ flex: 2, background: "#1a3580" }} />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 2,
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "#122660",
              fontFamily: "serif",
              fontStyle: "italic",
              lineHeight: 1,
            }}
          >
            P
          </div>
          <div
            style={{
              width: 22,
              height: 2,
              background: "#d42b32",
              marginTop: 2,
            }}
          />
          <div
            style={{
              fontSize: 5,
              color: "#1a3580",
              fontWeight: 800,
              letterSpacing: "0.14em",
              marginTop: 2,
            }}
          >
            PTC
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
