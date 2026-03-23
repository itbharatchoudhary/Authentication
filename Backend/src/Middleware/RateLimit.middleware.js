import rateLimit from "express-rate-limit";

const createLimiter = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    message: { success: false, message },
    standardHeaders: true,
    legacyHeaders: false,
  });

// Strict: OTP send endpoints — prevent OTP flooding
export const otpLimiter = createLimiter(
  15 * 60 * 1000, // 15 minutes
  5,
  "Too many OTP requests. Try again after 15 minutes."
);

// Auth: Login / register
export const authLimiter = createLimiter(
  15 * 60 * 1000,
  20,
  "Too many auth attempts. Try again after 15 minutes."
);

// General API
export const generalLimiter = createLimiter(
  60 * 1000,
  100,
  "Too many requests. Slow down."
);