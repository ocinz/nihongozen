import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
	const router = createRouter({
		routeTree,
		context: {
			user: null,
		} as {
			user: {
				id: string;
				email: string;
				name: string | null;
				role: string;
				exp: number;
				active: boolean;
			} | null;
		},

		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
	});

	return router;
};
