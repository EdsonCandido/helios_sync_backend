import type { Request, Response } from "express";
import { z } from "zod";
import { sendSuccess } from "@/helpers/ApiResponse";
import { AuthService } from "@/services/AuthService";

export const loginSchema = z.object({
	login: z.string().email("E-mail inválido"),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export class AuthController {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	public login = async (req: Request, res: Response) => {
		const { login, password } = req.body;

		const { token, user, company } = await this.authService.login(
			login,
			password,
		);

		return sendSuccess(
			res,
			{ token, user, company },
			"Login realizado com sucesso",
		);
	};
}
