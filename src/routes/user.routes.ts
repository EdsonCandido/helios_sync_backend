import { Router } from "express";
import { UserController } from "@/controllers/UserController";
import { authMiddleware } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";
import {
	createUserSchema,
	idParamSchema,
	updateUserSchema,
} from "@/types/user.schemas";

const userRoutes = Router();
const userController = new UserController();

userRoutes.use(authMiddleware);

userRoutes.post(
	"/",
	validate({ body: createUserSchema }),
	userController.create.bind(userController),
);

userRoutes.get("/", userController.findAll.bind(userController));

userRoutes.get(
	"/:id",
	validate({ params: idParamSchema }),
	userController.findById.bind(userController),
);

userRoutes.put(
	"/:id",
	validate({ params: idParamSchema, body: updateUserSchema }),
	userController.update.bind(userController),
);

userRoutes.delete(
	"/:id",
	validate({ params: idParamSchema }),
	userController.delete.bind(userController),
);

export { userRoutes };
