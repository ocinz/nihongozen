import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BookOpen, GraduationCap, Languages, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col">
			{/* Navigation */}
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
					<Link to="/" className="flex items-center gap-2">
						<span className="text-2xl font-bold tracking-tight text-primary">
							NihongoZen
						</span>
					</Link>
					<nav className="flex items-center gap-4">
						<Link to="/login">
							<Button variant="ghost">Login</Button>
						</Link>
						<Link to="/register">
							<Button>Get Started</Button>
						</Link>
					</nav>
				</div>
			</header>

			<main className="flex-1">
				{/* Hero Section */}
				<section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
					<div className="container mx-auto px-4 md:px-8 relative z-10">
						<div className="max-w-3xl">
							<h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
								Master Japanese & <br /> Professional Skills
							</h1>
							<p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
								Your all-in-one platform for language mastery and SSW certification.
								Immersive courses, real-world practice, and career-ready training
								designed for the modern learner.
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Link to="/register">
									<Button size="lg" className="h-12 px-8 text-lg gap-2 cursor-pointer">
										Start Learning Now <ArrowRight className="w-5 h-5" />
									</Button>
								</Link>
								<Button size="lg" variant="outline" className="h-12 px-8 text-lg cursor-pointer">
									Explore Courses
								</Button>
							</div>
						</div>
					</div>
					{/* Decorative background element */}
					<div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none">
						<div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
					</div>
				</section>

				{/* Features Section */}
				<section className="py-24 bg-muted/30">
					<div className="container mx-auto px-4 md:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold mb-4">Why choose NihongoZen?</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								We combine traditional pedagogical methods with modern technology
								to give you the best learning experience.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-background">
								<CardHeader>
									<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
										<Languages className="w-6 h-6" />
									</div>
									<CardTitle className="text-xl font-bold">Immersive Language</CardTitle>
									<CardDescription className="text-base">
										Focus on real-world phrases and conversational Japanese
										that you'll actually use.
									</CardDescription>
								</CardHeader>
								<CardContent className="text-sm text-muted-foreground">
									From JLPT N5 to N1, our curriculum adapts to your current level
									and goals.
								</CardContent>
							</Card>

							<Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-background">
								<CardHeader>
									<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
										<GraduationCap className="w-6 h-6" />
									</div>
									<CardTitle className="text-xl font-bold">SSW Preparation</CardTitle>
									<CardDescription className="text-base">
										Specialized training for Specified Skilled Worker
										exams in various industries.
									</CardDescription>
								</CardHeader>
								<CardContent className="text-sm text-muted-foreground">
									Get the certifications you need to start your career
									journey in Japan.
								</CardContent>
							</Card>

							<Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-background">
								<CardHeader>
									<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
										<BookOpen className="w-6 h-6" />
									</div>
									<CardTitle className="text-xl font-bold">Skill Supplements</CardTitle>
									<CardDescription className="text-base">
										Go beyond language with additional vocational skills
										highly valued in the Japanese market.
									</CardDescription>
								</CardHeader>
								<CardContent className="text-sm text-muted-foreground">
									Business etiquette, workplace communication, and technical
									terminology.
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-24">
					<div className="container mx-auto px-4 md:px-8 text-center">
						<div className="bg-primary text-primary-foreground rounded-3xl p-12 md:p-20 relative overflow-hidden">
							<h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to start your journey?</h2>
							<p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto relative z-10">
								Join thousands of students mastering Japanese and building
								their future today.
							</p>
							<Link to="/register" className="relative z-10">
								<Button size="lg" variant="secondary" className="h-12 px-10 text-lg font-semibold cursor-pointer">
									Get Started for Free
								</Button>
							</Link>
							{/* Abstract background shapes */}
							<div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
							<div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
						</div>
					</div>
				</section>
			</main>

			<footer className="border-t py-12 bg-muted/20">
				<div className="container mx-auto px-4 md:px-8">
					<div className="flex flex-col md:flex-row justify-between items-center gap-6">
						<div>
							<span className="text-xl font-bold tracking-tight">NihongoZen</span>
							<p className="text-sm text-muted-foreground mt-2 italic">
								Dibuat dengan ❤️ oleh ocinz.
							</p>
						</div>
						<div className="flex gap-8 text-sm text-muted-foreground">
							<a href="#" className="hover:text-primary transition-colors cursor-pointer">Privacy</a>
							<a href="#" className="hover:text-primary transition-colors cursor-pointer">Terms</a>
							<a href="#" className="hover:text-primary transition-colors cursor-pointer">Contact</a>
						</div>
						<div className="text-sm text-muted-foreground">
							&copy; {new Date().getFullYear()} NihongoZen. All rights reserved.
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}