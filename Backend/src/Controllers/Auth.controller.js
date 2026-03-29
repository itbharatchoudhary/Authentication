import * as authService from "../Services/Auth.service.js";
import {
  rotateRefreshToken,
  revokeSession,
} from "../Services/Token.service.js";
import logger from "../utils/logger.js";

const getMeta = (req) => ({
  userAgent: req.headers["user-agent"] || "unknown",
  ip: req.ip,
});

// POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.registerUser({ name, email, password });
    res.status(201).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/verify-email
export const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const result = await authService.verifyRegistrationOtp(
      { email, otp },
      getMeta(req),
    );
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/google
export const googleAuth = async (req, res, next) => {
  try {
    const { access_token } = req.body;
    const result = await authService.googleLogin(access_token, getMeta(req));
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(
      { email, password },
      getMeta(req),
    );
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/refresh-token
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res
        .status(400)
        .json({ success: false, message: "Refresh token required" });

    const result = await rotateRefreshToken({
      oldRefreshToken: refreshToken,
      userId: req.body.userId,
      ...getMeta(req),
    });
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/logout
export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) await revokeSession(refreshToken);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/forgot-password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/reset-password
export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const result = await authService.resetPassword({ email, otp, newPassword });
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};
