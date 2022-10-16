import jwt from "jsonwebtoken";

export const generateHash = (payload: any): string => {
  return jwt.sign(payload, JWT_SECRET_KEY);
};

export default {
  generateHash,
};
