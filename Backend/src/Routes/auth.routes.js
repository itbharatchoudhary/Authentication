import { Router } from "express";
import * as authController from "../Controllers/Auth.controller.js";
import { authLimiter, otpLimiter } from "../Middleware/RateLimit.middleware.js";

const router = Router();

// Registration
router.post("/register", authLimiter, authController.register);
router.post("/verify-email", authLimiter, authController.verifyEmail);

// Google OAuth
router.post("/google", authLimiter, authController.googleAuth);

// Manual login
router.post("/login", authLimiter, authController.login);

// Token management
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

// Password recovery
router.post("/forgot-password", otpLimiter, authController.forgotPassword);
router.post("/reset-password", authLimiter, authController.resetPassword);

export default router;