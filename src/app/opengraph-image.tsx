import { ImageResponse } from "next/og";

export const alt = "ADJ Educational Consultants — exam success in Lagos, Nigeria";
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
          background: "#0B237F",
          color: "white",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#D5A11E", textTransform: "uppercase" }}>
          ADJ EDUCATIONAL CONSULTANTS
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, marginTop: 20, lineHeight: 1.1 }}>
          Exam Success in Lagos, Nigeria
        </div>
        <div style={{ fontSize: 30, color: "#DCE4FF", marginTop: 18 }}>
          JAMB · WAEC · NECO · JUPEB · IELTS — + admission processing
        </div>
      </div>
    ),
    { width: size.width, height: size.height },
  );
}
