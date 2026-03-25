import React from "react";
import Button from "../../../components/ui/Button.jsx";

export default function ErrorMessage({
  code,
  title,
  message,
  onAction,
  actionLabel = "Go Back",
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--ink)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        gap: "1.25rem",
      }}
    >
      {/* Giant code */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(5rem, 15vw, 10rem)",
          fontWeight: 500,
          color: "var(--ink-4)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          userSelect: "none",
        }}
      >
        {code}
      </p>
      <div style={{ maxWidth: 420 }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "var(--paper)",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.875rem",
            lineHeight: 1.65,
          }}
        >
          {message}
        </p>
      </div>
      {onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}
