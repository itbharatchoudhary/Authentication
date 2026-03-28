import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Components/AuthLayout";

const EntryPage = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div
        className="relative flex flex-col justify-center items-start min-h-screen px-7 md:px-10 transition-all duration-300"
        style={{
          background: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      >
        {/* CONTENT */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
            <span className="block">Modern Authentication,</span>
            <span className="block">Made Effortless</span>
          </h1>

          <p
            className="mt-4 max-w-md"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Secure every identity, protect every interaction. Authentication built
            with precision, trust, and modern engineering.
          </p>
        </div>

        {/* BUTTONS (inside same parent now) */}
        <div className="absolute bottom-10 right-10 flex gap-4">
          <button
            className="px-4 py-2 rounded-full border transition duration-300 hover:scale-105"
            style={{
              background: "var(--color-surface)",
              color: "var(--color-text)",
              borderColor: "var(--color-border)",
            }}
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

          <button
            className="px-4 py-2 rounded-full transition duration-300 hover:scale-105 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default EntryPage;