import { Request, Response } from "express";
import { generateToken } from "../services/auth.service";

// Mocked credentials
const MOCK_CREDENTIALS = {
  username: "admin",
  password: "secret123",
};

export const generateAuthToken = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (
    username !== MOCK_CREDENTIALS.username ||
    password !== MOCK_CREDENTIALS.password
  ) {
    res.status(401).json({ message: "Credenciales incorrectas." });
  }

  const token = generateToken(username);
  res.json({ token });
};
