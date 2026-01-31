import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginFn } from "@/routes/_auth/-server";
import { type LoginInput, loginSchema } from "./-schema";

export const useLoginForm = () => {
	return useForm({
		resolver: standardSchemaResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});
};

export const useLoginHook = () => {
	const navigate = useNavigate();
	const login = useServerFn(loginFn);

	return useMutation({
		mutationKey: ["login"],
		mutationFn: async (data: LoginInput) => await login({ data }),
		onError: () => {
			toast.error("Upps.. something happened, try again later");
		},
		onSuccess: () => {
			toast.success("Login success, redirecting...");
			setTimeout(() => {
				navigate({ to: "/dashboard" });
			}, 500);
		},
	});
};
