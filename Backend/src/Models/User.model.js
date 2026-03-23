// models/User.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Password required only if not using Google OAuth
      },
      minlength: [6, "Password must be at least 6 characters"],
    },
    isVerified: {
      type: Boolean,
      default: false, // Becomes true after email OTP verification or Google OAuth
    },
    googleId: {
      type: String,
      default: null, // Populated if user signs up with Google
    },
    otp: {
      type: String, // Store hashed OTP
    },
    otpExpiresAt: {
      type: Date,
    },
    passwordResetOtp: {
      type: String, // Hashed OTP for password reset
    },
    passwordResetExpiresAt: {
      type: Date,
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash password before saving (if modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Optional: Method to check if OTP is valid
userSchema.methods.isOtpValid = function (otp) {
  if (!this.otp || !this.otpExpiresAt) return false;
  const now = new Date();
  return now < this.otpExpiresAt;
};

const User = mongoose.model("User", userSchema);

export default User;