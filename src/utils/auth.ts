import jwt from "@tsndr/cloudflare-worker-jwt";
import bcrypt from "bcryptjs";
import { User } from "../interface";

export const generateAccessTokenForUser = (user: User): Promise<string> => {
  return jwt.sign({ id: user.id }, JWT_SECRET_KEY || "test");
};

export const generatePasswordHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = ({ hash, password }: { hash: string; password: string }): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export default {
  generateAccessTokenForUser,
  generatePasswordHash,
  comparePassword,
};
