import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Components/AuthLayout";

const EntryPage = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-start min-h-screen px-7 md:px-10 max-w-2xl transition-all duration-1000 ease-out"
           style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
        
        {/* CONTENT */}
        <div className="flex flex-col justify-center items-start min-h-screen px-7 md:px-10 max-w-2xl transition-all duration-1000 ease-out">
          
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
            <span className="block">Modern Authentication,</span>
            <span className="block">Made Effortless</span>
          </h1>

          <p
            className="mt-4 max-w-md"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Secure every identity, protect every interaction. Authentication
            built with precision, trust, and modern engineering.
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="absolute bottom-10 right-10 flex gap-4 transition-all duration-1000">
        
        <button
          className="px-2 py-1 rounded-full transform hover:scale-105 transition duration-300"
          style={{
            background: "var(--color-surface)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)"
          }}
          onClick={() => navigate("/register")}
        >
          Get Started
        </button>

        <button
          className="px-4 py-2 rounded-full transform hover:scale-105 transition duration-300"
          style={{
            background: "var(--color-primary)",
            color: "#fff"
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "var(--color-primary-hover)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "var(--color-primary)")
          }
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </AuthLayout>
  );
};

export default EntryPage;