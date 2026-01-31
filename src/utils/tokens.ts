import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "./env";

export interface TokenPayload {
	userId: string;
	email: string;
	role: string;
	type: "access" | "refresh";
}

export interface TokenPair {
	accessToken: string;
	refreshToken: string;
	accessExpiresAt: Date;
	refreshExpiresAt: Date;
}

export function generateAccessToken(
	payload: Omit<TokenPayload, "type">,
): string {
	return jwt.sign({ ...payload, type: "access" }, env.ACCESS_SECRET, {
		expiresIn: "5h",
	});
}

export function generateRefreshToken(
	payload: Omit<TokenPayload, "type">,
): string {
	return jwt.sign({ ...payload, type: "refresh" }, env.REFRESH_SECRET, {
		expiresIn: "14d",
	});
}

export function generateTokens(payload: Omit<TokenPayload, "type">): TokenPair {
	const accessToken = generateAccessToken(payload);
	const refreshToken = generateRefreshToken(payload);

	const accessDecoded = jwt.decode(accessToken) as { exp: number };
	const refreshDecoded = jwt.decode(refreshToken) as { exp: number };

	return {
		accessToken,
		refreshToken,
		accessExpiresAt: new Date(accessDecoded.exp * 1000),
		refreshExpiresAt: new Date(refreshDecoded.exp * 1000),
	};
}

export function verifyAccessToken(token: string): TokenPayload | null {
	try {
		const decoded = jwt.verify(token, env.ACCESS_SECRET) as TokenPayload;
		if (decoded.type !== "access") return null;
		return decoded;
	} catch {
		return null;
	}
}

export function verifyRefreshToken(token: string): TokenPayload | null {
	try {
		const decoded = jwt.verify(token, env.REFRESH_SECRET) as TokenPayload;
		if (decoded.type !== "refresh") return null;
		return decoded;
	} catch {
		return null;
	}
}
