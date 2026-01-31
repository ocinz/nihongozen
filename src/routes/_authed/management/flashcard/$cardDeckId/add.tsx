import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authed/management/flashcard/$cardDeckId/add",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_authed/management/flashcard/$cardDeckId/add"!</div>;
}
