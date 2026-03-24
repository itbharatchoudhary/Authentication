import { verifyAccessToken } from "../Services/Token.service.js";
import logger from "../utils/logger.js";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);
    req.user = decoded; // { sub, role, iat, exp }
    next();
  } catch (err) {
    logger.warn("Auth middleware error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  next();
};