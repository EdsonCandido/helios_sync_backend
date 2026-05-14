import type { Knex } from "knex";
import path from "node:path";
import { env } from "../configs/env";

const config: { [key: string]: Knex.Config } = {
	development: {
		client: "pg",
		connection: env.DATABASE_URL,
		migrations: {
			directory: path.join(__dirname, "migrations"),
			extension: "ts",
		},
		seeds: {
			directory: path.join(__dirname, "seeds"),
			extension: "ts",
		},
	},
	production: {
		client: "pg",
		connection: env.DATABASE_URL,
		migrations: {
			directory: path.join(__dirname, "migrations"),
			extension: "ts",
		},
		seeds: {
			directory: path.join(__dirname, "seeds"),
			extension: "ts",
		},
	},
};

export default config;
