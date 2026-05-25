import { z } from "zod";

export const createCompanySchema = z.object({
	razaoSocial: z
		.string()
		.min(3, "Razão Social deve ter no mínimo 3 caracteres"),
	nomeFantasia: z
		.string()
		.min(3, "Nome Fantasia deve ter no mínimo 3 caracteres"),
	cnpj: z.string().min(14, "CNPJ inválido"),
	responsavel: z.string().optional(),
	telefone: z.string().optional(),
});

export const updateCompanySchema = z.object({
	razaoSocial: z
		.string()
		.min(3, "Razão Social deve ter no mínimo 3 caracteres")
		.optional(),
	nomeFantasia: z
		.string()
		.min(3, "Nome Fantasia deve ter no mínimo 3 caracteres")
		.optional(),
	cnpj: z.string().min(14, "CNPJ inválido").optional(),
	responsavel: z.string().optional(),
	telefone: z.string().optional(),
	active: z.boolean().optional(),
});

export const idCompanyParamSchema = z.object({
	id: z.string().uuid("ID inválido"),
});
