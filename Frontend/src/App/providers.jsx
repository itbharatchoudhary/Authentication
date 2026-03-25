import React, { useEffect } from "react";
import { setupInterceptors } from "../services/interceptors.js";
import { useAuthStore } from "./store.js";
import api from "../services/axios.js";

// Boot interceptors once
setupInterceptors();

export default function Providers({ children }) {
  const { isAuth, patchUser, logout } = useAuthStore();

  // Revalidate session on mount
  useEffect(() => {
    if (!isAuth) return;
    api
      .get("/users/me")
      .then(({ data }) => patchUser(data.user))
      .catch(() => logout());
  }, []);

  return <>{children}</>;
}
