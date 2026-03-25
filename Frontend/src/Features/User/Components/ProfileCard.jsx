import React from "react";
import { initials } from "../../../utils/formatters.js";

const Badge = ({ label, color, bg }) => (
  <span
    style={{
      padding: "2px 8px",
      borderRadius: 20,
      background: bg,
      color,
      fontSize: "0.65rem",
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    }}
  >
    {label}
  </span>
);

export default function ProfileCard({ user }) {
  if (!user) return null;
  return (
    <div
      style={{
        background: "var(--ink-2)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        padding: "1.75rem",
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "var(--cyan-dim)",
          border: "1px solid var(--border-cyan)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "1.1rem",
          fontWeight: 500,
          color: "var(--cyan)",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          initials(user.name)
        )}
      </div>
      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.35rem",
            fontWeight: 600,
            color: "var(--paper)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user.name}
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--muted)",
            marginTop: "0.15rem",
            letterSpacing: "0.04em",
          }}
        >
          {user.email}
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            marginTop: "0.6rem",
            flexWrap: "wrap",
          }}
        >
          <Badge label={user.role} color="var(--cyan)" bg="var(--cyan-dim)" />
          {user.authProvider === "google" && (
            <Badge label="Google" color="#7eb8e8" bg="rgba(66,133,244,0.1)" />
          )}
          {user.isVerified && (
            <Badge
              label="Verified"
              color="var(--green)"
              bg="rgba(61,214,140,0.1)"
            />
          )}
        </div>
      </div>
    </div>
  );
}
