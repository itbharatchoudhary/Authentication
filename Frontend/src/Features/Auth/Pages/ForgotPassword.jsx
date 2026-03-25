import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout.jsx";
import AuthForm from "../components/AuthForm.jsx";
import Input from "../../../components/ui/Input.jsx";
import Button from "../../../components/ui/Button.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { ROUTES } from "../../../utils/constants.js";
import { isEmail } from "../../../utils/validators.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const { forgotPassword, loading, error, clearError } = useAuth();

  const submit = () => {
    clearError();
    if (!email) {
      setEmailErr("Required");
      return;
    }
    if (!isEmail(email)) {
      setEmailErr("Invalid email");
      return;
    }
    setEmailErr("");
    forgotPassword(email);
  };

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset code."
    >
      <AuthForm
        error={error}
        footer={
          <Link to={ROUTES.LOGIN} style={{ color: "var(--cyan)" }}>
            ← Back to Sign In
          </Link>
        }
      >
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailErr("");
            clearError();
          }}
          error={emailErr}
          placeholder="you@example.com"
          autoFocus
          autoComplete="email"
        />
        <Button fullWidth loading={loading} onClick={submit}>
          Send Reset Code
        </Button>
      </AuthForm>
    </AuthLayout>
  );
}
