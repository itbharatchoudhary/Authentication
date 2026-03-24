import { Router } from "express";
import { resendOtp } from "../Controllers/OTP.controller.js";
import { otpLimiter } from "../Middleware/RateLimit.middleware.js";

const router = Router();

router.post("/resend", otpLimiter, resendOtp);

export default router;