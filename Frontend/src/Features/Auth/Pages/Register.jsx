import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../../Components/Layout/AuthLayout.jsx";
import AuthForm from "../Components/AuthForm.jsx";
import SocialLogin from "../Components/SocialLogin.jsx";
import Input from "../../../Components/Ui/Input.jsx";
import Button from "../../../Components/Ui/Button.jsx";
import { useAuth } from "../Hooks/UseAuth.js";
import { ROUTES } from "../../../Utils/Constants.js";
import { isEmail, passwordStrength } from "../../../Utils/Validators.js";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [err, setErr] = useState({});
  const { register, loading, error, clearError } = useAuth();

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErr((x) => ({ ...x, [k]: "" }));
    clearError();
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email) e.email = "Required";
    else if (!isEmail(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Required";
    else if (form.password.length < 8) e.password = "Min. 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    setErr(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (validate()) register(form);
  };
  const strength = passwordStrength(form.password);

  return (
    <AuthLayout
      title="Create account."
      subtitle="Join the community of storytellers."
    >
      <AuthForm
        error={error}
        footer={
          <>
            Already a member?{" "}
            <Link to={ROUTES.LOGIN} style={{ color: "var(--cyan)" }}>
              Sign in
            </Link>
          </>
        }
      >
        <Input
          label="Full Name"
          value={form.name}
          onChange={set("name")}
          error={err.name}
          placeholder="Arjun Sharma"
          autoFocus
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={set("email")}
          error={err.email}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <div>
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={set("password")}
            error={err.password}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
          />
          {form.password && (
            <div style={{ marginTop: "0.45rem" }}>
              <div style={{ display: "flex", gap: 3 }}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 2,
                      borderRadius: 1,
                      background:
                        i <= strength.score ? strength.color : "var(--ink-4)",
                      transition: "background var(--t)",
                    }}
                  />
                ))}
              </div>
              {strength.label && (
                <p
                  style={{
                    fontSize: "0.68rem",
                    color: strength.color,
                    fontFamily: "var(--font-mono)",
                    marginTop: "0.2rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {strength.label}
                </p>
              )}
            </div>
          )}
        </div>
        <Input
          label="Confirm Password"
          type="password"
          value={form.confirm}
          onChange={set("confirm")}
          error={err.confirm}
          placeholder="Repeat password"
          autoComplete="new-password"
        />
        <Button
          fullWidth
          loading={loading}
          onClick={submit}
          style={{ marginTop: "0.25rem" }}
        >
          Create Account
        </Button>
        <SocialLogin onGoogle={() => {}} disabled={loading} />
      </AuthForm>
    </AuthLayout>
  );
}
