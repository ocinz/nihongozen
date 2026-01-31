// utils/auth.ts
export const roles = {
	USER: "user",
	ADMIN: "admin",
	MODERATOR: "moderator",
} as const;

type Role = (typeof roles)[keyof typeof roles];

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
	const hierarchy = {
		[roles.USER]: 0,
		[roles.MODERATOR]: 1,
		[roles.ADMIN]: 2,
	};

	return hierarchy[userRole] >= hierarchy[requiredRole];
}

// Protected route with role check
// export const Route = createFileRoute("/_authed/admin/")({
// 	beforeLoad: async ({ context }) => {
// 		if (!hasPermission(context.user.role, roles.ADMIN)) {
// 			throw redirect({ to: "/unauthorized" });
// 		}
// 	},
// });
