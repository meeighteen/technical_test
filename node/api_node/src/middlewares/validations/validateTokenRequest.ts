import { NextFunction, Request, Response } from "express";
import { validationResult, check } from "express-validator";

export const validateTokenRequest = [
  check("username")
    .notEmpty()
    .withMessage("El campo username es requerido"),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es requerida"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
