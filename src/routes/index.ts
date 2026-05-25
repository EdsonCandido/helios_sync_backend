import { Router } from "express";
import { authRoutes } from "@/routes/auth.routes";
import { companyRoutes } from "@/routes/company.routes";
import { healthRoutes } from "@/routes/health.routes";
import { userRoutes } from "@/routes/user.routes";

const router = Router();

// API V1
const v1Router = Router();
v1Router.use("/auth", authRoutes);
v1Router.use("/health", healthRoutes);
v1Router.use("/users", userRoutes);
v1Router.use("/companies", companyRoutes);

router.use("/api/v1", v1Router);

export default router;
