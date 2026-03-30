import express from "express";
import cors from "cors";
import "dotenv/config";

import { generalLimiter } from "./Middleware/RateLimit.middleware.js";
import { errorHandler, notFound } from "./Middleware/Error.middleware.js";

import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/User.routes.js";
import otpRoutes from "./Routes/OTP.routes.js";

import config from "./Config/Index.js";

const app = express();

// ─── Global Middlewares ───────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(generalLimiter);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (_, res) =>
  res.json({ status: "ok", env: config.server.env }),
);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/otp", otpRoutes);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
