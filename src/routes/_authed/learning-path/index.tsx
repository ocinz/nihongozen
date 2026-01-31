import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authed/learning-path/")({
	component: RouteComponent,
});

function RouteComponent() {
	// Mock data untuk learning paths
	const lastLearningPath = {
		id: 1,
		title: "React Fundamentals",
		description: "Pelajari dasar-dasar React dan komponen",
		progress: 75,
		totalLessons: 12,
		completedLessons: 9,
		lastAccessed: "2 jam yang lalu",
	};

	const allLearningPaths = [
		{
			id: 1,
			title: "React Fundamentals",
			description: "Pelajari dasar-dasar React dan komponen",
			progress: 75,
			totalLessons: 12,
			completedLessons: 9,
			category: "Frontend",
			duration: "8 jam",
		},
		{
			id: 2,
			title: "TypeScript Mastery",
			description: "Master TypeScript untuk pengembangan modern",
			progress: 30,
			totalLessons: 20,
			completedLessons: 6,
			category: "Programming",
			duration: "12 jam",
		},
		{
			id: 3,
			title: "Node.js Backend",
			description: "Bangun API dengan Node.js dan Express",
			progress: 0,
			totalLessons: 15,
			completedLessons: 0,
			category: "Backend",
			duration: "10 jam",
		},
		{
			id: 4,
			title: "Database Design",
			description: "Desain database yang efisien dan skalabel",
			progress: 50,
			totalLessons: 8,
			completedLessons: 4,
			category: "Database",
			duration: "6 jam",
		},
	];

	return (
		<div className="p-6 space-y-6">
			{/* Learning Path Terakhir */}
			<div className="space-y-4">
				<h2 className="text-2xl font-bold">Lanjutkan Belajar</h2>
				<Card>
					<CardHeader>
						<div className="flex justify-between items-start">
							<div>
								<CardTitle className="text-xl">
									{lastLearningPath.title}
								</CardTitle>
								<CardDescription className="mt-2">
									{lastLearningPath.description}
								</CardDescription>
							</div>
							<div className="text-sm text-gray-500">
								Terakhir diakses: {lastLearningPath.lastAccessed}
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<div className="flex justify-between text-sm">
								<span>Progress: {lastLearningPath.progress}%</span>
								<span>
									{lastLearningPath.completedLessons}/
									{lastLearningPath.totalLessons} pelajaran
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-blue-600 h-2 rounded-full"
									style={{ width: `${lastLearningPath.progress}%` }}
								></div>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full">Lanjutkan Belajar</Button>
					</CardFooter>
				</Card>
			</div>

			{/* Search dan Semua Learning Paths */}
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-bold">Semua Learning Path</h2>
					<Input placeholder="Cari learning path..." className="max-w-sm" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{allLearningPaths.map((path) => (
						<Card key={path.id} className="hover:shadow-lg transition-shadow">
							<CardHeader>
								<CardTitle className="text-lg">{path.title}</CardTitle>
								<CardDescription>{path.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex gap-2">
										<span className="px-2 py-1 bg-gray-100 rounded text-xs">
											{path.category}
										</span>
										<span className="px-2 py-1 bg-gray-100 rounded text-xs">
											{path.duration}
										</span>
									</div>
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span>Progress: {path.progress}%</span>
											<span>
												{path.completedLessons}/{path.totalLessons} pelajaran
											</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2">
											<div
												className="bg-green-600 h-2 rounded-full"
												style={{ width: `${path.progress}%` }}
											></div>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									variant={path.progress > 0 ? "default" : "outline"}
									className="w-full"
								>
									{path.progress > 0 ? "Lanjutkan" : "Mulai"}
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
