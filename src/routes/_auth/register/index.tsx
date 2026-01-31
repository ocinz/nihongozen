import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegisterForm, useRegisterHook } from "./-hooks";
export const Route = createFileRoute("/_auth/register/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "NihongoZen: Register" },
			{
				name: "description",
				content: "NihongoZen: Japanese Language Learning Platform",
			},
			{ property: "og:title", content: "NihongoZen: Register" },
			{
				property: "og:description",
				content: "NihongoZen: Japanese Language Learning Platform",
			},
			{
				property: "og:image",
				content:
					"https://img.freepik.com/vektor-gratis/huruf-e-dengan-daun-hijau_53876-111468.jpg",
			},
			{
				property: "og:url",
				content: "kokage.tech/register",
			},
			{ property: "og:type", content: "form" },
		],
	}),
});

function RouteComponent() {
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useRegisterForm();
	const { mutateAsync } = useRegisterHook();
	const onSubmit = handleSubmit(async (data) => {
		await mutateAsync(data);
	});

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
			<div className="w-full max-w-sm">
				<div className="flex flex-col gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Register</CardTitle>
							<CardDescription>
								100% gratis. Semua bisa belajar!
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={onSubmit}>
								<FieldGroup>
									<Field>
										<FieldLabel htmlFor="email">Email</FieldLabel>
										<Input placeholder="m@example.com" {...register("email")} />
										{errors.email?.message && <p>{errors.email?.message}</p>}
									</Field>
									<Field>
										<FieldLabel htmlFor="name">Nama</FieldLabel>
										<Input
											id={"name"}
											type="text"
											placeholder="Fulan bin Fulan"
											{...register("name")}
										/>
										{errors.name?.message && <p>{errors.name?.message}</p>}
									</Field>
									<Field>
										<FieldLabel htmlFor="password">Password</FieldLabel>
										<Input
											id={"password"}
											type="password"
											{...register("password")}
										/>
										{errors.password?.message && (
											<p>{errors.password?.message}</p>
										)}
									</Field>
									<Field>
										<Button type="submit" disabled={isSubmitting}>
											{isSubmitting ? "Registering..." : "Register"}
										</Button>

										<FieldDescription className="text-center">
											Already have an account? <Link to="/login">Login</Link>
										</FieldDescription>
									</Field>
								</FieldGroup>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
