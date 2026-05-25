import { Router } from "express";
import { AuthController, loginSchema } from "@/controllers/AuthController";
import { validate } from "@/middleware/validate.middleware";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(
	"/login",
	validate({ body: loginSchema }),
	authController.login,
);

export { authRoutes };
