import React from "react";
import AuthLayout from "../Components/AuthLayout";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen px-6 p-15 bg-[var(--color-bg)]">
        <div
          className="w-full max-w-md rounded-2xl p-8 
        bg-[var(--color-card)] 
        border border-[var(--color-border)] 
        shadow-[var(--shadow-lg)]"
        >
          {/* TITLE */}
          <h2 className="text-3xl font-semibold mb-12 text-center tracking-wide text-[var(--color-text)]">
            Create Account
          </h2>

          {/* NAME */}
          <input
            type="text"
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
            className="w-full py-3 rounded-lg font-medium transition duration-300
          bg-[var(--color-primary)] 
          text-white 
          hover:bg-[var(--color-primary-hover)]"
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

          {/* GOOGLE SIGNUP */}
          <button
            className="w-full py-3 rounded-lg font-medium transition duration-300
          bg-[var(--color-surface)] 
          text-[var(--color-text)] 
          border border-[var(--color-border)] 
          hover:bg-[var(--color-border)]"
          >
            Sign up with Google
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
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
