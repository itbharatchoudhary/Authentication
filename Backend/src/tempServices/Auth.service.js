import axios from "axios";
import {
  findUserByEmail,
  createLocalUser,
  createGoogleUser,
  markUserVerified,
  updateUserPassword,
} from "./User.service.js";
import { createAndSendOtp, verifyOtp } from "./OTP.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
  saveSession,
  revokeAllUserSessions,
} from "./Token.service.js";
import { hashPassword, comparePassword } from "../utils/hash.js";


// ─── Registration ────────────────────────────────────────────────────────────

export const registerUser = async ({ name, email, password }) => {
  const existing = await findUserByEmail(email);
  if (existing) {
    if (!existing.isVerified) {
      await createAndSendOtp({ email, name, purpose: "registration" });
      return { message: "OTP resent. Please verify your email." };
    }
    throw new Error("Email already registered");
  }

  const hashedPassword = await hashPassword(password);
  await createLocalUser({ name, email, hashedPassword });
  await createAndSendOtp({ email, name, purpose: "registration" });
  return { message: "Registration started. Check your email for OTP." };
};

export const verifyRegistrationOtp = async ({ email, otp }, { userAgent, ip }) => {
  await verifyOtp({ email, otp, purpose: "registration" });
  const user = await markUserVerified(email);

  const payload = { sub: user._id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  await saveSession({ userId: user._id, refreshToken, userAgent, ip });

  return { accessToken, refreshToken, user };
};



export const googleLogin = async (accessToken, { userAgent, ip }) => {
  //  Get user info from Google using access_token
  const googleRes = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const { sub: googleId, email, name, picture } = googleRes.data;

  let user = await findUserByEmail(email);

  if (!user) {
    user = await createGoogleUser({
      googleId,
      name,
      email,
      avatar: picture,
    });
  }

  const payload = { sub: user._id, role: user.role };
  const accessTokenJWT = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await saveSession({
    userId: user._id,
    refreshToken,
    userAgent,
    ip,
  });

  return {
    accessToken: accessTokenJWT,
    refreshToken,
    user,
  };
};

// ─── Manual Login ─────────────────────────────────────────────────────────────

export const loginUser = async ({ email, password }, { userAgent, ip }) => {
  const user = await findUserByEmail(email, true);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  if (!user.isVerified) {
    await createAndSendOtp({ email, name: user.name, purpose: "registration" });
    throw new Error("Email not verified. A new OTP has been sent.");
  }

  const payload = { sub: user._id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  await saveSession({ userId: user._id, refreshToken, userAgent, ip });

  return { accessToken, refreshToken, user };
};

// ─── Forgot / Reset Password ──────────────────────────────────────────────────

export const forgotPassword = async (email) => {
  const user = await findUserByEmail(email);
  // Silently succeed if email not found to prevent user enumeration
  if (!user) return { message: "If that email exists, an OTP has been sent." };

  await createAndSendOtp({ email, name: user.name, purpose: "password-reset" });
  return { message: "OTP sent to your email." };
};

export const resetPassword = async ({ email, otp, newPassword }) => {
  await verifyOtp({ email, otp, purpose: "password-reset" });

  const hashed = await hashPassword(newPassword);
  const user = await updateUserPassword(email, hashed);

  // Invalidate all existing sessions for security
  await revokeAllUserSessions(user._id);

  return { message: "Password reset successful. Please log in again." };
};