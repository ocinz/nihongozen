import { CatchNotFound, Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function NotFoundComponent() {
	return (
		<CatchNotFound
			fallback={(error) => <p>Not found error! {JSON.stringify(error)}</p>}
		>
			<div className=" h-screen w-screen bg-background text-foreground flex items-center justify-center">
				<div className=" flex flex-col gap-y-2">
					<h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
						Unfortunately something happened
					</h2>
					<div className="flex items-center justify-center">
						<Link to={"/"}>
							<Button>Home</Button>
						</Link>
					</div>
				</div>
			</div>
		</CatchNotFound>
	);
}
