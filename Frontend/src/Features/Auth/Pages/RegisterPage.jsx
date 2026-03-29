import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import AuthLayout from "../Components/AuthLayout";
import { useAuth } from "../Context/AuthContext";

const Register = () => {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await register(formData);
      alert("Registered successfully");
      navigate("/verify-otp", {
        state: { email: formData.email },
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const googleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await loginWithGoogle(tokenResponse.access_token);
        alert("Google signup successful!");
        navigate("/home");
      } catch (err) {
        alert(err.message);
      }
    },
    onError: () => {
      alert("Google signup failed");
    },
  });

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen px-6 p-15 bg-[var(--color-bg)]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          className="w-full max-w-md rounded-2xl p-8 bg-[var(--color-card)] border border-[var(--color-border)] shadow-[var(--shadow-lg)]"
        >
          {/* TITLE */}
          <h2 className="text-3xl font-semibold mb-12 text-center tracking-wide text-[var(--color-text)]">
            Create Account
          </h2>

          {/* NAME */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-3 rounded-lg
            bg-[var(--color-surface)] 
            border border-[var(--color-border)] 
            text-[var(--color-text)] 
            placeholder-[var(--color-text-secondary)] 
            focus:outline-none 
            focus:border-[var(--color-primary)] 
            transition"
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 rounded-lg 
            bg-[var(--color-surface)] 
            border border-[var(--color-border)] 
            text-[var(--color-text)] 
            placeholder-[var(--color-text-secondary)] 
            focus:outline-none 
            focus:border-[var(--color-primary)] 
            transition"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 rounded-lg 
            bg-[var(--color-surface)] 
            border border-[var(--color-border)] 
            text-[var(--color-text)] 
            placeholder-[var(--color-text-secondary)] 
            focus:outline-none 
            focus:border-[var(--color-primary)] 
            transition"
          />

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium transition duration-300 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
          >
            Register
          </button>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-[var(--color-border)]"></div>
            <p className="px-3 text-sm text-[var(--color-text-secondary)]">
              OR
            </p>
            <div className="flex-1 h-px bg-[var(--color-border)]"></div>
          </div>

          <button
            type="button"
            onClick={() => googleSignup()}
            className="w-full py-3 rounded-lg font-medium transition duration-300
  bg-[var(--color-surface)] 
  text-[var(--color-text)] 
  border border-[var(--color-border)] 
  hover:bg-[var(--color-border)]"
          >
            Continue with Google
          </button>

          {/* SWITCH */}
          <p className="text-center text-sm mt-6 text-[var(--color-text-secondary)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline hover:opacity-80 text-[var(--color-text)]"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Register;
