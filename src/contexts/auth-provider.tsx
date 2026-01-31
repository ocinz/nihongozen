import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createContext, type ReactNode, useContext } from "react";
import type { User } from "@/generated/prisma/client";
import { getCurrentUserFn } from "../routes/_auth/-server";

type AuthContextType = {
	user:
		| Pick<
				User,
				"id" | "email" | "on_tryout" | "active" | "exp" | "role" | "name"
		  >
		| undefined;
	isLoading: boolean;
	refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const getCurrentUser = useServerFn(getCurrentUserFn);
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["user"],
		queryFn: async () => await getCurrentUser(),
	});
	return (
		<AuthContext.Provider value={{ isLoading, refetch, user: data?.user }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
}
