import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_authed/suplement/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [searchTerm, setSearchTerm] = useState("");

	const quizzes = [
		{
			id: 1,
			title: "Nutrisi Dasar",
			description: "Tes pengetahuan tentang nutrisi makanan",
			questions: 10,
			difficulty: "Mudah",
		},
		{
			id: 2,
			title: "Vitamin dan Mineral",
			description: "Kenali berbagai jenis vitamin dan mineral",
			questions: 15,
			difficulty: "Sedang",
		},
		{
			id: 3,
			title: "Diet Sehat",
			description: "Pola makan sehat untuk tubuh",
			questions: 12,
			difficulty: "Mudah",
		},
		{
			id: 4,
			title: "Metabolisme Tubuh",
			description: "Bagaimana tubuh memproses makanan",
			questions: 20,
			difficulty: "Sulit",
		},
		{
			id: 5,
			title: "Suplementasi",
			description: "Pengetahuan tentang suplemen makanan",
			questions: 8,
			difficulty: "Sedang",
		},
		{
			id: 6,
			title: "Hidrasi",
			description: "Pentingnya air untuk kesehatan",
			questions: 10,
			difficulty: "Mudah",
		},
	]

	const filteredQuizzes = quizzes.filter((quiz) =>
		quiz.title.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "Mudah":
				return "bg-green-100 text-green-800";
			case "Sedang":
				return "bg-yellow-100 text-yellow-800";
			case "Sulit":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	}

	return (
		<div className="p-6 max-w-6xl mx-auto">
			<h1 className="text-3xl font-bold text-center mb-8">Suplement Center</h1>

			<div className="mb-8">
				<input
					type="text"
					placeholder="Cari quiz..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredQuizzes.map((quiz) => (
					<div
						key={quiz.id}
						className=" bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
					>
						<h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
						<p className=" mb-4">{quiz.description}</p>
						<div className="flex justify-between items-center mb-4">
							<span className="text-sm ">{quiz.questions} soal</span>
							<span
								className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}
							>
								{quiz.difficulty}
							</span>
						</div>
						<button
							type="button"
							className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
						>
							Mulai Quiz
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
