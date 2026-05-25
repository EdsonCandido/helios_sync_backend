import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

interface ValidationSchemas {
	body?: ZodSchema;
	params?: ZodSchema;
	query?: ZodSchema;
}

export const validate = (schemas: ValidationSchemas) => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		try {
			if (schemas.body) {
				req.body = await schemas.body.parseAsync(req.body);
			}
			if (schemas.params) {
				req.params = await schemas.params.parseAsync(req.params) as any;
			}
			if (schemas.query) {
				req.query = await schemas.query.parseAsync(req.query) as any;
			}
			return next();
		} catch (error) {
			return next(error);
		}
	};
};
