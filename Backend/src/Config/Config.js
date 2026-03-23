import dotenv from "dotenv";

dotenv.config();

// Helper function to validate env variables
function requireEnv(variable, name) {
  if (!variable) {
    throw new Error(`${name} is not defined in environment variables`);
  }
  return variable;
}

const Config = {
  MONGO_URI: requireEnv(process.env.MONGO_URI, "MONGO_URI"),
  JWT_SECRET: requireEnv(process.env.JWT_SECRET, "JWT_SECRET"),

  GOOGLE: {
    CLIENT_ID: requireEnv(process.env.GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_ID"),
    CLIENT_SECRET: requireEnv(process.env.GOOGLE_CLIENT_SECRET, "GOOGLE_CLIENT_SECRET"),
    REFRESH_TOKEN: requireEnv(process.env.GOOGLE_REFRESH_TOKEN, "GOOGLE_REFRESH_TOKEN"),
    USER: requireEnv(process.env.GOOGLE_USER, "GOOGLE_USER"),
  },
};

export default Config;