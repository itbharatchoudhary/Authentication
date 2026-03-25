import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../Utils/Constants.js";
import ProtectedRoute from "../Components/Common/ProtectedRoute.jsx";
import Loader from "../Components/Ui/Loader.jsx";

const Landing = lazy(() => import("../Features/Landing/Pages/Landing.jsx"));
const Login = lazy(() => import("../Features/Auth/Pages/Login.jsx"));
const Register = lazy(() => import("../Features/Auth/Pages/Register.jsx"));
const VerifyOTP = lazy(() => import("../Features/Auth/Pages/VerifyOTP.jsx"));
const ForgotPassword = lazy(
  () => import("../Features/Auth/Pages/ForgotPassword.jsx"),
);
const ResetPassword = lazy(
  () => import("../Features/Auth/Pages/ResetPassword.jsx"),
);
const Home = lazy(() => import("../Features/Home/Pages/Home.jsx"));
const Profile = lazy(() => import("../Features/User/Pages/Profile.jsx"));
const NotFound = lazy(() => import("../Features/Error/Pages/NotFound.jsx"));
const Unauthorized = lazy(
  () => import("../Features/Error/Pages/Unauthorized.jsx"),
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader fullPage />}>
      <Routes>
        {/* Public */}
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route
          path={ROUTES.LOGIN}
          element={
            <ProtectedRoute guestOnly>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            <ProtectedRoute guestOnly>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.VERIFY_OTP} element={<VerifyOTP />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />

        {/* Protected */}
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Error */}
        <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Routes>
    </Suspense>
  );
}
