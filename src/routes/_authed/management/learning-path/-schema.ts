import * as z from "zod";
import { Level } from "@/generated/prisma/enums";

export const learningPathSchema = z.object({
	id: z.uuidv7(),
	description: z.string().nullable(),
	title: z.string(),
	level: z.enum(Level),
});

export type LearningPathInput = z.infer<typeof learningPathSchema>;
export const dailyLessonSchema = z.object({
	title: z.string(),
	content: z.string(),
	sequence: z.number(),
	learning_path_id: z.uuid(),
});
export type DailyLessonInput = z.infer<typeof dailyLessonSchema>;
