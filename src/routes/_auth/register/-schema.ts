import { z } from "zod";

export const registerSchema = z.object({
	name: z.string().min(5),
	email: z.email(),
	password: z.string().min(6),
});
