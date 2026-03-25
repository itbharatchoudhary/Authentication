import React from "react";

export default function Loader({ fullPage = false, size = 28 }) {
  const ring = (
    <div style={{ position: "relative", width: size, height: size }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "1.5px solid var(--border)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "1.5px solid transparent",
          borderTopColor: "var(--cyan)",
          borderRadius: "50%",
          animation: "spin 0.75s linear infinite",
        }}
      />
    </div>
  );
  if (fullPage)
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--ink)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
        }}
      >
        {ring}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            color: "var(--muted)",
            textTransform: "uppercase",
            animation: "pulse 2s ease infinite",
          }}
        >
          THEGAMEUNTOLD
        </p>
      </div>
    );
  return ring;
}
