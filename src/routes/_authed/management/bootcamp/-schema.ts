import * as z from "zod";

export const createBootcampSchema = z.object({
	title: z.string(),
	duration_days: z.number(),
	start_date: z.date(),
	end_date: z.date(),
	description: z.string(),
	price: z.number(),
	published: z.boolean(),
	learning_path_id: z.uuidv7(),
});
export type CreateBootcampSchema = z.infer<typeof createBootcampSchema>;

export const updateBootcampSchema = z.object({
	title: z.string(),
	duration_days: z.number(),
	start_date: z.date(),
	end_date: z.date(),
	description: z.string(),
	price: z.number(),
	published: z.boolean(),
	learning_path_id: z.uuidv7(),
});
export type UpdateBootcampSchema = z.infer<typeof updateBootcampSchema>;
export const bootcampParamSchema = z.object({
	id: z.uuidv7(),
});
