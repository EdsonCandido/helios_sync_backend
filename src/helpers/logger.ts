import pino from "pino";
import { env } from "@/configs/env";

const logger = pino({
	transport:
		env.NODE_ENV === "development"
			? {
					target: "pino-pretty",
					options: {
						colorize: true,
					},
				}
			: undefined,
});

export default logger;
