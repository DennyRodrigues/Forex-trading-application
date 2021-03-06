import { Request, Response, NextFunction,  } from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode || 500;

  res.status(statusCode);
  res.json({
    status: "fail",
    message: err.message,
    stack: err.stack,
  });
};

export { errorMiddleware };
