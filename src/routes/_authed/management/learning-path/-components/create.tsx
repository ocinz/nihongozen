import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	useCreateLearningPathForm,
	useCreateLearningPathMutation,
} from "../-hooks";

export function CreateLearningPathDialog() {
	const [open, setOpen] = useState(false);
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
		control,
	} = useCreateLearningPathForm();

	const { mutateAsync } = useCreateLearningPathMutation();
	const handleCreateLearningPath = handleSubmit(async (data) => {
		await mutateAsync(data);
		reset();
		setOpen(false);
	});
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus />
					Learning Path
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] text-foreground">
				<form onSubmit={handleCreateLearningPath}>
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when you&apos;re
							done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="title">Title</Label>
							<Input
								id={"title"}
								{...register("title")}
								placeholder="title here.."
							/>
							{errors.title?.message && (
								<p className=" text-orange-500">{errors.title?.message}</p>
							)}
						</div>
						<div className="grid gap-3">
							<Label htmlFor="description">Level</Label>
							<Controller
								name="level"
								control={control}
								rules={{ required: "Level wajib dipilih" }}
								render={({ field }) => (
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger className=" w-full" id={"level"}>
											<SelectValue placeholder="JLPT Level" />
										</SelectTrigger>

										<SelectContent>
											<SelectItem value="N1">N1</SelectItem>
											<SelectItem value="N2">N2</SelectItem>
											<SelectItem value="N3">N3</SelectItem>
											<SelectItem value="N4">N4</SelectItem>
											<SelectItem value="N5">N5</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
							{errors.level?.message && (
								<p className=" text-orange-500">{errors.level?.message}</p>
							)}
						</div>
						<div className="grid gap-3">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id={"description"}
								{...register("description")}
								placeholder="description here.."
							/>
							{errors.description?.message && (
								<p className=" text-orange-500">
									{errors.description?.message}
								</p>
							)}
						</div>
					</div>
					<DialogFooter className=" mt-4">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Save</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
