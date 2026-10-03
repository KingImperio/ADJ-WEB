import { ImageResponse } from "next/og";

export const alt = "ADJ Educational Consultants — Ikorodu's home for exam success";
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
          background: "#1a365d",
          color: "white",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#98f6c5", textTransform: "uppercase" }}>
          ADJ EDUCATIONAL CONSULTANTS
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, marginTop: 20, lineHeight: 1.1 }}>
          Ikorodu&apos;s Home for Exam Success
        </div>
        <div style={{ fontSize: 30, color: "#adc7f7", marginTop: 18 }}>
          JAMB · WAEC · NECO · JUPEB · IELTS — + admission processing
        </div>
      </div>
    ),
    { width: size.width, height: size.height },
  );
}
