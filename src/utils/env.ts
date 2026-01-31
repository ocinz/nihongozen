export const env = {
	ACCESS_SECRET: (() => {
		if (!process.env.ACCESS_SECRET) {
			throw new Error("ACCESS_SECRET is missing");
		}
		return process.env.ACCESS_SECRET;
	})(),
	REFRESH_SECRET: (() => {
		if (!process.env.REFRESH_SECRET) {
			throw new Error("REFRESH_SECRET is missing");
		}
		return process.env.REFRESH_SECRET;
	})(),
	APP_NAME: (() => {
		if (!process.env.APP_NAME) {
			throw new Error("APP_NAME is missing");
		}
		return process.env.APP_NAME;
	})(),
	DATABASE_URL: (() => {
		if (!process.env.DATABASE_URL) {
			throw new Error("DATABASE_URL is missing");
		}
		return process.env.DATABASE_URL;
	})(),
	// WHITELIST: (() => {
	//   if (!process.env.WHITELIST) {
	//     throw new Error("WHITELIST is missing");
	//   }
	//   return process.env.WHITELIST;
	// })(),
};
