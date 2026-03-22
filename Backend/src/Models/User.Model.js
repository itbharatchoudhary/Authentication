import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "The Username is Required"],
    unique: [true, "The Username is unique"],
  },
  email: {
    type: String,
    required: [true, "The email is Required"],
    unique: [true, "The email is unique"],
  },
  password: {
    type: String,
    required: [true, "The email is password"],
  },
  
});


const UserModel = mongoose.model("User",userSchema);
export default UserModel;