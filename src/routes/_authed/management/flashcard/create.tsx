import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
export const Route = createFileRoute("/_authed/management/flashcard/create")({
	component: RouteComponent,
});

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { createCardDeckFn } from "@/routes/_authed/management/flashcard/-server";
import { type CreateCardDeckSchema, createCardDeckSchema } from "./-schema";

function RouteComponent() {
	const [isLoading, setIsloading] = useState(false);
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
		control,
	} = useForm({
		resolver: standardSchemaResolver(createCardDeckSchema),
		defaultValues: {
			title: "",
			exp: 100,
			published: false,
			activity_id: "",
		},
	});

	const createCardDeck = useServerFn(createCardDeckFn);
	const onSubmit: SubmitHandler<CreateCardDeckSchema> = async (data) => {
		setIsloading(true);
		await createCardDeck({ data });
		toast.success("Berhasil buat Flashcard! Lengkapi flashcard!");
		reset();
		setIsloading(false);
	};

	return (
		<div className="w-full max-w-full">
			{JSON.stringify(errors)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<FieldGroup>
					<FieldSet>
						<FieldLegend>
							<span className=" text-3xl">Create Flashcard</span>
						</FieldLegend>
						<Separator />
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="title">Judul</FieldLabel>
								<Input
									id={"title"}
									placeholder="JLPT N3"
									required
									{...register("title")}
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="exp">EXP</FieldLabel>
								<Input
									id={"exp"}
									required
									type="number"
									{...register("exp", { valueAsNumber: true })}
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="level">Published</FieldLabel>

								<Controller
									name="published"
									control={control}
									rules={{ required: "Level wajib dipilih" }}
									render={({ field }) => (
										<Select
											value={String(field.value)}
											onValueChange={(value) =>
												field.onChange(value === "true")
											}
										>
											<SelectTrigger id={"published"}>
												<SelectValue placeholder="JLPT Level" />
											</SelectTrigger>

											<SelectContent>
												<SelectItem value="true">YES</SelectItem>
												<SelectItem value="false">NO</SelectItem>
											</SelectContent>
										</Select>
									)}
								/>
								{errors.published && (
									<FieldError>{errors.published.message}</FieldError>
								)}
							</Field>
						</FieldGroup>
					</FieldSet>
					<FieldSeparator />

					<Field orientation="horizontal">
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Submitting..." : "Submit"}
						</Button>
						<Link to="/management/learning-path">
							<Button variant="outline" type="button">
								Cancel
							</Button>
						</Link>
					</Field>
				</FieldGroup>
			</form>
		</div>
	);
}
