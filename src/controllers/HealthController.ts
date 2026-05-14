import type { Request, Response } from "express";
import HealthService from "@/services/HealthService";
import logger from "@/helpers/logger";
import { sendError, sendSuccess } from "@/helpers/ApiResponse";

export class HealthController {
	public async check(_req: Request, res: Response) {
		try {
			await HealthService.getStatus();
			return sendSuccess(res, {}, "OK");
		} catch (error) {
			logger.error(error);
			return sendError(res, "Erro ao verificar status", 500, error as Error);
		}
	}
}

export default new HealthController();
