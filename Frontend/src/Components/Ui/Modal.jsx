import React, { useEffect } from "react";
import Button from "./Button.jsx";

export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--ink-2)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-lg)",
          padding: "2rem",
          width: "100%",
          maxWidth: 440,
          animation: "fadeUp 0.22s ease",
        }}
      >
        {title && (
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "var(--paper)",
              marginBottom: "0.75rem",
            }}
          >
            {title}
          </h3>
        )}
        <div
          style={{
            color: "var(--muted)",
            fontSize: "0.875rem",
            lineHeight: 1.65,
          }}
        >
          {children}
        </div>
        {footer && (
          <div
            style={{
              display: "flex",
              gap: "0.6rem",
              marginTop: "1.5rem",
              justifyContent: "flex-end",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
