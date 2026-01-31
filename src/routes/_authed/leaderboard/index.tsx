import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/leaderboard/")({
	component: RouteComponent,
});

interface User {
	id: number;
	name: string;
	exp: number;
	profilePhoto: string;
}

const mockWeeklyUsers: User[] = [
	{
		id: 1,
		name: "Alex Chen",
		exp: 15420,
		profilePhoto: "https://picsum.photos/seed/user1/40/40.jpg",
	},
	{
		id: 2,
		name: "Sarah Johnson",
		exp: 14850,
		profilePhoto: "https://picsum.photos/seed/user2/40/40.jpg",
	},
	{
		id: 3,
		name: "Mike Wilson",
		exp: 13200,
		profilePhoto: "https://picsum.photos/seed/user3/40/40.jpg",
	},
	{
		id: 4,
		name: "Emma Davis",
		exp: 12100,
		profilePhoto: "https://picsum.photos/seed/user4/40/40.jpg",
	},
	{
		id: 5,
		name: "John Smith",
		exp: 10500,
		profilePhoto: "https://picsum.photos/seed/user5/40/40.jpg",
	},
];

const mockGlobalUsers: User[] = [
	{
		id: 1,
		name: "David Lee",
		exp: 245000,
		profilePhoto: "https://picsum.photos/seed/global1/40/40.jpg",
	},
	{
		id: 2,
		name: "Lisa Wang",
		exp: 238500,
		profilePhoto: "https://picsum.photos/seed/global2/40/40.jpg",
	},
	{
		id: 3,
		name: "Robert Brown",
		exp: 226000,
		profilePhoto: "https://picsum.photos/seed/global3/40/40.jpg",
	},
	{
		id: 4,
		name: "Jennifer Taylor",
		exp: 215000,
		profilePhoto: "https://picsum.photos/seed/global4/40/40.jpg",
	},
	{
		id: 5,
		name: "Michael Martinez",
		exp: 198000,
		profilePhoto: "https://picsum.photos/seed/global5/40/40.jpg",
	},
	{
		id: 6,
		name: "Michael Martinez",
		exp: 198000,
		profilePhoto: "https://picsum.photos/seed/global5/40/40.jpg",
	},
	{
		id: 7,
		name: "Michael Martinez",
		exp: 198000,
		profilePhoto: "https://picsum.photos/seed/global5/40/40.jpg",
	},
	{
		id: 8,
		name: "Michael Martinez",
		exp: 198000,
		profilePhoto: "https://picsum.photos/seed/global5/40/40.jpg",
	},
	{
		id: 9,
		name: "Michael Martinez",
		exp: 198000,
		profilePhoto: "https://picsum.photos/seed/global5/40/40.jpg",
	},
];

function UserList({ users, title }: { users: User[]; title: string }) {
	return (
		<div className="rounded-lg shadow-md p-6">
			<h2 className="text-xl font-bold mb-4 ">{title}</h2>
			<div className="space-y-3">
				{users.map((user, index) => (
					<div
						key={user.id}
						className="flex items-center space-x-3 p-3  rounded-lg hover:bg-gray-800 transition-colors"
					>
						<div className="flex-shrink-0 w-8 text-center">
							<span
								className={`text-lg font-bold ${index < 3 ? "text-yellow-600" : "text-gray-600"}`}
							>
								#{index + 1}
							</span>
						</div>
						<img
							src={user.profilePhoto}
							alt={user.name}
							className="w-10 h-10 rounded-full object-cover"
						/>
						<div className="flex-grow">
							<p className="font-semibold text-foreground">{user.name}</p>
						</div>
						<div className="flex-shrink-0 text-right">
							<p className="font-bold text-blue-600">
								{user.exp.toLocaleString()}
							</p>
							<p className="text-xs text-gray-500">EXP</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function RouteComponent() {
	return (
		<div className="min-h-screen p-6">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>

				<div className="grid grid-cols-1 gap-6">
					<div className="order-2 lg:order-1">
						<UserList users={mockGlobalUsers} title="Global Top (All Time)" />
					</div>

					{/* <div className="order-1 lg:order-2">
						<UserList
							users={mockWeeklyUsers}
							title="Weekly Top (Last 7 Days)"
						/>
					</div> */}
				</div>
			</div>
		</div>
	);
}
