import { NextFunction, Request, Response } from "express";

//page not found handler
function pageNotFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`${req.originalUrl} page not found!`);
  res.status(404);
  next(error.message);
}

//error handler
function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.send(error.message);
}

export { pageNotFound, errorHandler };
