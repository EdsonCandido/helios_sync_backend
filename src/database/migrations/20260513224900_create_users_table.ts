import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	// Garante que o pgcrypto esteja disponível para o gen_random_uuid()
	await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

	return knex.schema.createTable("users", (table) => {
		table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
		table.string("name").notNullable();
		table.string("email").unique().notNullable();
		table.string("password").notNullable();
		table.boolean("active").notNullable().defaultTo(true);
		table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
		table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
		table.uuid("createdBy").nullable();
		table.uuid("updatedBy").nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("users");
}
