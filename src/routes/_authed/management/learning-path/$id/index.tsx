import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGetLearningPathByIdHook } from "../-hooks";
import { DailyLessonCard } from "./-components/daily-lesson";
import { LearningPath } from "./-components/learning-path";
import { dailyLessonArraySchema } from "./-schema";

export const Route = createFileRoute("/_authed/management/learning-path/$id/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id: learningPathId } = Route.useParams();
	const { data: learningPath } = useGetLearningPathByIdHook(learningPathId);

	// ditunda, kerjakan tryout, suplement, grammar dan card dulu

	// const {
	// 	register,
	// 	formState: { errors },
	// } = useForm({
	// 	resolver: standardSchemaResolver(dailyLessonArraySchema),
	// 	defaultValues: learningPath?.daily_lessons,
	// });

	return (
		<div className=" bg-background text-foreground space-y-4">
			<LearningPath id={learningPathId} />
			<Card>
				<CardHeader>
					<CardTitle className=" text-2xl">Daily Lesson</CardTitle>
					<CardAction></CardAction>
				</CardHeader>
				<CardContent className=" space-y-2">
					{learningPath?.daily_lessons && (
						<DailyLessonCard data={learningPath.daily_lessons} />
					)}
				</CardContent>
				<CardFooter>
					<Button>Save Changes</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
