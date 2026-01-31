import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Level } from "@/generated/prisma/enums";
import {
	type DailyLessonInput,
	type LearningPathInput,
	learningPathSchema,
} from "./-schema";
import {
	createDailyActivityFn,
	createLearningPathFn,
	deleteLearningPathFn,
	getLearningPathByIdFn,
	getLearningPathsFn,
	updateLearningPathFn,
} from "./-server";

export const useCreateDailyLessonHook = () => {
	const createDailyLesson = useServerFn(createDailyActivityFn);
	return useMutation({
		mutationKey: ["daily-lesson"],
		mutationFn: async (data: DailyLessonInput) => {
			return await createDailyLesson({ data });
		},
		onSuccess: async () => {
			toast.success("Success creating daily lesson");
		},
		onError: () => {
			toast.error("Something happened");
		},
	});
};

export const useGetLearningPathByIdHook = (id: string) => {
	const getLearningPathById = useServerFn(getLearningPathByIdFn);
	return useQuery({
		queryKey: ["learning-path", id],
		queryFn: async () => {
			const res = await getLearningPathById({ data: { id } });
			if (!res) {
				throw new Error("Learning path not found");
			}
			return res;
		},
	});
};

export const useGetlearningPathsHook = () => {
	const getLearningPaths = useServerFn(getLearningPathsFn);
	return useQuery({
		queryKey: ["learning-paths"],
		queryFn: async () => {
			const learningPaths = await getLearningPaths();
			return learningPaths;
		},
	});
};
export const useCreateLearningPathMutation = () => {
	const createLearningPath = useServerFn(createLearningPathFn);
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["learning-path", "create"],
		mutationFn: async (data: Omit<LearningPathInput, "id">) => {
			return await createLearningPath({ data });
		},
		onSuccess: () => {
			toast.success("Berhasil buat Learning path");
			queryClient.refetchQueries({
				queryKey: ["learning-paths"],
			});
		},
	});
};
export const useUpdateLearningPathMutation = () => {
	const updateLearningPath = useServerFn(updateLearningPathFn);
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["learning-path", "update"],
		mutationFn: async (data: LearningPathInput) => {
			return await updateLearningPath({ data });
		},
		onSuccess: () => {
			toast.success("Berhasil update Learning path");
			queryClient.refetchQueries({
				queryKey: ["learning-paths"],
			});
		},
	});
};

export const useCreateLearningPathForm = () => {
	return useForm({
		resolver: standardSchemaResolver(learningPathSchema.partial({ id: true })),
		defaultValues: {
			title: "",
			level: Level.N5,
			description: "",
		},
	});
};
export const useUpdateLearningPathForm = (learningPath: LearningPathInput) => {
	return useForm({
		resolver: standardSchemaResolver(learningPathSchema),
		defaultValues: {
			id: learningPath.id,
			title: learningPath.title,
			level: learningPath.level,
			description: learningPath.description,
		},
	});
};
export const useDeleteLearningPathMutation = () => {
	const deleteLearningPath = useServerFn(deleteLearningPathFn);
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["delete", "learning-path"],
		mutationFn: async (id: string) => {
			return deleteLearningPath({ data: { id } });
		},
		onSuccess: () => {
			toast.success("Berhasil hapus Learning path");
			queryClient.refetchQueries({
				queryKey: ["learning-paths"],
			});
		},
	});
};
