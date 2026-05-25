import bcrypt from "bcryptjs";
import type { Knex } from "knex";
import { env } from "@/configs/env";

export async function seed(knex: Knex): Promise<void> {
	// 1. Create company if not exists
	const existingCompany = await knex("companies")
		.where({ cnpj: env.DEFAULT_COMPANY_DOCUMENT })
		.first();

	let companyId: string;

	if (!existingCompany) {
		const [company] = await knex("companies")
			.insert({
				razaoSocial: env.DEFAULT_COMPANY_NAME,
				nomeFantasia: env.DEFAULT_COMPANY_NAME,
				cnpj: env.DEFAULT_COMPANY_DOCUMENT,
				active: true,
			})
			.returning("id");
		companyId = company.id;
	} else {
		companyId = existingCompany.id;
	}

	// 2. Create user if not exists
	const existingUser = await knex("users")
		.where({ email: env.DEFAULT_USER_EMAIL })
		.first();

	if (!existingUser) {
		const hashedPassword = await bcrypt.hash(env.DEFAULT_USER_PASSWORD, 10);
		await knex("users").insert({
			name: env.DEFAULT_USER_NAME,
			email: env.DEFAULT_USER_EMAIL,
			role: "SUPER_ADMIN",
			password: hashedPassword,
			companyId: companyId,
			active: true,
		});
	}
}
