import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "@/helpers/AppError";
import { sendError } from "@/helpers/ApiResponse";

export const errorMiddleware = (
	error: Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	if (error instanceof AppError) {
		return sendError(res, error.message, error.statusCode);
	}

	if (error instanceof ZodError) {
		return sendError(res, "Erro de validação", 400, error);
	}

	// Fallback for unexpected errors
	return sendError(res, "Internal Server Error", 500, error);
};
