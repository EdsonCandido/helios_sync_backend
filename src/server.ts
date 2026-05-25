import app from "@/app";
import { env } from "@/configs/env";
import logger from "@/helpers/logger";

const PORT = env.PORT;

enum ExitStatus {
	falha = 1,
	sucesso = 0,
}

app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`);

	const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];

	exitSignals.forEach((signal) => {
		process.on(signal, async () => {
			try {
				logger.info("Servidor desligado com sucesso.");
				process.exit(ExitStatus.sucesso);
			} catch (error) {
				logger.error(`Erro ao finalizar o servidor: ${error}`);
				process.exit(ExitStatus.falha);
			}
		});
	});
});
