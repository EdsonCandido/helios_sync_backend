export interface Company {
	id: string;
	razaoSocial: string;
	nomeFantasia: string;
	cnpj: string;
	responsavel?: string;
	telefone?: string;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
	createdBy?: string;
	updatedBy?: string;
}
