import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateGrammarForm, useCreateGrammarMutation } from "../-hook";
export const Route = createFileRoute("/_authed/management/grammar/$id/add")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useCreateGrammarForm(id);
	const { mutateAsync } = useCreateGrammarMutation();
	const handlerCreateGrammar = handleSubmit(async (data) => {
		await mutateAsync(data);
		reset();
	});
	return (
		<div>
			<form onSubmit={handlerCreateGrammar}>
				<FieldGroup>
					<Field>
						<FieldLabel className=" text-lg" htmlFor="title">
							Title
						</FieldLabel>
						<Input
							id={"title"}
							type="text"
							aria-label="title"
							{...register("title")}
						/>
						{errors.title?.message && (
							<p className=" text-orange-500">{errors.title?.message}</p>
						)}
					</Field>
					<Field>
						<FieldLabel className=" text-lg" htmlFor="content">
							Konten
						</FieldLabel>
						<Textarea id={"content"} {...register("content")} />
						{errors.content?.message && (
							<p className=" text-orange-500">{errors.content?.message}</p>
						)}
					</Field>
					<Field>
						<FieldLabel className=" text-lg" htmlFor="front_text">
							Text Depan
						</FieldLabel>
						<Input id={"front_text"} {...register("front_text")} />
						{errors.front_text?.message && (
							<p className=" text-orange-500">{errors.front_text?.message}</p>
						)}
					</Field>
					<Field>
						<FieldLabel className=" text-lg" htmlFor="back_text">
							Text Belakang
						</FieldLabel>
						<Input id={"back_text"} {...register("back_text")} />
						{errors.back_text?.message && (
							<p className=" text-orange-500">{errors.back_text?.message}</p>
						)}
					</Field>
					<Field>
						<FieldLabel className=" text-lg" htmlFor="example">
							Contoh
						</FieldLabel>
						<Input id={"example"} {...register("example")} />
						{errors.example?.message && (
							<p className=" text-orange-500">{errors.example?.message}</p>
						)}
					</Field>
					<Field>
						<Button className=" hover:cursor-pointer" type="submit">
							Buat
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</div>
	);
}
