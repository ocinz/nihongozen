import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { GrammarDeck } from "@/generated/prisma/client";
import {
	type GrammarDeckInput,
	type GrammarInput,
	grammarDeckSchema,
	grammarSchema,
} from "./-schema";
import {
	createGrammarDeckFn,
	createGrammarFn,
	getAllGrammarDecksFn,
	updateGrammarDeckFn,
} from "./-server";

export const useGetGrammarDecksQuery = () => {
	const getAllGrammarDecks = useServerFn(getAllGrammarDecksFn);

	return useQuery({
		queryKey: ["grammar-decks"],
		queryFn: async () => {
			return await getAllGrammarDecks();
		},
	});
};

export const useCreateGrammarDeckMutation = () => {
	const createGrammarDeck = useServerFn(createGrammarDeckFn);
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["create-grammar-deck"],
		mutationFn: async (data: Omit<GrammarDeckInput, "id">) => {
			return await createGrammarDeck({ data });
		},
		onSuccess: () => {
			toast.success("Sukses buat grammar deck");
			queryClient.refetchQueries({
				queryKey: ["grammar-decks"],
			});
		},
	});
};

export const useCreateGrammarDeckForm = () => {
	return useForm({
		defaultValues: {
			title: "",
			exp: 1,
		},
		resolver: standardSchemaResolver(grammarDeckSchema.partial({ id: true })),
	});
};

export const useUpdateGrammarDeckForm = (grammarDeck: GrammarDeck) => {
	return useForm({
		defaultValues: {
			title: grammarDeck.title,
			exp: grammarDeck.exp,
			id: grammarDeck.id,
		},
		resolver: standardSchemaResolver(grammarDeckSchema),
	});
};

export const useUpdateGrammarDeckMutation = () => {
	const updateGrammarDeck = useServerFn(updateGrammarDeckFn);
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["update-grammar-deck"],
		mutationFn: async (data: GrammarDeckInput) => {
			await updateGrammarDeck({ data });
		},
		onSuccess: () => {
			toast.success("Sukses mengubah grammar deck");
			queryClient.refetchQueries({
				queryKey: ["grammar-decks"],
			});
		},
	});
};

export const useCreateGrammarMutation = () => {
	const createGrammar = useServerFn(createGrammarFn);
	return useMutation({
		mutationKey: ["add-grammar"],
		mutationFn: async (data: Omit<GrammarInput, "id">) => {
			return await createGrammar({ data });
		},
	});
};
export const useCreateGrammarForm = (grammarDeckId: string) => {
	return useForm({
		defaultValues: {
			title: "",
			content: "",
			front_text: "",
			back_text: "",
			example: "",
			grammar_deck_id: grammarDeckId,
		},
		resolver: standardSchemaResolver(grammarSchema.partial({ id: true })),
	});
};
