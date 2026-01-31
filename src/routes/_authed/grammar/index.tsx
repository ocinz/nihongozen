import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authed/grammar/")({
	component: RouteComponent,
});

function RouteComponent() {
	// Mock data untuk grammar
	const dueDateGrammar = [
		{
			id: 1,
			title: "Present Perfect Tense",
			description:
				"Penggunaan present perfect untuk actions yang telah selesai",
			dueDate: "Hari ini",
			masteryLevel: 65,
			lastReviewed: "3 hari yang lalu",
		},
		{
			id: 2,
			title: "Conditional Sentences",
			description: "Berbagai jenis conditional sentences dan penggunaannya",
			dueDate: "Besok",
			masteryLevel: 45,
			lastReviewed: "5 hari yang lalu",
		},
	];

	const allGrammar = [
		{
			id: 1,
			title: "Present Perfect Tense",
			description:
				"Penggunaan present perfect untuk actions yang telah selesai",
			category: "Tenses",
			difficulty: "Intermediate",
			masteryLevel: 65,
			dueDate: "Hari ini",
			lastReviewed: "3 hari yang lalu",
		},
		{
			id: 2,
			title: "Conditional Sentences",
			description: "Berbagai jenis conditional sentences dan penggunaannya",
			category: "Structure",
			difficulty: "Advanced",
			masteryLevel: 45,
			dueDate: "Besok",
			lastReviewed: "5 hari yang lalu",
		},
		{
			id: 3,
			title: "Passive Voice",
			description: "Penggunaan passive voice dalam berbagai tenses",
			category: "Voice",
			difficulty: "Intermediate",
			masteryLevel: 80,
			dueDate: "3 hari lagi",
			lastReviewed: "1 minggu yang lalu",
		},
		{
			id: 4,
			title: "Reported Speech",
			description: "Cara melaporkan percakapan atau pernyataan orang lain",
			category: "Speech",
			difficulty: "Advanced",
			masteryLevel: 30,
			dueDate: "5 hari lagi",
			lastReviewed: "2 minggu yang lalu",
		},
		{
			id: 5,
			title: "Modal Verbs",
			description:
				"Penggunaan modal verbs untuk menyatakan kemampuan, izin, dan keharusan",
			category: "Verbs",
			difficulty: "Beginner",
			masteryLevel: 90,
			dueDate: "1 minggu lagi",
			lastReviewed: "4 hari yang lalu",
		},
		{
			id: 6,
			title: "Relative Clauses",
			description:
				"Penggunaan relative clauses untuk menghubungkan informasi tambahan",
			category: "Clauses",
			difficulty: "Intermediate",
			masteryLevel: 55,
			dueDate: "2 hari lagi",
			lastReviewed: "6 hari yang lalu",
		},
	];

	const masteredCount = allGrammar.filter((g) => g.masteryLevel >= 70).length;
	const totalCount = allGrammar.length;

	return (
		<div className="p-6 space-y-6">
			{/* Statistik dan Grammar Due Date */}
			<div className="space-y-4">
				<h2 className="text-2xl font-bold">Grammar Review</h2>

				{/* Statistik Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-gray-600">
								Total Grammar
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{totalCount}</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-gray-600">
								Telah Dikuasai
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-green-600">
								{masteredCount}
							</div>
							<div className="text-sm text-gray-500">
								{Math.round((masteredCount / totalCount) * 100)}% complete
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-gray-600">
								Due Date Review
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-orange-600">
								{dueDateGrammar.length}
							</div>
							<div className="text-sm text-gray-500">Perlu review</div>
						</CardContent>
					</Card>
				</div>

				{/* Grammar Due Date */}
				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<h3 className="text-lg font-semibold">Grammar Perlu Review</h3>
						<Button>Mulai Repetisi</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{dueDateGrammar.map((grammar) => (
							<Card key={grammar.id} className="">
								<CardHeader className="pb-2">
									<div className="flex justify-between items-start">
										<CardTitle className="text-base">{grammar.title}</CardTitle>
										<span className="px-2 py-1 bg-orange-200 text-orange-800 rounded text-xs">
											{grammar.dueDate}
										</span>
									</div>
									<CardDescription>{grammar.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span>Mastery: {grammar.masteryLevel}%</span>
											<span>Review: {grammar.lastReviewed}</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2">
											<div
												className="bg-orange-600 h-2 rounded-full"
												style={{ width: `${grammar.masteryLevel}%` }}
											></div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>

			{/* Search dan Semua Grammar */}
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-bold">Semua Grammar</h2>
					<Input placeholder="Cari grammar..." className="max-w-sm" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{allGrammar.map((grammar) => (
						<Card
							key={grammar.id}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<div className="flex justify-between items-start">
									<CardTitle className="text-lg">{grammar.title}</CardTitle>
									<span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
										{grammar.dueDate}
									</span>
								</div>
								<CardDescription>{grammar.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex gap-2">
										<span className="px-2 py-1 bg-gray-100 rounded text-xs">
											{grammar.category}
										</span>
										<span className="px-2 py-1 bg-gray-100 rounded text-xs">
											{grammar.difficulty}
										</span>
									</div>
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span>Mastery: {grammar.masteryLevel}%</span>
											<span>Review: {grammar.lastReviewed}</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2">
											<div
												className={`h-2 rounded-full ${
													grammar.masteryLevel >= 70
														? "bg-green-600"
														: grammar.masteryLevel >= 40
															? "bg-yellow-600"
															: "bg-red-600"
												}`}
												style={{ width: `${grammar.masteryLevel}%` }}
											></div>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button variant="outline" className="w-full">
									{grammar.masteryLevel >= 70 ? "Review" : "Practice"}
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
