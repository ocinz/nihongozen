import { redirect } from "@tanstack/react-router";

export const roles = {
	USER: "user",
	ADMIN: "admin",
	MODERATOR: "moderator",
	MASTER: "master",
} as const;

type Role = (typeof roles)[keyof typeof roles];

export type { Role };

const ROLE_HIERARCHY: Record<Role, number> = {
	[roles.USER]: 1,
	[roles.MODERATOR]: 2,
	[roles.ADMIN]: 3,
	[roles.MASTER]: 4,
};

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
	return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function requireRole(userRole: Role, requiredRole: Role): void {
	if (!hasPermission(userRole, requiredRole)) {
		throw redirect({ to: "/" });
	}
}

export function createProtectedRoute(
	requiredRole?: Role,
): (context: { user: { role: string } }) => void {
	return ({ user }) => {
		if (requiredRole) {
			requireRole(user.role as Role, requiredRole);
		}
	};
}
