import express from "express";
import cors from "cors";
import helmet from "helmet";

import { loggerMiddleware } from "@/middleware/logger.middleware";
import routes from "@/routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use("/api/v1", routes);

export default app;
