import * as z from "zod";

export const ParamsSchema = z.object({
	id: z.string().min(3),
});

export const UserSchema = z.object({
	id: z.string(),
	name: z.string(),
	age: z.number(),
});

export const grammarDeckSchema = z.object({
	id: z.uuidv7(),
	title: z.string(),
	exp: z.number(),
});

export const grammarSchema = z.object({
	id: z.uuidv7(),
	title: z.string(),
	content: z.string(),
	front_text: z.string(),
	back_text: z.string(),
	example: z.string(),
	grammar_deck_id: z.string(),
});
export type GrammarDeckInput = z.infer<typeof grammarDeckSchema>;
export type GrammarInput = z.infer<typeof grammarSchema>;
