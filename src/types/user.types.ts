export interface User {
	id: string;
	name: string;
	email: string;
	password?: string;
	active: boolean;
	role: "SUPER_ADMIN" | "COMPANY_ADMIN" | "USER";
	companyId: string;
	createdAt: Date;
	updatedAt: Date;
	createdBy?: string;
	updatedBy?: string;
}
