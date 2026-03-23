import UserModel from "../Models/User.Model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Config from "../Config/Config.js";
import SessionModel from "../Models/Session.model.js";
import { sendEmail } from "../Services/Email.Service.js";
import { generateOTP, getOtpHtml } from "../Utils/Util.js";
import OtpModel from "../Models/Otp.model.js";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body || {};

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isAlreadyRegistered = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyRegistered) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const otp = generateOTP();
    const html = getOtpHtml(otp);

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    await OtpModel.create({
      email,
      user: user._id,
      otpHash,
    });

    await sendEmail(
      email,
      " OTP verification",
      `Your OTP code is ${otp}`,
      html,
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          verified: user.verified,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.verified) {
      return res.status(401).json({
        message: "Email not verified",
      });
    }
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const isPasswordValid = hashedPassword === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({
        message: " Invalid email or password",
      });
    }

    const refreshToken = jwt.sign({ id: user._id }, Config.JWT_SECRET, {
      expiresIn: "7d",
    });

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await SessionModel.create({
      user: user._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign(
      {
        id: user._id,
        sessionId: session._id,
      },
      Config.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getMe(req, res) {
  try {
    // Extract token from Authorization header
    // Format: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Get the token part
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    // Verify token
    const decoded = jwt.verify(token, Config.JWT_SECRET);

    // Find user by decoded ID
    const user = await UserModel.findById(decoded.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user data
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("getMe error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token not found",
      });
    }

    const decoded = jwt.verify(refreshToken, Config.JWT_SECRET);

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await SessionModel.findOne({
      refreshTokenHash,
      revoked: false,
    });

    if (!session) {
      return res.status(401).json({
        message: "Invalid Refresh token",
      });
    }

    const accessToken = jwt.sign(
      {
        id: decoded.id,
      },
      Config.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const newRefreshToken = jwt.sign(
      {
        id: decoded.id,
      },
      Config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const newRefreshTokenHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    session.refreshTokenHash = newRefreshTokenHash;
    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    console.error("Refresh Token Error:", error);
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
}

export async function logout(req, res) {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        message: "No refresh token provided",
      });
    }

    // Hash the refresh token
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Find active session
    const session = await SessionModel.findOne({
      refreshTokenHash,
      revoked: false,
    });

    if (!session) {
      return res.status(400).json({
        message: "Session not found or already logged out",
      });
    }

    //  Revoke session
    session.revoked = true;
    await session.save();

    res.clearCookie("refreshToken");

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function logoutAll(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken; // assuming auth middleware sets req.user

    if (!refreshToken) {
      return res.status(401).json({
        message: "refresh token not found",
      });
    }

    const decoded = jwt.verify(refreshToken, Config.JWT_SECRET);

    // Revoke ALL active sessions of the user
    const result = await SessionModel.updateMany(
      {
        user: decoded.id,
        revoked: false,
      },
      {
        revoked: true,
      },
    );

    res.clearCookie("refreshToken");

    res.status(200).json({
      message: "Logged out from all devices successfully",
      sessionsRevoked: result.modifiedCount,
    });
  } catch (error) {
    console.error("LogoutAll Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function verifyEmail(req, res) {
  try {
    const { otp, email } = req.body || {};

    if (!otp || !email) {
      return res.status(400).json({
        success: false,
        message: "OTP and email are required",
      });
    }

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    const otpDoc = await OtpModel.findOne({ email, otpHash });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (otpDoc.expiresAt < new Date()) {
      await OtpModel.deleteOne({ _id: otpDoc._id });

      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const user = await UserModel.findByIdAndUpdate(
      otpDoc.user,
      { verified: true },
      { new: true },
    );

    await OtpModel.deleteMany({ user: otpDoc.user });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        username: user.username,
        email: user.email,
        verified: user.verified,
      },
    });
  } catch (error) {
    console.error("Verify Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
