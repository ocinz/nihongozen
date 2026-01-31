// server/auth.ts

import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { loginSchema } from "@/routes/_auth/login/-schema";
import { env } from "@/utils/env";
import { prisma } from "@/utils/prisma";
import { generateTokens } from "@/utils/tokens";

const registerSchema = z.object({
	name: z.string().min(5),
	email: z.string().min(5),
	password: z.string().min(6),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export const registerFn = createServerFn({ method: "POST" })
	.inputValidator(registerSchema)
	.handler(async ({ data }) => {
		const { email, password, name } = data as RegisterInput;

		const existingUser = await prisma.user.findFirst({ where: { email } });
		if (existingUser) {
			return Response.json({ error: "User already exists" }, { status: 400 });
		}
		const hashedPassword = await bcrypt.hash(password, 12);

		await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
				exp: 0,
				activation_token: "",
				active: true,
			},
		});

		throw redirect({ to: "/login" });
	});

export const loginFn = createServerFn({ method: "POST" })
	.inputValidator(loginSchema)
	.handler(async ({ data: { email, password } }) => {
		const user = await prisma.user.findFirst({
			where: { email },
		});
		if (!user) {
			return Response.json({ error: "Invalid credentials" }, { status: 401 });
		}

		const isCorrect = await bcrypt.compare(password, user.password);
		if (!isCorrect) {
			return Response.json({ error: "Invalid credentials" }, { status: 401 });
		}

		if (!user.active) {
			return Response.json({ error: "Account is inactive" }, { status: 401 });
		}

		const tokens = generateTokens({
			userId: user.id,
			email: user.email,
			role: user.role,
		});
		await prisma.refreshToken.create({
			data: {
				token: tokens.refreshToken,
				user_id: user.id,
				expires_at: tokens.refreshExpiresAt,
			},
		});

		setCookie("access_token", tokens.accessToken, {
			expires: tokens.accessExpiresAt,
		});
		setCookie("refresh_token", tokens.refreshToken, {
			expires: tokens.refreshExpiresAt,
		});
		return;
		// redirect({ to: "/dashboard" });
	});

export const refreshTokenFn = createServerFn({ method: "POST" }).handler(
	async () => {
		return Response.json(
			{ error: "Token refresh requires request context" },
			{ status: 401 },
		);
	},
);

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
	setCookie("access_token", "", { expires: new Date(0) });
	setCookie("refresh_token", "", { expires: new Date(0) });
	return redirect({ to: "/" });
});

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const accessToken = getCookie("access_token");
		if (!accessToken) {
			setCookie("access_token", "", { expires: new Date(0) });
			setCookie("refresh_token", "", { expires: new Date(0) });
			throw redirect({ to: "/login" });
		}

		const payload = jwt.verify(accessToken, env.ACCESS_SECRET) as {
			userId: string;
			email: string;
			role: string;
			type: string;
		};
		if (!payload) {
			setCookie("access_token", "", { expires: new Date(0) });
			setCookie("refresh_token", "", { expires: new Date(0) });
			throw redirect({ to: "/login" });
		}
		const user = await prisma.user.findFirstOrThrow({
			where: { id: payload.userId },
			select: {
				id: true,
				email: true,
				role: true,
				on_tryout: true,
				exp: true,
				active: true,
				name: true,
			},
		});

		if (!user) return null;

		return { user: user };
	},
);
