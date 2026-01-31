import { Plus, PlusCircle } from "lucide-react";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { DailyLesson } from "@/generated/prisma/client";

export const DailyLessonCard = ({ data }: { data: DailyLesson[] }) => {
	return (
		<>
			{data.map((lesson) => {
				return (
					<Card className=" bg-blue-900" key={lesson.sequence}>
						<CardHeader>
							<CardTitle className=" text-2xl">
								{lesson.sequence}. {lesson.title}
							</CardTitle>
							<CardAction className=" hover:bg-black hover:cursor-pointer rounded-full hover:shadow-2xl size-10 flex justify-center items-center">
								<PlusCircle />
							</CardAction>
						</CardHeader>
						<CardContent></CardContent>
					</Card>
				);
			})}
		</>
	);
};
