import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../utils/constants.js";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";
import Loader from "../components/ui/Loader.jsx";

const Landing = lazy(() => import("../features/landing/pages/Landing.jsx"));
const Login = lazy(() => import("../features/auth/pages/Login.jsx"));
const Register = lazy(() => import("../features/auth/pages/Register.jsx"));
const VerifyOTP = lazy(() => import("../features/auth/pages/VerifyOTP.jsx"));
const ForgotPassword = lazy(
  () => import("../features/auth/pages/ForgotPassword.jsx"),
);
const ResetPassword = lazy(
  () => import("../features/auth/pages/ResetPassword.jsx"),
);
const Home = lazy(() => import("../features/home/pages/Home.jsx"));
const Profile = lazy(() => import("../features/user/pages/Profile.jsx"));
const NotFound = lazy(() => import("../features/error/pages/NotFound.jsx"));
const Unauthorized = lazy(
  () => import("../features/error/pages/Unauthorized.jsx"),
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
