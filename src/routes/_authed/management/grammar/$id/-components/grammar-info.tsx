import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGrammarDeckById } from "../../-server";

export const GrammarInfo = (id: string) => {
	const { data } = useQuery({
		queryKey: ["grammar", id],
		queryFn: async () => {
			return await getGrammarDeckById({ data: { id } });
		},
	});
	return (
		<Card>
			<CardContent>
				<CardHeader>
					<CardTitle>{data?.title}</CardTitle>
				</CardHeader>
			</CardContent>
		</Card>
	);
};
