import * as z from "zod";
export const createCardDeckSchema = z.object({
	title: z.string(),
	exp: z.number(),
	published: z.boolean(),
	activity_id: z.string().optional(),
});
export type CreateCardDeckSchema = z.infer<typeof createCardDeckSchema>;

export const cardDeckParamSchema = z.object({
	id: z.uuidv7(),
});

export const updateCardDeckSchema = z.object({
	title: z.string(),
	exp: z.number(),
	published: z.boolean(),
	activity_id: z.uuidv7().nullable(),
});
export type UpdateCardDeckSchema = z.infer<typeof updateCardDeckSchema>;

export const createCardSchema = z.object({
	front_text: z.string(),
	back_text: z.string(),
	example: z.string(),
	card_deck_id: z.uuidv7(),
});
export type CreateCardSchema = z.infer<typeof createCardSchema>;
export const cardParamSchema = z.object({
	id: z.uuidv7(),
});
export const updateCardSchema = z.object({
	front_text: z.string(),
	back_text: z.string(),
	example: z.string(),
	card_deck_id: z.uuidv7(),
});
export type UpdateCardSchema = z.infer<typeof updateCardSchema>;
