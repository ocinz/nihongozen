import { createServerFn } from "@tanstack/react-start";
import { createCardDeckSchema } from "@/routes/_authed/management/flashcard/-schema";
import { prisma } from "@/utils/prisma";

export const createCardDeckFn = createServerFn({ method: "POST" })
	.inputValidator(createCardDeckSchema)
	.handler(async ({ data }) => {
		const user = await prisma.user.findFirstOrThrow({
			where: {
				email: "admin@admin.com",
			},
		});
		const cardDeck = await prisma.cardDeck.create({
			data: { ...data, user_id: user.id },
		});
		return cardDeck;
	});

export const getCardDecksFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const cardDecks = await prisma.cardDeck.findMany({
			where: { deleted_at: null },
		});
		return cardDecks;
	},
);
