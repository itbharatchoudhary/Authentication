import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../../Components/Layout/AuthLayout.jsx";
import AuthForm from "../Components/AuthForm.jsx";
import SocialLogin from "../Components/SocialLogin.jsx";
import Input from "../../../Components/Ui/Input.jsx";
import Button from "../../../Components/Ui/Button.jsx";
import { useAuth } from "../Hooks/UseAuth.js";
import { ROUTES } from "../../../Utils/Constants.js";
import { isEmail } from "../../..//Utils/Validators.js";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState({});
  const { login, loading, error, clearError } = useAuth();

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErr((x) => ({ ...x, [k]: "" }));
    clearError();
  };

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Required";
    else if (!isEmail(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Required";
    setErr(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (validate()) login(form);
  };

  return (
    <AuthLayout title="Sign in." subtitle="Welcome back to THEGAMEUNTOLD.">
      <AuthForm
        error={error}
        footer={
          <>
            No account?{" "}
            <Link to={ROUTES.REGISTER} style={{ color: "var(--cyan)" }}>
              Register
            </Link>
          </>
        }
      >
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={set("email")}
          error={err.email}
          placeholder="you@example.com"
          autoComplete="email"
          autoFocus
        />
        <div>
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={set("password")}
            error={err.password}
            placeholder="Your password"
            autoComplete="current-password"
          />
          <div style={{ textAlign: "right", marginTop: "0.4rem" }}>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--muted)",
                letterSpacing: "0.08em",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <Button
          fullWidth
          loading={loading}
          onClick={submit}
          style={{ marginTop: "0.25rem" }}
        >
          Sign In
        </Button>
        <SocialLogin onGoogle={() => {}} disabled={loading} />
      </AuthForm>
    </AuthLayout>
  );
}
