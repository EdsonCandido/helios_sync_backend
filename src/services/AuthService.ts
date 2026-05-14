import bcrypt from "bcryptjs";
import db from "@/database/connection";
import { AppError } from "@/helpers/AppError";
import { generateToken } from "@/helpers/jwt";
import type { User } from "@/types/user.types";

export class AuthService {
	public async login(email: string, password: string): Promise<string> {
		const user = await db<User>("users").where({ email, active: true }).first();

		if (!user || !user.password) {
			throw new AppError("E-mail ou senha inválidos", 401);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new AppError("E-mail ou senha inválidos", 401);
		}

		const token = await generateToken({
			userId: user.id,
			companyId: user.companyId,
		});

		return token;
	}
}
