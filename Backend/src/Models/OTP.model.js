import mongoose from "mongoose";
import config from "../Config/Index.js";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  hashedOtp: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    enum: ["registration", "password-reset"],
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () =>
      new Date(Date.now() + config.otp.expiresInMinutes * 60 * 1000),
  },
  attempts: {
    type: Number,
    default: 0,
  },
});

// TTL index — MongoDB auto-deletes expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
otpSchema.index({ email: 1, purpose: 1 });

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;