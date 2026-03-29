import React from "react";
import AppRoutes from "./App.Routes.jsx";
import { AuthProvider } from "../Features/Auth/Context/AuthContext.jsx";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;