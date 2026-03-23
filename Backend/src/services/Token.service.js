import jwt from "jsonwebtoken";
import config from "../Config/Index.js";
import Session from "../Models/Session.model.js";
import logger from "../utils/logger.js";

export const generateAccessToken = (payload) =>
  jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  });

export const generateRefreshToken = (payload) =>
  jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });

export const verifyAccessToken = (token) =>
  jwt.verify(token, config.jwt.accessSecret);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, config.jwt.refreshSecret);

export const saveSession = async ({ userId, refreshToken, userAgent, ip }) => {
  const decoded = verifyRefreshToken(refreshToken);
  return Session.create({
    userId,
    refreshToken,
    userAgent,
    ip,
    expiresAt: new Date(decoded.exp * 1000),
  });
};

export const revokeSession = async (refreshToken) =>
  Session.findOneAndUpdate({ refreshToken }, { isRevoked: true });

export const revokeAllUserSessions = async (userId) => {
  const result = await Session.updateMany({ userId, isRevoked: false }, { isRevoked: true });
  logger.info(`Revoked ${result.modifiedCount} sessions for user ${userId}`);
};

export const rotateRefreshToken = async ({ oldRefreshToken, userId, userAgent, ip }) => {
  await revokeSession(oldRefreshToken);
  const payload = { sub: userId };
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);
  await saveSession({ userId, refreshToken: newRefreshToken, userAgent, ip });
  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};