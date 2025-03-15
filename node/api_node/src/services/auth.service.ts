import "dotenv/config";
import jwt, { SignOptions } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secreto";
const EXPIRES_IN: any = process.env.JWT_EXPIRES_IN || "1h";

export const generateToken = (userId: string) => {
  const options: SignOptions = {
    expiresIn: EXPIRES_IN,
  };
  return jwt.sign({ userId }, SECRET_KEY, options);
};
