import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const comparePasswords = (input: string, hash: string) => bcrypt.compare(input, hash);

export const signJwtToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
};
