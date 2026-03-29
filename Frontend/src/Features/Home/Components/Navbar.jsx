import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // <-- Import AuthContext

const Navbar = () => {
  const navigate = useNavigate();
  const { dark, toggleTheme } = useAuth(); // <-- Use global theme from context
  const [time, setTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-4 z-20 
                 bg-[var(--color-bg)] border-b border-[var(--color-border)] shadow-[var(--shadow-sm)]
                 backdrop-blur-md"
    >
      {/* LOGO */}
      <p
        className="text-sm font-medium tracking-widest text-[var(--color-text-secondary)] 
                   cursor-pointer hover:text-[var(--color-text)] transition-[var(--transition-fast)]"
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
                     hover:scale-105 transition-[var(--transition-normal)] 
                     shadow-[var(--shadow-sm)]"
        >
          {dark ? (
            <i className="ri-sun-line text-yellow-400 text-lg"></i>
          ) : (
            <i className="ri-moon-line text-[var(--color-text)] text-lg"></i>
          )}
        </button>

        {/* PROFILE AVATAR */}
        <div
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer
                     border border-[var(--color-border)] shadow-[var(--shadow-sm)]
                     hover:scale-105 transition-[var(--transition-normal)]"
          onClick={() => navigate("/profile")}
        >
          <img
            src="https://i.pinimg.com/736x/34/35/b7/3435b70e1087f790af3aa209219df67d.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;