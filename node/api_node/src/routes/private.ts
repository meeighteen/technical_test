import express, { NextFunction } from "express";
import { matrixOperationController } from "../controllers/matrixOpController";
import { validateMatrixRequest } from "../middlewares/validations/validateMatrixRequest";
import { validateTokenProvided } from "../middlewares/matrixOperations/validateTokenProvided";

const router = express.Router();

/**
 * @swagger
 * /api/private/matrix_operations:
 *  post:
 *    summary: Realizar operaciones con matrices
 *    description: Realiza varias operaciones con dos matrices proporcionadas.
 *    tags: [Operaciones de Matrices]
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *        required: true
 *        description: "Token de autorización en formato JWT"
 * 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             required:
 *                - Q
 *                - R
 *             properties:
 *                Q:
 *                    type: array
 *                    items:
 *                      type: array
 *                      items:
 *                        type: number
 *                    example: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 *                R:
 *                    type: array
 *                    items:
 *                      type: array
 *                      items:
 *                        type: number
 *                    example: [[10, 11, 12], [13, 14, 15], [16, 17, 18]]
 * 
 *    responses:
 *      200:
 *          description: Operaciones realizadas con éxito.
 *          content:
 *              application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                     OperationsMatrixQ:
 *                        type: object
 *                        properties:
 *                           maxValue:
 *                              type: number
 *                              example: 9
 *                           minValue:
 *                              type: number
 *                              example: 1
 *                           average:
 *                              type: number
 *                              example: 5
 *                           totalSum:
 *                              type: number
 *                              example: 45
 *                           isDiagonal:
 *                              type: boolean
 *                              example: false
 *                     OperationsMatrixR:
 *                        type: object
 *                        properties:
 *                           maxValue:
 *                              type: number
 *                              example: 18
 *                           minValue:
 *                              type: number
 *                              example: 10
 *                           average:
 *                              type: number
 *                              example: 14
 *                           totalSum:
 *                              type: number
 *                              example: 126
 *                           isDiagonal:
 *                              type: boolean
 *                              example: false
 *      400:
 *          description: Error de validación.
 *          content:
 *              application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                     errors:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                             type:
 *                                 type: string
 *                             msg:
 *                                 type: string
 *                             path:
 *                                 type: string
 *                             location:
 *                                 type: string
 *                  example:
 *                     errors:
 *                         - type: field
 *                           msg: "El valor Authorization debe ser un token válido."
 *                           path: Authorization
 *                           location: headers
 *                         - type: field
 *                           msg: "El valor Authorization es requerido"
 *                           path: Authorization
 *                           location: headers
 *      403:
 *          description: Token inválido.
 *
 */
router.post(
  "/matrix_operations",
  validateMatrixRequest,
  validateTokenProvided,
  matrixOperationController
);

export default router;
