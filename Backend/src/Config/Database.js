import mongoose from "mongoose";
import Config from "./Config.js";

async function connectedDB(){
    await mongoose.connect(Config.MONGO_URI)

    console.log("Connected Database successfully")
}

export default connectedDB;