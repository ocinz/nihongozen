import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import jwt from "jsonwebtoken";
import {
	dailyLessonSchema,
	learningPathSchema,
} from "@/routes/_authed/management/learning-path/-schema";
import { env } from "@/utils/env";
import { prisma } from "@/utils/prisma";

export const createLearningPathFn = createServerFn({ method: "POST" })
	.inputValidator(learningPathSchema.partial({ id: true }))
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
		const user = await prisma.user.findFirstOrThrow({
			where: { id: payload.userId },
			select: {
				id: true,
			},
		});

		if (!user) return null;

		await prisma.learningPath.create({
			data: { ...data, creator_id: user.id },
		});
	});
export const updateLearningPathFn = createServerFn({ method: "POST" })
	.inputValidator(learningPathSchema)
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

		const user = await prisma.user.findFirstOrThrow({
			where: { id: payload.userId },
			select: {
				id: true,
			},
		});

		if (!user) return null;

		await prisma.learningPath.update({
			where: { id: data.id, deleted_at: null },
			data: { ...data, creator_id: user.id },
		});
	});

export const getLearningPathsFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const learningPaths = await prisma.learningPath.findMany({
			where: { deleted_at: null },
		});
		return learningPaths;
	},
);
export const getLearningPathByIdFn = createServerFn({ method: "GET" })
	.inputValidator(({ id }: { id: string }) => ({ id }))
	.handler(async ({ data }) => {
		const learningPath = await prisma.learningPath.findFirst({
			where: { deleted_at: null, id: data.id },
			include: {
				daily_lessons: {
					include: {
						activity: {
							select: {
								card_deck: {
									select: {
										id: true,
										title: true,
									},
								},
								grammar_deck: {
									select: {
										id: true,
										title: true,
									},
								},
								tryout: {
									select: {
										id: true,
										title: true,
									},
								},
								quiz: {
									select: {
										id: true,
										title: true,
									},
								},
							},
						},
					},
				},
			},
		});
		return learningPath;
	});

export const createDailyActivityFn = createServerFn({ method: "POST" })
	.inputValidator(dailyLessonSchema)
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
		const dailyLesson = await prisma.dailyLesson.create({
			data: { ...data, user_id: payload.userId },
		});
		return dailyLesson;
	});

export const deleteLearningPathFn = createServerFn({ method: "POST" })
	.inputValidator(({ id }: { id: string }) => ({ id }))
	.handler(async ({ data }) => {
		await prisma.learningPath.update({
			where: { deleted_at: null, id: data.id },
			data: { deleted_at: new Date() },
		});
	});
