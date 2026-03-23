import crypto from "crypto";
import OTP from "../Models/OTP.model.js";
import { hashOtp, compareOtp } from "../utils/hash.js";
import { sendEmail } from "../Config/Mailer.js";
import { otpEmailTemplate } from "../utils/emailTemplate.js";
import config from "../Config/Index.js";

const MAX_ATTEMPTS = 5;

const generateOtpCode = () =>
  crypto.randomInt(100000, 999999).toString();

export const createAndSendOtp = async ({ email, name, purpose }) => {
  // Invalidate any existing OTPs for same email+purpose
  await OTP.deleteMany({ email, purpose });

  const otp = generateOtpCode();
  const hashedOtp = await hashOtp(otp);

  await OTP.create({ email, hashedOtp, purpose });

  await sendEmail({
    to: email,
    subject: purpose === "registration" ? "Verify Your Email" : "Reset Your Password",
    html: otpEmailTemplate({ name, otp, purpose, expiresInMinutes: config.otp.expiresInMinutes }),
  });

  return true;
};

export const verifyOtp = async ({ email, otp, purpose }) => {
  const record = await OTP.findOne({ email, purpose });

  if (!record) throw new Error("OTP not found or expired");

  if (record.attempts >= MAX_ATTEMPTS) {
    await OTP.deleteOne({ _id: record._id });
    throw new Error("Too many attempts. Please request a new OTP");
  }

  if (record.expiresAt < new Date()) {
    await OTP.deleteOne({ _id: record._id });
    throw new Error("OTP has expired");
  }

  const isValid = await compareOtp(otp, record.hashedOtp);

  if (!isValid) {
    await OTP.updateOne({ _id: record._id }, { $inc: { attempts: 1 } });
    throw new Error("Invalid OTP");
  }

  // Consume OTP after successful verification
  await OTP.deleteOne({ _id: record._id });
  return true;
};