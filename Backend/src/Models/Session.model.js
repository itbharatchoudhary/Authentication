import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    refreshTokenHash: {
      type: String,
      required: [true, "Refresh token Hash is required"],
    },
    ip: {
      type: String,
      required: [true, "IP address is required"],
    },
    userAgent: {
      type: String,
       required: [true, "userAgents is required"],
    },
    revoked:{
        type:Boolean,
        default:false,
    },
  },
  { timestamps: true },
);

const SessionModel = mongoose.model("Session", SessionSchema);

export default SessionModel;
