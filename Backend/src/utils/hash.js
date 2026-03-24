import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export const hashPassword = async (password) =>
  bcrypt.hash(password, SALT_ROUNDS);

export const comparePassword = async (plain, hashed) =>
  bcrypt.compare(plain, hashed);

export const hashOtp = async (otp) => bcrypt.hash(otp, SALT_ROUNDS);

export const compareOtp = async (plain, hashed) =>
  bcrypt.compare(plain, hashed);