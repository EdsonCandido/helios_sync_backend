import bcrypt from "bcryptjs";
import db from "@/database/connection";
import { AppError } from "@/helpers/AppError";
import type { TokenPayload } from "@/helpers/jwt";
import type { User } from "@/types/user.types";

export class UserService {
	public async create(
		data: Partial<User>,
		requester: TokenPayload,
	): Promise<Omit<User, "password">> {
		if (requester.role === "USER") {
			throw new AppError("Usuário sem permissão para cadastrar", 403);
		}

		if (requester.role === "COMPANY_ADMIN") {
			data.companyId = requester.companyId;
			if (data.role && data.role === "SUPER_ADMIN") {
				throw new AppError("Admin de empresa não pode criar super admin", 403);
			}
		}
		const emailExists = await db<User>("users")
			.where({ email: data.email })
			.first();
		if (emailExists) {
			throw new AppError("E-mail já está em uso", 400);
		}

		const hashedPassword = data.password
			? await bcrypt.hash(data.password, 10)
			: undefined;
		if (!hashedPassword) {
			throw new AppError("Senha é obrigatória", 400);
		}

		const userData = {
			...data,
			companyId: data.companyId,
			role: data.role || "USER",
			password: hashedPassword,
			createdBy: requester.userId,
			updatedBy: requester.userId,
		};

		const [user] = await db<User>("users").insert(userData).returning("*");

		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}

	public async findAll(companyId: string): Promise<Omit<User, "password">[]> {
		const users = await db<User>("users")
			.where({ active: true, companyId })
			.select(
				"id",
				"name",
				"email",
				"role",
				"active",
				"companyId",
				"createdAt",
				"updatedAt",
				"createdBy",
				"updatedBy",
			);
		return users;
	}

	public async findById(
		id: string,
		companyId: string,
	): Promise<Omit<User, "password">> {
		const user = await db<User>("users")
			.where({ id, active: true, companyId })
			.select(
				"id",
				"name",
				"email",
				"role",
				"active",
				"companyId",
				"createdAt",
				"updatedAt",
				"createdBy",
				"updatedBy",
			)
			.first();

		if (!user) {
			throw new AppError("Usuário não encontrado", 404);
		}

		return user;
	}

	public async update(
		id: string,
		data: Partial<User>,
		adminId: string,
		companyId: string,
	): Promise<Omit<User, "password">> {
		const userExists = await db<User>("users")
			.where({ id, active: true, companyId })
			.first();
		if (!userExists) {
			throw new AppError("Usuário não encontrado", 404);
		}

		if (data.email && data.email !== userExists.email) {
			const emailExists = await db<User>("users")
				.where({ email: data.email })
				.first();
			if (emailExists) {
				throw new AppError("E-mail já está em uso", 400);
			}
		}

		const updateData: Partial<User> = {
			...data,
			updatedBy: adminId,
			updatedAt: new Date(),
		};

		if (data.password) {
			updateData.password = await bcrypt.hash(data.password, 10);
		}

		const [updatedUser] = await db<User>("users")
			.where({ id })
			.update(updateData)
			.returning([
				"id",
				"name",
				"email",
				"role",
				"active",
				"companyId",
				"createdAt",
				"updatedAt",
				"createdBy",
				"updatedBy",
			]);

		return updatedUser;
	}

	public async delete(
		id: string,
		adminId: string,
		companyId: string,
	): Promise<void> {
		const userExists = await db<User>("users")
			.where({ id, active: true, companyId })
			.first();
		if (!userExists) {
			throw new AppError("Usuário não encontrado", 404);
		}

		await db<User>("users").where({ id }).update({
			active: false,
			updatedBy: adminId,
			updatedAt: new Date(),
		});
	}
}
