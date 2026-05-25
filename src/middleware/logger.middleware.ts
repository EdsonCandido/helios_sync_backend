import pinoHttp from "pino-http";
import { env } from "@/configs/env";

export const loggerMiddleware = pinoHttp({
	transport:
		env.NODE_ENV === "development"
			? {
					target: "pino-pretty",
					options: {
						colorize: true,
					},
				}
			: undefined,
	quietReqLogger: true,
});
