import React from "react";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "../Application/Context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;