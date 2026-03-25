import React, { useEffect } from "react";
import { setupInterceptors } from "../Services/Interceptors.js";
import { useAuthStore } from "./Store.js";
import api from "../Services/Axios.js";

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
