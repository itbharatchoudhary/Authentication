import React from "react";
import { useAuthStore } from "../../../App/Store.js";
import Button from "../../..//Components/Ui/Button.jsx";

export default function HomeHero() {
  const { user } = useAuthStore();
  const first = user?.name?.split(" ")[0] || "Reader";

  return (
    <div
      style={{
        padding: "4rem 2.5rem 3rem",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 50% 70% at 50% 100%, rgba(0,229,204,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <p
          className="fu"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "var(--cyan)",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          Welcome back
        </p>
        <h1
          className="fu d1"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 700,
            color: "var(--paper)",
            lineHeight: 1.15,
          }}
        >
          Good to see you,
          <br />
          <em style={{ color: "var(--cyan)", fontStyle: "normal" }}>
            {first}.
          </em>
        </h1>
        <p
          className="fu d2"
          style={{
            color: "var(--muted)",
            fontSize: "0.95rem",
            marginTop: "0.75rem",
            maxWidth: 480,
          }}
        >
          Here's what's new in the world of untold stories.
        </p>
      </div>
    </div>
  );
}
