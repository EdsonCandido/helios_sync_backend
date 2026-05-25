import { z } from "zod";

export const createUserSchema = z.object({
	name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
	email: z.string().email("E-mail inválido"),
	password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
	companyId: z.string().uuid("ID da empresa inválido"),
	role: z.enum(["SUPER_ADMIN", "COMPANY_ADMIN", "USER"]).optional(),
});

export const updateUserSchema = z.object({
	name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").optional(),
	email: z.string().email("E-mail inválido").optional(),
	password: z
		.string()
		.min(6, "Senha deve ter no mínimo 6 caracteres")
		.optional(),
	active: z.boolean().optional(),
	companyId: z.string().uuid("ID da empresa inválido").optional(),
	role: z.enum(["SUPER_ADMIN", "COMPANY_ADMIN", "USER"]).optional(),
});

export const idParamSchema = z.object({
	id: z.string().uuid("ID inválido"),
});
