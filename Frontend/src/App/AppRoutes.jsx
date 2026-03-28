import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

import EntryPage from "../Pages/EntryPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import HomePage from "../Pages/HomePage";
import ProfilePage from "../Pages/ProfilePage";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

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
