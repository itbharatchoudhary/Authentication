import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // user login state
  const [dark, setDark] = useState(false);             // theme state

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setDark(savedTheme === "dark");
  }, []);

  // Apply theme globally
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  const toggleTheme = () => {
    setDark(prev => {
      localStorage.setItem("theme", !prev ? "dark" : "light");
      return !prev;
    });
  };

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, dark, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};