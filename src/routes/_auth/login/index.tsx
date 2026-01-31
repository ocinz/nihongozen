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
import { useLoginForm, useLoginHook } from "./-hooks";

export const Route = createFileRoute("/_auth/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	const {
		formState: { errors, isSubmitting },
		register,
		handleSubmit,
	} = useLoginForm();
	const { mutateAsync } = useLoginHook();

	const onSubmit = handleSubmit(async (data) => {
		await mutateAsync(data);
	});
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
			<div className="w-full max-w-sm">
				<div className="flex flex-col gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Login to your account</CardTitle>
							<CardDescription>
								Enter your email below to login to your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={onSubmit}>
								<FieldGroup>
									<Field>
										<FieldLabel className=" text-lg" htmlFor="email">
											Email
										</FieldLabel>
										<Input
											id={"email"}
											aria-label="email"
											// type="email"
											placeholder="m@example.com"
											required
											{...register("email")}
										/>
										{errors.email?.message && (
											<p className=" text-orange-500">
												{errors.email?.message}
											</p>
										)}
									</Field>
									<Field>
										<div className="flex items-center">
											<FieldLabel className=" text-lg" htmlFor="password">
												Password
											</FieldLabel>
											<Link
												to="/forgot-password"
												className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
											>
												Forgot your password?
											</Link>
										</div>
										<Input
											id={"password"}
											aria-label="Password"
											type="password"
											required
											{...register("password")}
										/>
										{errors.password?.message && (
											<p className=" text-orange-500">
												{errors.password?.message}
											</p>
										)}
									</Field>
									<Field>
										<Button
											className=" hover:cursor-pointer"
											type="submit"
											disabled={isSubmitting}
										>
											{isSubmitting ? "Login.." : "Login"}
										</Button>
										<Button disabled type="button">
											Login with Google
										</Button>
										<FieldDescription className="text-center">
											Don&apos;t have an account?{" "}
											<Link to="/register">Sign up</Link>
										</FieldDescription>
									</Field>
								</FieldGroup>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
