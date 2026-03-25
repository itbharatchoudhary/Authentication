import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../../Components/Layout/AuthLayout.jsx";
import AuthForm from "../Components/AuthForm.jsx";
import Input from "../../../Components/Ui/Input.jsx";
import Button from "../../../Components/Ui/Button.jsx";
import { useAuth } from "../Hooks/UseAuth.js";
import { ROUTES } from "../../../Utils/Constants.js";
import { isEmail } from "../../../Utils/Validators.js";

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
