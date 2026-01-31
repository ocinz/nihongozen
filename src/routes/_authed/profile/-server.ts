import { createServerFn } from "@tanstack/react-start";
import bcrypt from "bcryptjs";
import { prisma } from "@/utils/prisma";

export const getUserById = createServerFn({ method: "GET" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data: { id } }) => {
		return await prisma.user.findFirst({
			where: { id: id },
		});
	});

export const authenticateUser = createServerFn({ method: "POST" })
	.inputValidator((data: { email: string; password: string }) => data)
	.handler(async ({ data: { email, password } }) => {
		const user = await prisma.user.findFirst({
			where: { email },
		});
		if (!user) return null;
		const isCorrect = await bcrypt.compare(password, user.password);

		if (isCorrect) return user;
		return null;
	});
