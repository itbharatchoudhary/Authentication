export const API_BASE = "/api";

export const ROUTES = {
  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_OTP: "/verify-otp",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  HOME: "/home",
  PROFILE: "/profile",
  NOT_FOUND: "/404",
  UNAUTHORIZED: "/401",
};

export const TOKEN_KEYS = {
  ACCESS: "tgu_at",
  REFRESH: "tgu_rt",
  USER: "tgu_user",
};

export const OTP_RESEND_SECS = 60;
export const OTP_LENGTH = 6;
export const MAX_OTP_ATTEMPTS = 5;
