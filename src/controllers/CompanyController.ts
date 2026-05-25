import type { Request, Response } from "express";
import { sendSuccess } from "@/helpers/ApiResponse";
import { CompanyService } from "@/services/CompanyService";

const companyService = new CompanyService();

export class CompanyController {
	public async create(req: Request, res: Response): Promise<void> {
		if (!req.user) {
			throw new Error("User not authenticated");
		}
		const user = req.user;
		const company = await companyService.create(req.body, user);
		sendSuccess(res, company, "Empresa criada com sucesso", 201);
	}

	public async findAll(req: Request, res: Response): Promise<void> {
		if (!req.user) {
			throw new Error("User not authenticated");
		}
		const user = req.user;
		const companies = await companyService.findAll(user);
		sendSuccess(res, companies, "Empresas listadas com sucesso");
	}

	public async findById(req: Request, res: Response): Promise<void> {
		if (!req.user) {
			throw new Error("User not authenticated");
		}
		const user = req.user;
		const { id } = req.params;
		const company = await companyService.findById(id as string, user);
		sendSuccess(res, company, "Empresa encontrada com sucesso");
	}

	public async update(req: Request, res: Response): Promise<void> {
		if (!req.user) {
			throw new Error("User not authenticated");
		}
		const user = req.user;
		const { id } = req.params;
		const company = await companyService.update(id as string, req.body, user);
		sendSuccess(res, company, "Empresa atualizada com sucesso");
	}

	public async delete(req: Request, res: Response): Promise<void> {
		if (!req.user) {
			throw new Error("User not authenticated");
		}
		const user = req.user;
		const { id } = req.params;
		await companyService.delete(id as string, user);
		sendSuccess(res, null, "Empresa removida com sucesso");
	}
}
