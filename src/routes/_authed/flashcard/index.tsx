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

export const Route = createFileRoute("/_authed/flashcard/")({
	component: RouteComponent,
});

function RouteComponent() {
	// Mock data untuk flashcard
	const dueDateFlashcards = [
		{
			id: 1,
			title: "English Vocabulary - Business",
			description: "Kosakata bisnis dan profesional dalam bahasa Inggris",
			cardCount: 45,
			dueDate: "Hari ini",
			masteryLevel: 72,
			lastReviewed: "2 hari yang lalu",
			category: "Vocabulary",
		},
		{
			id: 2,
			title: "Phrasal Verbs",
			description: "Phrasal verbs umum dan penggunaannya dalam kalimat",
			cardCount: 30,
			dueDate: "Besok",
			masteryLevel: 58,
			lastReviewed: "4 hari yang lalu",
			category: "Verbs",
		},
	];

	const allFlashcards = [
		{
			id: 1,
			title: "English Vocabulary - Business",
			description: "Kosakata bisnis dan profesional dalam bahasa Inggris",
			cardCount: 45,
			dueDate: "Hari ini",
			masteryLevel: 72,
			lastReviewed: "2 hari yang lalu",
			category: "Vocabulary",
			difficulty: "Intermediate",
		},
		{
			id: 2,
			title: "Phrasal Verbs",
			description: "Phrasal verbs umum dan penggunaannya dalam kalimat",
			cardCount: 30,
			dueDate: "Besok",
			masteryLevel: 58,
			lastReviewed: "4 hari yang lalu",
			category: "Verbs",
			difficulty: "Advanced",
		},
		{
			id: 3,
			title: "English Idioms",
			description: "Idioms bahasa Inggris yang sering digunakan",
			cardCount: 25,
			dueDate: "3 hari lagi",
			masteryLevel: 85,
			lastReviewed: "1 minggu yang lalu",
			category: "Expressions",
			difficulty: "Advanced",
		},
		{
			id: 4,
			title: "Basic Grammar Rules",
			description: "Aturan grammar dasar untuk pemula",
			cardCount: 60,
			dueDate: "5 hari lagi",
			masteryLevel: 90,
			lastReviewed: "3 hari yang lalu",
			category: "Grammar",
			difficulty: "Beginner",
		},
		{
			id: 5,
			title: "TOEFL Vocabulary",
			description: "Kosakata khusus untuk persiapan TOEFL",
			cardCount: 100,
			dueDate: "1 hari lagi",
			masteryLevel: 45,
			lastReviewed: "1 minggu yang lalu",
			category: "Test Prep",
			difficulty: "Advanced",
		},
		{
			id: 6,
			title: "Daily Conversation",
			description: "Percakapan sehari-hari dalam bahasa Inggris",
			cardCount: 40,
			dueDate: "2 hari lagi",
			masteryLevel: 78,
			lastReviewed: "5 hari yang lalu",
			category: "Conversation",
			difficulty: "Intermediate",
		},
	];

	const masteredCount = allFlashcards.filter(
		(f) => f.masteryLevel >= 70,
	).length;
	const totalCount = allFlashcards.length;
	const totalCards = allFlashcards.reduce((sum, f) => sum + f.cardCount, 0);

	return (
		<div className="p-6 space-y-6">
			{/* Statistik dan Flashcard Due Date */}
			<div className="space-y-4">
				<h2 className="text-2xl font-bold">Flashcard Review</h2>

				{/* Statistik Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-gray-600">
								Total Deck
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{totalCount}</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-gray-600">
								Total Cards
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{totalCards}</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-gray-600">
								Dikuasai
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-green-600">
								{masteredCount}
							</div>
							<div className="text-sm text-gray-500">
								{Math.round((masteredCount / totalCount) * 100)}% deck
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-gray-600">
								Due Date
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-orange-600">
								{dueDateFlashcards.length}
							</div>
							<div className="text-sm text-gray-500">Perlu review</div>
						</CardContent>
					</Card>
				</div>

				{/* Flashcard Due Date */}
				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<h3 className="text-lg font-semibold">Flashcard Perlu Review</h3>
						<Button>Mulai Repetisi</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{dueDateFlashcards.map((flashcard) => (
							<Card key={flashcard.id} className="border-orange-200 ">
								<CardHeader className="pb-2">
									<div className="flex justify-between items-start">
										<CardTitle className="text-base">
											{flashcard.title}
										</CardTitle>
										<span className="px-2 py-1  text-orange-800 rounded text-xs">
											{flashcard.dueDate}
										</span>
									</div>
									<CardDescription>{flashcard.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span>{flashcard.cardCount} cards</span>
											<span>Mastery: {flashcard.masteryLevel}%</span>
										</div>
										<div className="w-full  rounded-full h-2">
											<div
												className="bg-orange-600 h-2 rounded-full"
												style={{ width: `${flashcard.masteryLevel}%` }}
											></div>
										</div>
										<div className="text-xs text-gray-500">
											Review: {flashcard.lastReviewed}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>

			{/* Search dan Semua Flashcard */}
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-bold">Semua Flashcard</h2>
					<Input placeholder="Cari flashcard..." className="max-w-sm" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{allFlashcards.map((flashcard) => (
						<Card
							key={flashcard.id}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<div className="flex justify-between items-start">
									<CardTitle className="text-lg">{flashcard.title}</CardTitle>
									<span className="px-2 py-1  text-blue-800 rounded text-xs">
										{flashcard.dueDate}
									</span>
								</div>
								<CardDescription>{flashcard.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex gap-2">
										<span className="px-2 py-1  rounded text-xs">
											{flashcard.category}
										</span>
										<span className="px-2 py-1  rounded text-xs">
											{flashcard.difficulty}
										</span>
										<span className="px-2 py-1  text-purple-800 rounded text-xs">
											{flashcard.cardCount} cards
										</span>
									</div>
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span>Mastery: {flashcard.masteryLevel}%</span>
											<span>Review: {flashcard.lastReviewed}</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2">
											<div
												className={`h-2 rounded-full ${
													flashcard.masteryLevel >= 70
														? "bg-green-600"
														: flashcard.masteryLevel >= 40
															? "bg-yellow-600"
															: "bg-red-600"
												}`}
												style={{ width: `${flashcard.masteryLevel}%` }}
											></div>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button variant="outline" className="w-full">
									{flashcard.masteryLevel >= 70 ? "Review" : "Practice"}
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
