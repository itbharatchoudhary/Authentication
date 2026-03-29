import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../Features/Auth/Services/AuthService";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setIsLoggedIn(true);
      setToken(savedToken);
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setDark(savedTheme === "dark");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [dark]);

  const toggleTheme = () => {
    setDark((prev) => {
      localStorage.setItem("theme", !prev ? "dark" : "light");
      return !prev;
    });
  };

  // 🔐 LOGIN
  const login = async (formData) => {
    const data = await loginUser(formData);

    setUser(data.user);
    setToken(data.token);
    setIsLoggedIn(true);

    localStorage.setItem("token", data.token);
  };

  const register = async (formData) => {
    return await registerUser(formData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        register,
        logout,
        user,
        token,
        dark,
        toggleTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
