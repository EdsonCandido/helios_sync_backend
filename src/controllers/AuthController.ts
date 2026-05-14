import type { Request, Response } from "express";
import { z } from "zod";
import { sendSuccess } from "@/helpers/ApiResponse";
import { AuthService } from "@/services/AuthService";

export const loginSchema = z.object({
	email: z.string().email("E-mail inválido"),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export class AuthController {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	public login = async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const token = await this.authService.login(email, password);

		return sendSuccess(res, { token }, "Login realizado com sucesso");
	};
}
