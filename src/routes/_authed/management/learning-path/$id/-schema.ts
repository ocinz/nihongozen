import * as z from "zod";

export const addActivitySchema = z.object({
	sequence: z.number(),
	grammar_deck: z.uuidv7().nullable(),
	card_deck: z.uuidv7().nullable(),
	tryout: z.uuidv7().nullable(),
	quiz: z.uuidv7().nullable(),
	id: z.uuidv7().nullable(),
});

export const createDailyLessonSchema = z.object({
	title: z.string(),
	content: z.string().nullable(),
	sequence: z.number(),
	activity: z.array(addActivitySchema),
});
export const dailyLessonArraySchema = z.array(createDailyLessonSchema);
