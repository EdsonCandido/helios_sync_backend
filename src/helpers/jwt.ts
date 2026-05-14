import { env } from "@/configs/env";
import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(env.JWT_SECRET);

export interface TokenPayload {
	userId: string;
	companyId: string;
}

export const generateToken = async (payload: TokenPayload): Promise<string> => {
	return await new SignJWT({ ...payload })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("2h")
		.sign(secret);
};

export const verifyToken = async (token: string): Promise<TokenPayload> => {
	const { payload } = await jwtVerify(token, secret);
	return payload as unknown as TokenPayload;
};
