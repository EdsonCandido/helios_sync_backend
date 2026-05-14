import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable("users", (table) => {
		table.uuid("companyId").nullable(); // Nullable por enquanto ou obrigatório? AGENTS diz que token deve conter.
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable("users", (table) => {
		table.dropColumn("companyId");
	});
}
