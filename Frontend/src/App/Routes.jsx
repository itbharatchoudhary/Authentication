import { BrowserRouter, Routes, Route } from "react-router-dom";
import EntryPage from "../Pages/EntryPage";
import Login from "../Pages/LoginPage";
import Register from "../Pages/RegisterPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
