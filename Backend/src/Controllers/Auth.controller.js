import UserModel from "../Models/User.Model.js";
import crypto from "crypto";

export async function register(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyRegistered = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyRegistered){
    res.status(409).json({
        message:"Username or email already existed"
    })
  }

  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

  const user = await UserModel.create({
    username,
    email,
    password:hashedPassword
  })
}


