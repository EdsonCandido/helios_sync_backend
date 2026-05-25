import db from "@/database/connection";
import { AppError } from "@/helpers/AppError";
import type { TokenPayload } from "@/helpers/jwt";
import type { Company } from "@/types/company.types";

export class CompanyService {
	public async create(
		data: Partial<Company>,
		requester: TokenPayload,
	): Promise<Company> {
		if (requester.role !== "SUPER_ADMIN") {
			throw new AppError("Apenas SUPER_ADMIN pode criar empresas", 403);
		}

		const cnpjExists = await db<Company>("companies")
			.where({ cnpj: data.cnpj })
			.first();
		if (cnpjExists) {
			throw new AppError("CNPJ já cadastrado", 400);
		}

		const companyData = {
			...data,
			createdBy: requester.userId,
			updatedBy: requester.userId,
		};

		const [company] = await db<Company>("companies")
			.insert(companyData)
			.returning("*");
		return company;
	}

	public async findAll(requester: TokenPayload): Promise<Company[]> {
		if (requester.role !== "SUPER_ADMIN") {
			throw new AppError(
				"Apenas SUPER_ADMIN pode listar todas as empresas",
				403,
			);
		}

		return db<Company>("companies").where({ active: true });
	}

	public async findById(id: string, requester: TokenPayload): Promise<Company> {
		if (requester.role !== "SUPER_ADMIN" && requester.companyId !== id) {
			throw new AppError("Sem permissão para acessar esta empresa", 403);
		}

		const company = await db<Company>("companies")
			.where({ id, active: true })
			.first();
		if (!company) {
			throw new AppError("Empresa não encontrada", 404);
		}

		return company;
	}

	public async update(
		id: string,
		data: Partial<Company>,
		requester: TokenPayload,
	): Promise<Company> {
		if (
			requester.role !== "SUPER_ADMIN" &&
			requester.role !== "COMPANY_ADMIN"
		) {
			throw new AppError("Usuário sem permissão para atualizar empresa", 403);
		}

		if (requester.role === "COMPANY_ADMIN" && requester.companyId !== id) {
			throw new AppError("Sem permissão para atualizar esta empresa", 403);
		}

		const companyExists = await db<Company>("companies")
			.where({ id, active: true })
			.first();
		if (!companyExists) {
			throw new AppError("Empresa não encontrada", 404);
		}

		if (data.cnpj && data.cnpj !== companyExists.cnpj) {
			const cnpjExists = await db<Company>("companies")
				.where({ cnpj: data.cnpj })
				.first();
			if (cnpjExists) {
				throw new AppError("CNPJ já cadastrado", 400);
			}
		}

		const updateData: Partial<Company> = {
			...data,
			updatedBy: requester.userId,
			updatedAt: new Date(),
		};

		const [updatedCompany] = await db<Company>("companies")
			.where({ id })
			.update(updateData)
			.returning("*");
		return updatedCompany;
	}

	public async delete(id: string, requester: TokenPayload): Promise<void> {
		if (requester.role !== "SUPER_ADMIN") {
			throw new AppError("Apenas SUPER_ADMIN pode remover empresas", 403);
		}

		const companyExists = await db<Company>("companies")
			.where({ id, active: true })
			.first();
		if (!companyExists) {
			throw new AppError("Empresa não encontrada", 404);
		}

		await db<Company>("companies").where({ id }).update({
			active: false,
			updatedBy: requester.userId,
			updatedAt: new Date(),
		});
	}
}
