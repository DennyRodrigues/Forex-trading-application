import { Request, Response, NextFunction } from "express";

const setHeadersMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
};

export { setHeadersMiddleware };
