import { createAndSendOtp } from "../services/OTP.service.js";
import { findUserByEmail } from "../services/User.service.js";

// POST /api/otp/resend
export const resendOtp = async (req, res, next) => {
  try {
    const { email, purpose } = req.body;
    const user = await findUserByEmail(email);

    // Silently succeed if user not found — prevent enumeration
    if (user) {
      await createAndSendOtp({ email, name: user.name, purpose });
    }

    res.status(200).json({
      success: true,
      message: "If that email is registered, a new OTP has been sent.",
    });
  } catch (err) {
    next(err);
  }
};