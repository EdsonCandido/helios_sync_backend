export interface User {
	id: string;
	name: string;
	email: string;
	password?: string;
	active: boolean;
	companyId: string;
	createdAt: Date;
	updatedAt: Date;
	createdBy?: string;
	updatedBy?: string;
}
