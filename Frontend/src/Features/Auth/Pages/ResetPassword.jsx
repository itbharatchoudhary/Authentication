import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout.jsx";
import AuthForm from "../components/AuthForm.jsx";
import Input from "../../../components/ui/Input.jsx";
import Button from "../../../components/ui/Button.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { passwordStrength } from "../../../utils/validators.js";
import { ROUTES } from "../../../utils/constants.js";
import { useOtpStore } from "../../../app/store.js";

export default function ResetPassword() {
  const navigate = useNavigate();
  const otpStore = useOtpStore();
  const [form, setForm] = useState({ pw: "", confirm: "" });
  const [err, setErr] = useState({});
  const { resetPassword, loading, error, clearError } = useAuth();

  useEffect(() => {
    if (!otpStore.email || !otpStore.otp) navigate(ROUTES.LOGIN);
  }, []);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErr((x) => ({ ...x, [k]: "" }));
    clearError();
  };

  const validate = () => {
    const e = {};
    if (!form.pw) e.pw = "Required";
    else if (form.pw.length < 8) e.pw = "Min. 8 characters";
    if (form.pw !== form.confirm) e.confirm = "Passwords don't match";
    setErr(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (validate()) resetPassword(form.pw);
  };
  const strength = passwordStrength(form.pw);

  return (
    <AuthLayout
      title="New password."
      subtitle="Choose a strong password you haven't used before."
    >
      <AuthForm error={error}>
        <div>
          <Input
            label="New Password"
            type="password"
            value={form.pw}
            onChange={set("pw")}
            error={err.pw}
            placeholder="Min. 8 characters"
            autoFocus
            autoComplete="new-password"
          />
          {form.pw && (
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
          Reset Password
        </Button>
      </AuthForm>
    </AuthLayout>
  );
}
