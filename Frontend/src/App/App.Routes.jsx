import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../Features/Auth/Context/AuthContext";

import EntryPage from "../Features/Auth/Pages/EntryPage";
import LoginPage from "../Features/Auth/Pages/LoginPage";
import RegisterPage from "../Features/Auth/Pages/RegisterPage";
import HomePage from "../Features/Home/Pages/HomePage";
import ProfilePage from "../Features/Home/Pages/ProfilePage";
import VerifyOtpPage from "../Features/Auth/Pages/VerifyOtpPage";

import Navbar from "../Features/Home/Components/Navbar";
import Footer from "../Features/Home/Components/Footer";

const AppRoutes = () => {
  const { isLoggedIn, dark, toggleTheme } = useAuth();

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar dark={dark} toggleTheme={toggleTheme} />}
      {/* <Navbar dark={dark} toggleTheme={toggleTheme} /> */}

      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <EntryPage />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/home" /> : <RegisterPage />}
        />

        <Route path="/verify-otp" element={<VerifyOtpPage />} />

        <Route
          path="/home"
          // element={<HomePage />}
          element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          //  element={<ProfilePage />}
          element={isLoggedIn ? <ProfilePage /> : <Navigate to="/" />}
        />
      </Routes>
      {/* <Footer /> */}
      {isLoggedIn && <Footer />}
    </BrowserRouter>
  );
};

export default AppRoutes;
