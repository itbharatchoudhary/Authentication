import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../App/Store.js';
import { ROUTES } from '../../Utils/Constants.js';

export default function ProtectedRoute({ children, guestOnly = false, adminOnly = false }) {
  const { isAuth, user } = useAuthStore();
  const loc = useLocation();

  if (guestOnly && isAuth)  return <Navigate to={ROUTES.HOME} replace />;
  if (!guestOnly && !isAuth) return <Navigate to={ROUTES.LOGIN} state={{ from: loc }} replace />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to={ROUTES.UNAUTHORIZED} replace />;

  return children;
}