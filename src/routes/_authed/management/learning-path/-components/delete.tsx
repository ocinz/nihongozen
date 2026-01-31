import { Trash2 } from "lucide-react";
import { type FormEvent, useState } from "react";
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

import { useDeleteLearningPathMutation } from "../-hooks";

export function DeleteLearningPathDialog({ id }: { id: string }) {
	const [open, setOpen] = useState(false);
	const { mutateAsync } = useDeleteLearningPathMutation();

	const handleDeleteLearningPath = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await mutateAsync(id);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size={"sm"} className=" bg-red-600 hover:bg-red-700">
					<Trash2 />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] text-foreground">
				<form onSubmit={handleDeleteLearningPath}>
					<DialogHeader>
						<DialogTitle>Delete Learning Path</DialogTitle>
						<DialogDescription>
							Are you sure want to delete this Learning Path?
						</DialogDescription>
					</DialogHeader>

					<DialogFooter className=" mt-4">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button
							type="submit"
							className=" bg-red-600 hover:bg-red-500 active:bg-red-700"
						>
							Delete
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
