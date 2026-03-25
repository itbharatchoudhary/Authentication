import React, { useState } from "react";

export default function Input({
  label,
  error,
  hint,
  type = "text",
  prefix,
  suffix,
  style = {},
  wrapStyle = {},
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const isPw = type === "password";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.35rem",
        ...wrapStyle,
      }}
    >
      {label && (
        <label
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: error
              ? "var(--red)"
              : focused
                ? "var(--cyan)"
                : "var(--muted)",
            transition: "color var(--t)",
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {prefix && (
          <span
            style={{
              position: "absolute",
              left: "0.8rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--muted)",
              display: "flex",
              pointerEvents: "none",
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type={isPw ? (showPw ? "text" : "password") : type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: focused ? "var(--ink-3)" : "var(--ink-2)",
            border: `1px solid ${error ? "var(--red)" : focused ? "var(--cyan)" : "var(--border)"}`,
            borderRadius: "var(--r)",
            padding: `0.7rem ${isPw || suffix ? "3rem" : "0.85rem"} 0.7rem ${prefix ? "2.4rem" : "0.85rem"}`,
            color: "var(--paper)",
            fontSize: "0.9rem",
            outline: "none",
            transition: "all var(--t)",
            boxShadow: focused && !error ? "0 0 0 3px var(--cyan-dim)" : "none",
            caretColor: "var(--cyan)",
            ...style,
          }}
          {...props}
        />
        {isPw && (
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            style={{
              position: "absolute",
              right: "0.85rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {showPw ? "hide" : "show"}
          </button>
        )}
        {suffix && !isPw && (
          <span
            style={{
              position: "absolute",
              right: "0.85rem",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {suffix}
          </span>
        )}
      </div>
      {(error || hint) && (
        <p
          style={{
            fontSize: "0.75rem",
            color: error ? "var(--red)" : "var(--muted)",
            fontFamily: error ? "var(--font-body)" : "var(--font-mono)",
          }}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
}
