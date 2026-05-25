import path from "node:path";
import { loadEnvFile } from "node:process";
import { z } from "zod";

try {
	loadEnvFile(path.resolve(__dirname, "../../.env"));
} catch {
	// Fallback se já estiver carregado ou se rodar a partir do root e não achar
	try {
		loadEnvFile(".env");
	} catch {
		// ignora
	}
}

const envSchema = z.object({
	// biome-ignore lint/style/useNamingConvention: Env variables
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	// biome-ignore lint/style/useNamingConvention: Env variables
	PORT: z.string().transform(Number).default(3333),
	// biome-ignore lint/style/useNamingConvention: Env variables
	JWT_SECRET: z.string().min(32),
	// biome-ignore lint/style/useNamingConvention: Env variables
	DATABASE_URL: z.string().url().optional(),
	// biome-ignore lint/style/useNamingConvention: Env variables
	DEFAULT_COMPANY_NAME: z.string(),
	// biome-ignore lint/style/useNamingConvention: Env variables
	DEFAULT_COMPANY_DOCUMENT: z.string(),
	// biome-ignore lint/style/useNamingConvention: Env variables
	DEFAULT_USER_NAME: z.string(),
	// biome-ignore lint/style/useNamingConvention: Env variables
	DEFAULT_USER_EMAIL: z.string().email(),
	// biome-ignore lint/style/useNamingConvention: Env variables
	DEFAULT_USER_PASSWORD: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error("❌ Invalid environment variables:", _env.error.format());
	process.exit(1);
}

export const env = _env.data;
