import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../Services/AuthService";
import { apiRequest } from "../Services/Auth.Api";

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
    setToken(data.accessToken);
    setIsLoggedIn(true);

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
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

  // 🔐 GOOGLE LOGIN
  const loginWithGoogle = async (access_token) => {
    const data = await apiRequest("/auth/google", "POST", {
      access_token,
    });

    setUser(data.user);
    setToken(data.accessToken);
    setIsLoggedIn(true);

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        loginWithGoogle,
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
