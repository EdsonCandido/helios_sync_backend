import type { Response } from "express";

export const sendSuccess = <T>(
	res: Response,
	data: T = {} as T,
	message = "Operação realizada com sucesso",
	statusCode = 200,
) => {
	return res.status(statusCode).json({
		success: true,
		data,
		message,
	});
};

export const sendError = (
	res: Response,
	message: string,
	statusCode = 500,
	error: Error | null = null,
	details: any = null,
) => {
	return res.status(statusCode).json({
		success: false,
		message,
		...(details ? { details } : {}),
		...(process.env.NODE_ENV !== "production" && error
			? { stack: error.stack }
			: {}),
	});
};
