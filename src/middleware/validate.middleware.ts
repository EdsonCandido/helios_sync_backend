import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject, ZodEffects } from "zod";

interface ValidationSchemas {
	body?: AnyZodObject | ZodEffects<AnyZodObject>;
	params?: AnyZodObject | ZodEffects<AnyZodObject>;
	query?: AnyZodObject | ZodEffects<AnyZodObject>;
}

export const validate = (schemas: ValidationSchemas) => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		try {
			if (schemas.body) {
				req.body = await schemas.body.parseAsync(req.body);
			}
			if (schemas.params) {
				req.params = await schemas.params.parseAsync(req.params);
			}
			if (schemas.query) {
				req.query = await schemas.query.parseAsync(req.query);
			}
			return next();
		} catch (error) {
			return next(error);
		}
	};
};
