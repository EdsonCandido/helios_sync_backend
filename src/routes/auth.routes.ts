import { Router } from "express";
import { AuthController } from "@/controllers/AuthController";
import { validate } from "@/middleware/validate.middleware";
import { loginSchema } from "@/controllers/AuthController";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(
	"/login",
	validate({ body: loginSchema }),
	authController.login,
);

export { authRoutes };
