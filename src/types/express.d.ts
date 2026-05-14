import type { TokenPayload } from "@/helpers/jwt";

declare global {
	namespace Express {
		interface Request {
			user?: TokenPayload;
		}
	}
}
