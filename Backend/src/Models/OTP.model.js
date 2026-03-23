import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    otp: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      enum: ["email-verification", "password-reset", "login"],
      default: "email-verification",
    },

    isUsed: {
      type: Boolean,
      default: false,
    },

    attempts: {
      type: Number,
      default: 0,
      max: 5, // lock after 5 wrong attempts
    },

    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Auto-delete document once expiresAt is reached (TTL index)
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Instance method: check if OTP is still valid
OTPSchema.methods.isValid = function () {
  return !this.isUsed && this.expiresAt > new Date() && this.attempts < 5;
};

// Instance method: mark OTP as used
OTPSchema.methods.markUsed = async function () {
  this.isUsed = true;
  await this.save();
};

// Instance method: increment failed attempt
OTPSchema.methods.incrementAttempt = async function () {
  this.attempts += 1;
  await this.save();
};

// Static method: find latest valid OTP for an email + purpose
OTPSchema.statics.findValid = function (email, purpose) {
  return this.findOne({
    email: email.toLowerCase(),
    purpose,
    isUsed: false,
    expiresAt: { $gt: new Date() },
    attempts: { $lt: 5 },
  }).sort({ createdAt: -1 });
};

export const OTP = mongoose.model("OTP", OTPSchema);