import dotenv from "dotenv";

dotenv.config();

function requireEnv(variable, name) {
  if (!variable) {
    throw new Error(`${name} is not defined in environment variables`);
  }
  return variable;
}

const Config = {
  MONGO_URI: requireEnv(process.env.MONGO_URI, "MONGO_URI"),
};

export default Config;