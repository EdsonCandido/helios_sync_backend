import type { Request, Response } from "express";
import { sendSuccess } from "@/helpers/ApiResponse";
import { UserService } from "@/services/UserService";

const userService = new UserService();

export class UserController {
	public async create(req: Request, res: Response): Promise<void> {
		if (!req.user) {
			throw new Error("User not authenticated");
		}
		const user = req.user;
		const createdUser = await userService.create(req.body, user);
		sendSuccess(res, createdUser, "Usuário criado com sucesso", 201);
	}

	public async findAll(req: Request, res: Response): Promise<void> {
		if (!req.user) {
			throw new Error("User not authenticated");
		}
		const companyId = req.user.companyId;
		const users = await userService.findAll(companyId);
		sendSuccess(res, users, "Usuários listados com sucesso");
	}

	public async findById(req: Request, res: Response): Promise<void> {
		if (!req.user) {
			throw new Error("User not authenticated");
		}
		const companyId = req.user.companyId;
		const { id } = req.params;
		const user = await userService.findById(id as string, companyId);
		sendSuccess(res, user, "Usuário encontrado com sucesso");
	}

	public async update(req: Request, res: Response): Promise<void> {
		if (!req.user) {
			throw new Error("User not authenticated");
		}
		const adminId = req.user.userId;
		const companyId = req.user.companyId;
		const { id } = req.params;
		const user = await userService.update(id as string, req.body, adminId, companyId);
		sendSuccess(res, user, "Usuário atualizado com sucesso");
	}

	public async delete(req: Request, res: Response): Promise<void> {
		if (!req.user) {
			throw new Error("User not authenticated");
		}
		const adminId = req.user.userId;
		const companyId = req.user.companyId;
		const { id } = req.params;
		await userService.delete(id as string, adminId, companyId);
		sendSuccess(res, null, "Usuário removido com sucesso");
	}
}
