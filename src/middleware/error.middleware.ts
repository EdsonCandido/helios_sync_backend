import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { sendError } from "@/helpers/ApiResponse";
import { AppError } from "@/helpers/AppError";

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
		const issues = error.issues || [];
		const validationErrors = issues.map((err: any) => ({
			field: err.path.join("."),
			message: err.message,
		}));
		return sendError(res, "Erro de validação", 400, null, validationErrors);
	}

	// Fallback for unexpected errors
	return sendError(res, "Internal Server Error", 500, error);
};
