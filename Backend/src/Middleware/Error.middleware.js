import logger from "../utils/logger.js";

// Catch-all error handler — must be registered LAST in Express
export const errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} — ${err.message}`, {
    stack: err.stack,
  });

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production" && statusCode === 500
      ? "Internal server error"
      : err.message;

  return res.status(statusCode).json({ success: false, message });
};

// 404 handler — register before errorHandler
export const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
};