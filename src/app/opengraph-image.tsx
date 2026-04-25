import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Rohan Raut | Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: "140px",
            height: "140px",
            backgroundColor: "#ffffff",
            color: "#000000",
            borderRadius: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "72px",
            fontWeight: "bold",
            marginBottom: "48px",
          }}
        >
          R
        </div>
        <div
          style={{
            fontSize: "80px",
            fontWeight: "bold",
            color: "#ffffff",
            letterSpacing: "-3px",
            marginBottom: "16px",
          }}
        >
          ROHAN RAUT
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#a1a1aa",
            letterSpacing: "4px",
            textTransform: "uppercase",
            fontWeight: "500",
          }}
        >
          Extreme Velocity Development
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
