import app from "@/app";
import { env } from "@/configs/env";
import logger from "@/helpers/logger";

const PORT = env.PORT;

app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`);
});
