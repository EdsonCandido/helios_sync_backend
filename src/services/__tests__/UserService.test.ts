import bcrypt from "bcryptjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import db from "@/database/connection";
import { AppError } from "@/helpers/AppError";
import { UserService } from "../UserService";

vi.mock("@/database/connection", () => {
	const knexMock = vi.fn() as any;
	knexMock.where = vi.fn().mockReturnThis();
	knexMock.first = vi.fn();
	knexMock.insert = vi.fn().mockReturnThis();
	knexMock.returning = vi.fn();
	knexMock.select = vi.fn().mockReturnThis();
	knexMock.update = vi.fn().mockReturnThis();
	return { default: knexMock };
});

vi.mock("bcryptjs", () => ({
	default: {
		hash: vi.fn(),
		compare: vi.fn(),
	},
}));

describe("UserService", () => {
	let userService: UserService;
	const mockAdminId = "admin-uuid";
	const mockCompanyId = "company-uuid";
	const mockRequester = {
		userId: mockAdminId,
		companyId: mockCompanyId,
		role: "COMPANY_ADMIN" as const,
	};

	beforeEach(() => {
		userService = new UserService();
		vi.clearAllMocks();
	});

	describe("create", () => {
		it("should create a new user successfully", async () => {
			const userData = {
				name: "Test User",
				email: "test@example.com",
				password: "password123",
				companyId: mockCompanyId,
			};

			const mockHashedPassword = "hashed-password";
			vi.mocked(bcrypt.hash).mockResolvedValue(mockHashedPassword as never);

			const mockDbUser = {
				id: "new-user-uuid",
				...userData,
				password: mockHashedPassword,
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
				createdBy: mockAdminId,
				updatedBy: mockAdminId,
			};

			// Mock DB email exists check
			vi.mocked(db).mockReturnValueOnce({
				where: vi.fn().mockReturnThis(),
				first: vi.fn().mockResolvedValueOnce(null),
			} as any);

			// Mock DB insert
			vi.mocked(db).mockReturnValueOnce({
				insert: vi.fn().mockReturnThis(),
				returning: vi.fn().mockResolvedValueOnce([mockDbUser]),
			} as any);

			const result = await userService.create(userData, mockRequester);

			expect(result).not.toHaveProperty("password");
			expect(result.email).toBe(userData.email);
			expect(result.id).toBe(mockDbUser.id);
			expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
		});

		it("should throw error if email already exists", async () => {
			const userData = {
				name: "Test User",
				email: "test@example.com",
				password: "password123",
			};

			vi.mocked(db).mockReturnValueOnce({
				where: vi.fn().mockReturnThis(),
				first: vi.fn().mockResolvedValueOnce({ id: "existing-user-uuid" }),
			} as any);

			await expect(userService.create(userData, mockRequester)).rejects.toThrow(
				new AppError("E-mail já está em uso", 400),
			);
		});
	});

	describe("findAll", () => {
		it("should list all active users of a company", async () => {
			const mockUsers = [
				{ id: "1", name: "User 1", email: "u1@e.com", active: true },
				{ id: "2", name: "User 2", email: "u2@e.com", active: true },
			];

			vi.mocked(db).mockReturnValueOnce({
				where: vi.fn().mockReturnThis(),
				select: vi.fn().mockResolvedValueOnce(mockUsers),
			} as any);

			const result = await userService.findAll(mockCompanyId);

			expect(result).toHaveLength(2);
			expect(result).toEqual(mockUsers);
		});
	});

	describe("findById", () => {
		it("should find a user by id", async () => {
			const mockUser = {
				id: "1",
				name: "User 1",
				email: "u1@e.com",
				active: true,
			};

			vi.mocked(db).mockReturnValueOnce({
				where: vi.fn().mockReturnThis(),
				select: vi.fn().mockReturnThis(),
				first: vi.fn().mockResolvedValueOnce(mockUser),
			} as any);

			const result = await userService.findById("1", mockCompanyId);

			expect(result).toEqual(mockUser);
		});

		it("should throw error if user not found", async () => {
			vi.mocked(db).mockReturnValueOnce({
				where: vi.fn().mockReturnThis(),
				select: vi.fn().mockReturnThis(),
				first: vi.fn().mockResolvedValueOnce(null),
			} as any);

			await expect(
				userService.findById("non-existent", mockCompanyId),
			).rejects.toThrow(new AppError("Usuário não encontrado", 404));
		});
	});
});
