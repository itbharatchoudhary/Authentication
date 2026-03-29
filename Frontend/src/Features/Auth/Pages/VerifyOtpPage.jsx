import React, { useState } from "react";
import AuthLayout from "../Components/AuthLayout";
import { useNavigate, useLocation } from "react-router-dom";
import { apiRequest } from "../Services/Auth.Api";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // email passed from register
  const emailFromState = location.state?.email || "";

  const [email, setEmail] = useState(emailFromState);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ VERIFY OTP
  const handleVerify = async () => {
    if (!email || !otp) return alert("All fields required");

    try {
      setLoading(true);

      await apiRequest("/auth/verify-email", "POST", { email, otp });

      alert("OTP Verified Successfully");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 RESEND OTP
  const handleResend = async () => {
    if (!email) return alert("Enter email first");

    try {
      setLoading(true);

      // RESEND OTP
      await apiRequest("/otp/resend", "POST", {
        email,
        purpose: "email-verification",
      });
      alert("OTP Resent 📩");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen px-6">
        <div
          className="w-full max-w-md p-8 rounded-2xl border"
          style={{
            background: "var(--color-card)",
            borderColor: "var(--color-border)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <h2
            className="text-2xl font-semibold mb-6 text-center"
            style={{ color: "var(--color-text)" }}
          >
            Verify OTP
          </h2>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          />

          {/* OTP */}
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-lg tracking-widest text-center text-lg"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          />

          {/* VERIFY */}
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full py-3 rounded-lg mb-3"
            style={{
              background: "var(--color-primary)",
              color: "#fff",
            }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {/* RESEND */}
          <button
            onClick={handleResend}
            disabled={loading}
            className="w-full py-2 rounded-lg text-sm"
            style={{
              background: "transparent",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtpPage;
