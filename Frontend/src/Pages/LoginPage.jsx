import React from "react";
import AuthLayout from "../Components/AuthLayout";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen bg-black px-6 pt-10">
        <div className="w-full max-w-md bg-black border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
          {/* TITLE */}
          <h2 className="text-3xl font-semibold mb-8 text-center text-white tracking-wide">
            Welcome Back
          </h2>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 rounded-lg bg-black border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 rounded-lg bg-black border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
          />

          {/* LOGIN BUTTON */}
          <button className="w-full py-3 rounded-lg bg-white/30 text-black font-medium hover:bg-white/25  border border-white transition duration-300">
            Login
          </button>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/20"></div>
            <p className="px-3 text-sm text-white/40">OR</p>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* GOOGLE LOGIN */}
          <button className="w-full py-3 rounded-lg bg-white/25 text-black font-medium hover:bg-white/30  border border-white transition duration-300">
            Continue with Google
          </button>

          {/* SWITCH */}
          <p className="text-center text-sm text-white/40 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-white underline hover:opacity-80"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
