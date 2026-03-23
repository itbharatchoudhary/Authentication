import mongoose from "mongoose";
import Config from "./Config.js";

async function connectedDB(){
   try {
  await mongoose.connect(Config.MONGO_URI);
  console.log("Connected Database successfully");
} catch (err) {
  console.error("DB Error:", err);
  process.exit(1);
}
}

export default connectedDB;