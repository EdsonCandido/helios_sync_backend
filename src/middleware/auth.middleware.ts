import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/helpers/AppError";
import { verifyToken } from "@/helpers/jwt";

export const authMiddleware = async (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return next(new AppError("Token não fornecido", 401));
	}

	const [, token] = authHeader.split(" ");

	if (!token) {
		return next(new AppError("Token malformatado", 401));
	}

	try {
		const decoded = await verifyToken(token);
		req.user = decoded;
		return next();
	} catch (_error) {
		return next(new AppError("Token inválido ou expirado", 401));
	}
};
