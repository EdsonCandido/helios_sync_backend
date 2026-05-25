import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errorMiddleware } from "@/middleware/error.middleware";
import { loggerMiddleware } from "@/middleware/logger.middleware";
import routes from "@/routes";

const app = express();

function shouldCompress(req: express.Request, res: express.Response): boolean {
	if (req.headers["x-no-compression"]) {
		return false;
	}
	return compression.filter(req, res);
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(
	compression({
		filter: shouldCompress,
		threshold: 1024,
		chunkSize: 16384,
	}),
);

app.use("/", routes);
app.use(errorMiddleware);

export default app;
