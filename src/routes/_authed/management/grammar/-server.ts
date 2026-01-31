import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import jwt from "jsonwebtoken";
import { env } from "@/utils/env";
import { prisma } from "@/utils/prisma";
import { grammarDeckSchema, grammarSchema } from "./-schema";
export const getAllGrammarDecksFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const grammarDecks = await prisma.grammarDeck.findMany({
			where: { deleted_at: null },
		});
		return grammarDecks;
	},
);

export const createGrammarDeckFn = createServerFn({ method: "POST" })
	.inputValidator(grammarDeckSchema.partial({ id: true }))
	.handler(async ({ data }) => {
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
		return await prisma.grammarDeck.create({
			data: { ...data, user_id: payload.userId },
		});
	});

export const updateGrammarDeckFn = createServerFn({ method: "POST" })
	.inputValidator(grammarDeckSchema)
	.handler(async ({ data }) => {
		return await prisma.grammarDeck.update({
			where: { id: data.id },
			data: { ...data },
		});
	});

export const getGrammarDeckById = createServerFn({ method: "GET" })
	.inputValidator(({ id }: { id: string }) => ({ id }))
	.handler(async ({ data: { id } }) => {
		return await prisma.grammarDeck.findFirst({
			where: { id, deleted_at: null },
			include: {
				grammars: {
					where: { deleted_at: null },
				},
			},
		});
	});

export const createGrammarFn = createServerFn({ method: "POST" })
	.inputValidator(grammarSchema.partial({ id: true }))
	.handler(async ({ data }) => {
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
		return await prisma.grammar.create({
			data: { ...data, user_id: payload.userId },
		});
	});
