import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

	return knex.schema.createTable("companies", (table) => {
		table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
		table.string("razaoSocial").notNullable();
		table.string("nomeFantasia").notNullable();
		table.string("cnpj").unique().notNullable();
		table.string("responsavel").nullable();
		table.string("telefone").nullable();

		table.boolean("active").notNullable().defaultTo(true);
		table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
		table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
		table.uuid("createdBy").nullable();
		table.uuid("updatedBy").nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("companies");
}
