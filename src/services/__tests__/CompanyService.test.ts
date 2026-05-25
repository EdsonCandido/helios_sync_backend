import { beforeEach, describe, expect, it, vi } from "vitest";
import db from "@/database/connection";
import { AppError } from "@/helpers/AppError";
import { CompanyService } from "../CompanyService";

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

describe("CompanyService", () => {
	let companyService: CompanyService;
	const mockSuperAdminId = "super-admin-uuid";
	const mockCompanyAdminId = "company-admin-uuid";
	const mockCompanyId = "company-uuid";
	const mockSuperAdminRequester = {
		userId: mockSuperAdminId,
		companyId: mockCompanyId,
		role: "SUPER_ADMIN" as const,
	};
	const mockCompanyAdminRequester = {
		userId: mockCompanyAdminId,
		companyId: mockCompanyId,
		role: "COMPANY_ADMIN" as const,
	};

	beforeEach(() => {
		companyService = new CompanyService();
		vi.clearAllMocks();
	});

	describe("create", () => {
		it("should create a new company successfully", async () => {
			const companyData = {
				razaoSocial: "Test Company",
				nomeFantasia: "Test",
				cnpj: "12345678901234",
			};

			const mockDbCompany = {
				id: "new-company-uuid",
				...companyData,
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
				createdBy: mockSuperAdminId,
				updatedBy: mockSuperAdminId,
			};

			vi.mocked(db).mockReturnValueOnce({
				where: vi.fn().mockReturnThis(),
				first: vi.fn().mockResolvedValueOnce(null),
			} as any);

			vi.mocked(db).mockReturnValueOnce({
				insert: vi.fn().mockReturnThis(),
				returning: vi.fn().mockResolvedValueOnce([mockDbCompany]),
			} as any);

			const result = await companyService.create(
				companyData,
				mockSuperAdminRequester,
			);

			expect(result.cnpj).toBe(companyData.cnpj);
			expect(result.id).toBe(mockDbCompany.id);
		});

		it("should throw error if user is not SUPER_ADMIN", async () => {
			const companyData = {
				razaoSocial: "Test",
				nomeFantasia: "Test",
				cnpj: "123",
			};
			await expect(
				companyService.create(companyData, mockCompanyAdminRequester),
			).rejects.toThrow(
				new AppError("Apenas SUPER_ADMIN pode criar empresas", 403),
			);
		});
	});
});
