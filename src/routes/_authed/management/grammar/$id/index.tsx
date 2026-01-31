import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getGrammarDeckById } from "../-server";

export const Route = createFileRoute("/_authed/management/grammar/$id/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data } = useQuery({
		queryKey: ["grammar", id],
		queryFn: async () => {
			return await getGrammarDeckById({ data: { id } });
		},
	});
	const urlAddGrammar = `/management/grammar/${data?.id}/add`;
	return (
		<div className=" px-8 py-4">
			<Card className=" px-8">
				<CardHeader>
					<CardTitle>
						<h1 className=" text-2xl">Tittle :{data?.title}</h1>
					</CardTitle>
					<CardDescription>Exp: {data?.exp}</CardDescription>
					<CardAction>
						<Link to={urlAddGrammar}>
							<Button>
								<Plus /> Grammar
							</Button>
						</Link>
					</CardAction>
				</CardHeader>
				<CardContent className=" space-y-2">
					{data?.grammars.map((item, idx) => {
						return (
							<Card key={item.id}>
								<CardHeader>
									<CardTitle>
										{idx + 1}. {item.title}
									</CardTitle>
								</CardHeader>
							</Card>
						);
					})}
				</CardContent>
			</Card>
		</div>
	);
}
