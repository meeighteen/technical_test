import { NextFunction, Request, Response } from "express";
import { validationResult, header } from "express-validator";

export const validateMatrixRequest = [
  header("Authorization")
    .isJWT()
    .withMessage("El valor Authorization debe ser un token válido.")
    .notEmpty()
    .withMessage("El valor Authorization es requerido"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
