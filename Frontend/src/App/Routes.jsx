import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import EntryPage from "../Pages/EntryPage";
import Login from "../Pages/LoginPage";
import Register from "../Pages/RegisterPage";
import HomePage from "../Pages/HomePage";
import ProfilePage from "../Pages/ProfilePage";

const AppRoutes = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  // Apply theme globally
  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<EntryPage dark={dark} toggleTheme={toggleTheme} />}
        />
        <Route
          path="/login"
          element={<Login dark={dark} toggleTheme={toggleTheme} />}
        />
        <Route
          path="/register"
          element={<Register dark={dark} toggleTheme={toggleTheme} />}
        />

        {/* PASS THEME PROPS */}
        <Route
          path="/home"
          element={<HomePage toggleTheme={toggleTheme} dark={dark} />}
        />

        <Route
          path="/profile"
          element={<ProfilePage dark={dark} toggleTheme={toggleTheme} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
