import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type RegisterInput, registerFn } from "@/routes/_auth/-server";
import { registerSchema } from "./-schema";

export const useRegisterForm = () => {
	return useForm<RegisterInput>({
		resolver: standardSchemaResolver(registerSchema),
		defaultValues: { name: "", email: "", password: "" },
	});
};

export const useRegisterHook = () => {
	const registerUser = useServerFn(registerFn);
	const navigate = useNavigate();
	return useMutation({
		mutationKey: ["register"],
		mutationFn: async (data: RegisterInput) => {
			return await registerUser({ data });
		},
		onSuccess: () => {
			toast.success("Registration successful! Please login.");
			setTimeout(() => {
				navigate({ to: "/login" });
			}, 500);
		},
		onError: () => {
			toast.error("Upss.. something happened, try again later");
		},
	});
};
