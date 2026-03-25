import React, { useState } from "react";
import Navbar from "../../../components/layout/Navbar.jsx";
import Footer from "../../../components/layout/Footer.jsx";
import HomeHero from "../components/HomeHero.jsx";

const STORIES = [
  {
    tag: "Feature",
    title: "The Night the Draft Never Came",
    excerpt: "A story of potential, heartbreak, and what might have been.",
    author: "Priya Mehta",
    time: "8 min",
    new: true,
  },
  {
    tag: "Analysis",
    title: "How One Pass Changed Everything",
    excerpt: "Dissecting the play that shifted the momentum of a season.",
    author: "Rohan Das",
    time: "5 min",
    new: true,
  },
  {
    tag: "Oral History",
    title: "The Locker Room at Half Time",
    excerpt: "What happens when the cameras are off and the score is wrong.",
    author: "Anjali Sinha",
    time: "12 min",
    new: false,
  },
  {
    tag: "Memoir",
    title: "Letters from the Bench",
    excerpt: "A veteran reflects on 14 seasons of watching from afar.",
    author: "Vikram Nair",
    time: "10 min",
    new: false,
  },
  {
    tag: "Investigation",
    title: "The Referee's Untold Story",
    excerpt: "An unprecedented interview series reveals the center view.",
    author: "Kavya Iyer",
    time: "6 min",
    new: true,
  },
  {
    tag: "Profile",
    title: "She Built the Stadium Alone",
    excerpt: "The engineer whose name appears on no plaque.",
    author: "Ritu Sharma",
    time: "9 min",
    new: false,
  },
];

const TAG_COLORS = {
  Feature: "var(--cyan)",
  Analysis: "#7eb8e8",
  "Oral History": "#c57ae0",
  Memoir: "var(--green)",
  Investigation: "var(--amber)",
  Profile: "#e07070",
};

export default function Home() {
  const [active, setActive] = useState("All");
  const tabs = ["All", "New", "Feature", "Analysis"];
  const shown =
    active === "All"
      ? STORIES
      : active === "New"
        ? STORIES.filter((s) => s.new)
        : STORIES.filter((s) => s.tag === active);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--ink)",
      }}
    >
      <Navbar />
      <main style={{ flex: 1 }}>
        <HomeHero />

        <section
          style={{ padding: "3.5rem 2.5rem", maxWidth: 1200, margin: "0 auto" }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: "0",
              marginBottom: "2.5rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.65rem 1.2rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: active === t ? "var(--cyan)" : "var(--muted)",
                  borderBottom:
                    active === t
                      ? "2px solid var(--cyan)"
                      : "2px solid transparent",
                  marginBottom: "-1px",
                  transition: "all var(--t)",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {shown.map((s, i) => (
              <article
                key={i}
                className="fu"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  background: "var(--ink-2)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  padding: "1.5rem",
                  cursor: "pointer",
                  transition: "all 0.22s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,229,204,0.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0,0,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {s.new && (
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      background: "var(--cyan-dim)",
                      color: "var(--cyan)",
                      padding: "2px 6px",
                      borderRadius: 3,
                      border: "1px solid var(--border-cyan)",
                    }}
                  >
                    New
                  </div>
                )}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: TAG_COLORS[s.tag] || "var(--cyan)",
                    display: "block",
                    marginBottom: "0.6rem",
                  }}
                >
                  {s.tag}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    lineHeight: 1.25,
                    color: "var(--paper)",
                    marginBottom: "0.6rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    lineHeight: 1.65,
                    marginBottom: "1.25rem",
                  }}
                >
                  {s.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "0.9rem",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: "var(--muted-2)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {s.author}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: "var(--muted-2)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {s.time} read
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
