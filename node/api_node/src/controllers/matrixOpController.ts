import { Request, Response } from "express";
import { Matrix } from "../utils/Matrix";

export const matrixOperationController = (req: Request, res: Response) => {
  const { Q, R } = req.body;

  const matQ = new Matrix(Q);
  const matR = new Matrix(R);

  const OperationsMatrixQ = {
    maxValue: matQ.getMax(),
    minValue: matQ.getMin(),
    average: matQ.getAverage(),
    totalSum: matQ.getSum(),
    isDiagonal: matQ.isDiagonal(),
  };

  const OperationsMatrixR = {
    maxValue: matR.getMax(),
    minValue: matR.getMin(),
    average: matR.getAverage(),
    totalSum: matR.getSum(),
    isDiagonal: matR.isDiagonal(),
  };

  res.json({
    OperationsMatrixQ,
    OperationsMatrixR,
  });
};
