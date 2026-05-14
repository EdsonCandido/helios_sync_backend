import { Router } from "express";
import { authRoutes } from "@/routes/auth.routes";
import { healthRoutes } from "@/routes/health.routes";

const router = Router();

// API V1
const v1Router = Router();
v1Router.use("/auth", authRoutes);
v1Router.use("/health", healthRoutes);

router.use("/api/v1", v1Router);

export default router;
