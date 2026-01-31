import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard/")({
	component: DashboardComponent,
});

function DashboardComponent() {
	const { user } = Route.useRouteContext();

	return (
		<div className="min-h-screen p-6">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold  mb-2">
						Selamat datang kembali, {user?.email || "User"}!
					</h1>
					<p>Lanjutkan learning path Anda dan raih kemajuan hari ini.</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<div className=" rounded-lg shadow-md p-6 bg-gray-900">
						<h2 className="text-xl font-semibold  mb-4">Vocabulary</h2>
						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="">Due Date:</span>
								<span className="text-2xl font-bold text-blue-600">12</span>
							</div>
							<div className="flex justify-between items-center">
								<span>Telah Dihapalkan:</span>
								<span className="text-2xl font-bold text-green-600">48</span>
							</div>
							<button
								type="button"
								className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
							>
								Repetisi Due Date
							</button>
						</div>
					</div>

					<div className="bg-gray-900 rounded-lg shadow-md p-6">
						<h2 className="text-xl font-semibold  mb-4">Grammar</h2>
						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<span>Due Date:</span>
								<span className="text-2xl font-bold text-purple-600">8</span>
							</div>
							<div className="flex justify-between items-center">
								<span>Telah Dihapalkan:</span>
								<span className="text-2xl font-bold text-green-600">32</span>
							</div>
							<button
								type="button"
								className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
							>
								Repetisi Grammar Due Date
							</button>
						</div>
					</div>
				</div>

				<div>
					<h2 className="text-2xl font-bold mb-6">Learning Paths Anda</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="bg-gray-900 rounded-lg shadow-md p-6">
							<div className="mb-4">
								<h3 className="text-lg font-semibold  mb-2">
									Basic English Conversation
								</h3>
								<p className="text-sm ">
									Master dasar percakapan bahasa Inggris untuk pemula
								</p>
							</div>
							<div className="mb-4">
								<div className="flex justify-between text-sm  mb-1">
									<span>Progress</span>
									<span>65%</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-blue-500 h-2 rounded-full"
										style={{ width: "65%" }}
									></div>
								</div>
							</div>
							<button
								type="button"
								className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
							>
								Lanjutkan Learning
							</button>
						</div>

						<div className="bg-gray-900 rounded-lg shadow-md p-6">
							<div className="mb-4">
								<h3 className="text-lg font-semibold  mb-2">
									Business English
								</h3>
								<p className="text-sm ">
									Tingkatkan kemampuan bahasa Inggris untuk dunia bisnis
								</p>
							</div>
							<div className="mb-4">
								<div className="flex justify-between text-sm  mb-1">
									<span>Progress</span>
									<span>42%</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-purple-500 h-2 rounded-full"
										style={{ width: "42%" }}
									></div>
								</div>
							</div>
							<button
								type="button"
								className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
							>
								Lanjutkan Learning
							</button>
						</div>

						<div className="bg-gray-900 rounded-lg shadow-md p-6">
							<div className="mb-4">
								<h3 className="text-lg font-semibold mb-2">
									IELTS Preparation
								</h3>
								<p className="text-sm ">
									Siapkan diri Anda untuk tes IELTS dengan materi komprehensif
								</p>
							</div>
							<div className="mb-4">
								<div className="flex justify-between text-sm  mb-1">
									<span>Progress</span>
									<span>28%</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-orange-500 h-2 rounded-full"
										style={{ width: "28%" }}
									></div>
								</div>
							</div>
							<button
								type="button"
								className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
							>
								Lanjutkan Learning
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
