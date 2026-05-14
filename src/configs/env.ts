import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

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
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error("❌ Invalid environment variables:", _env.error.format());
	process.exit(1);
}

export const env = _env.data;
