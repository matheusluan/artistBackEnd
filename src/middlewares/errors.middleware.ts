import { NextFunction, Request, Response } from "express";
import { AppError } from "../handlers/errors.handler";

export async function handleAsyncErrors(error: any, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return response.status(error.status).json({ message: error.message });
  }

  console.log(error);

  return response.status(500).json({ message: "Erro interno no servidor, tente novamente!" });
}
