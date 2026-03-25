import React, { useRef, useState, useEffect } from "react";
import { OTP_LENGTH } from "../../../utils/constants.js";

export default function OTPInput({
  value = "",
  onChange,
  error,
  autoFocus = true,
}) {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const refs = useRef([]);

  useEffect(() => {
    const arr = value.split("").slice(0, OTP_LENGTH);
    while (arr.length < OTP_LENGTH) arr.push("");
    setDigits(arr);
  }, [value]);

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, []);

  const emit = (arr) => onChange(arr.join(""));

  const onKey = (i, e) => {
    if (e.key === "Backspace") {
      if (digits[i]) {
        const n = [...digits];
        n[i] = "";
        setDigits(n);
        emit(n);
      } else if (i > 0) refs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < OTP_LENGTH - 1)
      refs.current[i + 1]?.focus();
  };

  const onInput = (i, e) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    const n = [...digits];
    n[i] = v;
    setDigits(n);
    emit(n);
    if (v && i < OTP_LENGTH - 1) refs.current[i + 1]?.focus();
  };

  const onPaste = (e) => {
    e.preventDefault();
    const p = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    const n = Array(OTP_LENGTH).fill("");
    p.split("").forEach((c, i) => (n[i] = c));
    setDigits(n);
    emit(n);
    refs.current[Math.min(p.length, OTP_LENGTH - 1)]?.focus();
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => onInput(i, e)}
            onKeyDown={(e) => onKey(i, e)}
            onPaste={onPaste}
            style={{
              width: 46,
              height: 54,
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "1.3rem",
              fontWeight: 500,
              background: d ? "rgba(0,229,204,0.06)" : "var(--ink-2)",
              border: `1px solid ${error ? "var(--red)" : d ? "var(--cyan)" : "var(--border)"}`,
              borderRadius: "var(--r)",
              color: d ? "var(--cyan)" : "var(--paper)",
              outline: "none",
              transition: "all var(--t)",
              caretColor: "var(--cyan)",
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = error
                ? "none"
                : "0 0 0 3px var(--cyan-dim)";
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = "none";
            }}
          />
        ))}
      </div>
      {error && (
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--red)",
            marginTop: "0.5rem",
            fontFamily: "var(--font-mono)",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
