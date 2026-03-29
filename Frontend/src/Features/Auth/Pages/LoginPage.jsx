import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import AuthLayout from "../Components/AuthLayout";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <AuthLayout>
      <div
        className="flex items-center justify-center min-h-screen px-6 pt-10"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (!formData.email || !formData.password) {
              alert("Please fill all fields");
              return;
            }

            try {
              await login(formData);
              navigate("/home");
            } catch (err) {
              alert(err.message);
            }
          }}
          className="w-full max-w-md rounded-2xl p-8 border"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {/* TITLE */}
          <h2
            className="text-3xl font-semibold mb-8 text-center tracking-wide"
            style={{ color: "var(--color-text)" }}
          >
            Welcome Back
          </h2>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full mb-4 px-4 py-3 rounded-lg focus:outline-none transition"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full mb-6 px-4 py-3 rounded-lg focus:outline-none transition"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium transition duration-300"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#fff",
            }}
          >
            Login
          </button>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "var(--color-border)" }}
            ></div>
            <p
              className="px-3 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              OR
            </p>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "var(--color-border)" }}
            ></div>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            className="w-full py-3 rounded-lg font-medium transition duration-300 border"
            style={{
              backgroundColor: "transparent",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            Continue with Google
          </button>

          {/* SWITCH */}
          <p
            className="text-center text-sm mt-6"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="underline hover:opacity-80"
              style={{ color: "var(--color-text)" }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
