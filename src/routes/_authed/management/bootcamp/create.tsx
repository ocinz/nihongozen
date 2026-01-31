import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/management/bootcamp/create")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_authed/management/bootcamp/create"!</div>;
}
