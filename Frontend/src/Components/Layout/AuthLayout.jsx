import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Utils/Constants";

const QUOTES = [
  {
    text: "Every match has a story no scoreboard can tell.",
    attr: "TGU Manifesto",
  },
  { text: "The game is won in the spaces between the plays.", attr: "Unknown" },
  {
    text: "Statistics record what happened. We tell why.",
    attr: "TGU Editors",
  },
];
const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "var(--ink)",
        overflow: "hidden",
      }}
    >
      {/* ── Left panel (branding) ── */}
      <aside
        style={{
          flex: "0 0 42%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "2.5rem",
          borderRight: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
        className="auth-aside"
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "70%",
            height: "60%",
            background:
              "radial-gradient(ellipse, var(--cyan-glow) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <Link
          to={ROUTES.LANDING}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            position: "relative",
          }}
        >
          THEGAMEUNTOLD
        </Link>

        <div style={{ position: "relative", maxWidth: 360 }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--cyan)",
              marginBottom: "1rem",
              opacity: 0.7,
            }}
          >
            — Featured
          </p>
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 400,
              lineHeight: 1.2,
              color: "var(--paper)",
              fontStyle: "italic",
            }}
          >
            "{q.text}"
          </blockquote>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              color: "var(--muted)",
              marginTop: "1rem",
            }}
          >
            {q.attr}
          </p>
        </div>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            color: "var(--muted-2)",
            position: "relative",
          }}
        >
          STORIES THAT DEFINE THE GAME
        </p>
      </aside>

      {/* ── Right panel (form) ── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            animation: "fadeUp 0.4s ease both",
          }}
        >
          {title && (
            <div style={{ marginBottom: "2.25rem" }}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "var(--paper)",
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  style={{
                    marginTop: "0.5rem",
                    color: "var(--muted)",
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </main>

      <style>{`@media (max-width: 768px) { .auth-aside { display: none !important; } }`}</style>
    </div>
  );
}
