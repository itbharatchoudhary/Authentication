import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dark, setDark] = useState(false);

  // ⏰ Live Time
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✨ Entry Animation
  useEffect(() => {
    setShow(true);
  }, []);

  // 🌗 Load Theme
 useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);;

  // 🔄 Toggle Theme
   const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden transition-[background,color] duration-300">

      {/* 🌐 GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-40 pointer-events-none
        bg-[linear-gradient(var(--color-border)_1px,transparent_1px),
        linear-gradient(90deg,var(--color-border)_1px,transparent_1px)]
        bg-[size:40px_40px]" />

      {/* 🌫️ GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t 
        from-[var(--color-bg)] via-transparent to-transparent" />

      {/* 🔝 NAVBAR */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-4 z-20">

        {/* LOGO */}
        <p
          className="text-sm font-medium tracking-widest text-[var(--color-text-secondary)] cursor-pointer hover:text-[var(--color-text)] transition"
          onClick={() => navigate("/")}
        >
          THEGAMEUNTOLD
        </p>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* TIME */}
          <h6 className="text-xs md:text-sm text-[var(--color-text-secondary)]">
            {time
              .toLocaleString("en-IN", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              .replace(",", "")}
          </h6>

          {/* THEME BUTTON */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full 
              bg-[var(--color-card)] border border-[var(--color-border)]
              hover:scale-105 transition duration-300 shadow-[var(--shadow-sm)]"
          >
            {dark ? (
              <i className="ri-sun-line text-yellow-400 text-lg"></i>
            ) : (
              <i className="ri-moon-line text-[var(--color-text)] text-lg"></i>
            )}
          </button>
        </div>
      </div>
    
      {/* 📦 PAGE CONTENT */}
      <div
        className={`relative z-10 transition-all duration-700 ease-out transform
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;