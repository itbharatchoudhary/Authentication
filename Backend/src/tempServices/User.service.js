import User from "../Models/User.model.js";

export const findUserByEmail = async (email, withPassword = false) => {
  const query = User.findOne({ email: email.toLowerCase() });
  return withPassword ? query.select("+password") : query;
};

export const findUserById = async (id) => User.findById(id);

export const createLocalUser = async ({ name, email, hashedPassword }) =>
  User.create({ name, email, password: hashedPassword, authProvider: "local" });

export const createGoogleUser = async ({ googleId, name, email, avatar }) =>
  User.create({
    googleId,
    name,
    email,
    avatar,
    authProvider: "google",
    isVerified: true,
  });

export const markUserVerified = async (email) =>
  User.findOneAndUpdate({ email }, { isVerified: true }, { new: true });

export const updateUserPassword = async (email, hashedPassword) =>
  User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });

export const getAllUsers = async () => User.find().select("-password");

export const deleteUser = async (id) => User.findByIdAndDelete(id);