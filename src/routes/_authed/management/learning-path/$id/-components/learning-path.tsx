import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetLearningPathByIdHook } from "../../-hooks";

export const LearningPath = ({ id }: { id: string }) => {
	const { data: learningPath } = useGetLearningPathByIdHook(id);

	return (
		<Card>
			<CardHeader>
				<CardTitle className=" text-4xl">{learningPath?.title}</CardTitle>
				<Separator className="my-4" />
				<CardAction>{learningPath?.level}</CardAction>
				<CardDescription>
					<h4 className=" text-white text-xl mb-2">Description:</h4>
					{learningPath?.description}
				</CardDescription>
			</CardHeader>
		</Card>
	);
};
