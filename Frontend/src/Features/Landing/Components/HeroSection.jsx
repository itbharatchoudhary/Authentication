import React, { useEffect, useRef } from "react";

export default function HeroSection() {
  const titleRef = useRef(null);

  // Subtle text-scramble effect on mount
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const target = "THEGAMEUNTOLD";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let frame = 0;
    const interval = setInterval(() => {
      el.textContent = target
        .split("")
        .map((c, i) =>
          i < frame ? c : chars[Math.floor(Math.random() * chars.length)],
        )
        .join("");
      frame++;
      if (frame > target.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        padding: "7rem 2.5rem 5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "50vh",
          background:
            "radial-gradient(ellipse, rgba(0,229,204,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Label */}
        <p
          className="fu"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            marginBottom: "1.5rem",
          }}
        >
          Vol. 01 — Stories from the field
        </p>

        {/* Title with scramble */}
        <h1
          className="fu d1"
          ref={titleRef}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            fontWeight: 500,
            color: "var(--paper)",
            letterSpacing: "0.08em",
            lineHeight: 1,
            marginBottom: "1.5rem",
          }}
        >
          THEGAMEUNTOLD
        </h1>

        {/* Sub headline */}
        <p
          className="fu d2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--paper-dim)",
            lineHeight: 1.3,
            maxWidth: 640,
            marginBottom: "3rem",
          }}
        >
          Every match has a story
          <br />
          no scoreboard can tell.
        </p>

        {/* Stats strip */}
        <div
          className="fu d3"
          style={{
            display: "flex",
            gap: "3rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid var(--border)",
            flexWrap: "wrap",
          }}
        >
          {[
            ["10K+", "Stories Published"],
            ["52K+", "Monthly Readers"],
            ["240+", "Contributors"],
            ["4", "Years Running"],
          ].map(([v, l]) => (
            <div key={l}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.6rem",
                  fontWeight: 500,
                  color: "var(--cyan)",
                  letterSpacing: "-0.01em",
                }}
              >
                {v}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginTop: "0.2rem",
                }}
              >
                {l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
