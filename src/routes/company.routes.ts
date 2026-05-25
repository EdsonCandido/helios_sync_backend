import { Router } from "express";
import { CompanyController } from "@/controllers/CompanyController";
import { authMiddleware } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";
import {
	createCompanySchema,
	idCompanyParamSchema,
	updateCompanySchema,
} from "@/types/company.schemas";

const companyRoutes = Router();
const companyController = new CompanyController();

companyRoutes.use(authMiddleware);

companyRoutes.post(
	"/",
	validate({ body: createCompanySchema }),
	companyController.create.bind(companyController),
);

companyRoutes.get("/", companyController.findAll.bind(companyController));

companyRoutes.get(
	"/:id",
	validate({ params: idCompanyParamSchema }),
	companyController.findById.bind(companyController),
);

companyRoutes.put(
	"/:id",
	validate({ params: idCompanyParamSchema, body: updateCompanySchema }),
	companyController.update.bind(companyController),
);

companyRoutes.delete(
	"/:id",
	validate({ params: idCompanyParamSchema }),
	companyController.delete.bind(companyController),
);

export { companyRoutes };
