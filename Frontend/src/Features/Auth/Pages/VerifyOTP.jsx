import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../Components/Layout/AuthLayout.jsx";
import OTPInput from "../Components/OTPInput.jsx";
import Button from "../../../Components/Ui/Button.jsx";
import { useAuth } from "../Hooks/UseAuth.js";
import { otpTimer } from "../../../Utils/Formatters.js";
import { OTP_RESEND_SECS, ROUTES } from "../../../Utils/Constants.js";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(OTP_RESEND_SECS);
  const [canSend, setCanSend] = useState(false);
  const [toast, setToast] = useState("");
  const {
    verifyOtp,
    verifyResetOtp,
    resendOtp,
    loading,
    error,
    clearError,
    pendingEmail,
    otpPurpose,
  } = useAuth();

  useEffect(() => {
    if (!pendingEmail) navigate(ROUTES.LOGIN);
  }, [pendingEmail]);

  useEffect(() => {
    if (timer <= 0) {
      setCanSend(true);
      return;
    }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const isReset = otpPurpose === "password-reset";

  const submit = () => {
    if (otp.length < 6) return;
    clearError();
    isReset ? verifyResetOtp(otp) : verifyOtp(otp);
  };

  const resend = async () => {
    if (!canSend) return;
    setCanSend(false);
    setTimer(OTP_RESEND_SECS);
    setOtp("");
    setToast("");
    clearError();
    try {
      await resendOtp(pendingEmail, otpPurpose);
      setToast("New OTP sent.");
    } catch {
      setToast("Failed to resend.");
    }
  };

  return (
    <AuthLayout
      title={isReset ? "Check your email." : "Verify email."}
      subtitle={
        <>
          We sent a 6-digit code to{" "}
          <strong style={{ color: "var(--paper)" }}>{pendingEmail}</strong>.
          Enter it below.
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {error && (
          <div
            style={{
              background: "rgba(255,79,79,0.08)",
              border: "1px solid rgba(255,79,79,0.22)",
              borderRadius: "var(--r)",
              padding: "0.7rem 0.9rem",
              fontSize: "0.83rem",
              color: "var(--red)",
            }}
          >
            {error}
          </div>
        )}
        {toast && (
          <div
            style={{
              background: "rgba(61,214,140,0.08)",
              border: "1px solid rgba(61,214,140,0.22)",
              borderRadius: "var(--r)",
              padding: "0.7rem 0.9rem",
              fontSize: "0.83rem",
              color: "var(--green)",
            }}
          >
            {toast}
          </div>
        )}

        <OTPInput value={otp} onChange={setOtp} error={error ? " " : ""} />

        <Button
          fullWidth
          loading={loading}
          onClick={submit}
          disabled={otp.length < 6}
        >
          {isReset ? "Verify Code" : "Verify & Activate"}
        </Button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            fontSize: "0.82rem",
            color: "var(--muted)",
          }}
        >
          <span>Didn't receive it?</span>
          {canSend ? (
            <button
              onClick={resend}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--cyan)",
                background: "none",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.06em",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Resend OTP
            </button>
          ) : (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--muted-2)",
                letterSpacing: "0.06em",
              }}
            >
              Resend in {otpTimer(timer)}
            </span>
          )}
        </div>

        <button
          onClick={() => navigate(-1)}
          style={{
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            color: "var(--muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← GO BACK
        </button>
      </div>
    </AuthLayout>
  );
}
