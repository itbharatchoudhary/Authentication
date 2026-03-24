import { Router } from "express";
import { resendOtp } from "../controllers/otp.controller.js";
import { otpLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.post("/resend", otpLimiter, resendOtp);

export default router;