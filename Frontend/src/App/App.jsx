import React from "react";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "../Context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;