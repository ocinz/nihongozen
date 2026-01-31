import { Edit2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GrammarDeck } from "@/generated/prisma/client";
import {
	useUpdateGrammarDeckForm,
	useUpdateGrammarDeckMutation,
} from "../-hook";

export const UpdateGrammarDialog = ({
	grammarDeck,
}: {
	grammarDeck: GrammarDeck;
}) => {
	const [open, setOpen] = useState(false);
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useUpdateGrammarDeckForm(grammarDeck);
	const { mutateAsync } = useUpdateGrammarDeckMutation();

	const handlerUpdateGrammarDeck = handleSubmit(async (data) => {
		await mutateAsync(data);
		reset();
		setOpen(false);
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size={"sm"}>
					<Edit2 />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] border border-white">
				<form className="  text-foreground" onSubmit={handlerUpdateGrammarDeck}>
					<DialogHeader className=" mb-4">
						<DialogTitle className=" text-foreground">
							Update Grammar Deck
						</DialogTitle>
						{JSON.stringify(errors)}
						<DialogDescription>Update grammmar deck.</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="title" className=" text-foreground">
								Name
							</Label>
							<Input
								className=" text-foreground"
								id={"title"}
								{...register("title")}
							/>
							{errors.title && (
								<p className=" text-red-500">{errors.title.message}</p>
							)}
						</div>
						<div className="grid gap-3">
							<Label htmlFor="exp" className=" text-foreground">
								Exp
							</Label>
							<Input
								id={"exp"}
								type="number"
								{...register("exp", {
									valueAsNumber: true,
								})}
							/>
							{errors.exp && (
								<p className=" text-red-500">{errors.exp.message}</p>
							)}
						</div>
					</div>
					<DialogFooter className=" mt-4">
						<DialogClose asChild>
							<Button>Cancel</Button>
						</DialogClose>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
