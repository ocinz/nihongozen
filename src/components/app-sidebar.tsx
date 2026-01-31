"use client";

import { Link } from "@tanstack/react-router";
import {
	BookOpen,
	Bot,
	Command,
	Frame,
	LifeBuoy,
	PieChart,
	Send,
	Settings2,
	SquareTerminal,
} from "lucide-react";
import type * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ScrollArea } from "./ui/scroll-area";

const data = {
	user: {
		name: "Kokage",
		email: "kokage@kokage.tech",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: SquareTerminal,
			// isActive: true,
			// items: [
			// 	{
			// 		title: "JLPT N5",
			// 		url: "/learning-path/",
			// 	},
			// 	{
			// 		title: "JLPT N4",
			// 		url: "/learning-path",
			// 	},
			// 	{
			// 		title: "JLPT N3",
			// 		url: "/learning-path",
			// 	},
			// ],
		},
		{
			title: "Learning Path",
			url: "/learning-path",
			icon: SquareTerminal,
			isActive: true,
			// items: [
			// 	{
			// 		title: "JLPT N5",
			// 		url: "/learning-path/",
			// 	},
			// 	{
			// 		title: "JLPT N4",
			// 		url: "/learning-path",
			// 	},
			// 	{
			// 		title: "JLPT N3",
			// 		url: "/learning-path",
			// 	},
			// ],
		},
		{
			title: "Grammar",
			url: "/grammar",
			icon: Bot,
			// items: [
			// 	{
			// 		title: "Genesis",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Explorer",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Quantum",
			// 		url: "#",
			// 	},
			// ],
		},
		{
			title: "Flashcard",
			url: "/flashcard",
			icon: BookOpen,
			// items: [
			// 	{
			// 		title: "Introduction",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Get Started",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Tutorials",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Changelog",
			// 		url: "#",
			// 	},
			// ],
		},
		{
			title: "Suplement",
			url: "/suplement",
			icon: BookOpen,
			// items: [
			// 	{
			// 		title: "Introduction",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Get Started",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Tutorials",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Changelog",
			// 		url: "#",
			// 	},
			// ],
		},
		{
			title: "Quiz",
			url: "/quiz",
			icon: Settings2,
			// items: [
			// 	{
			// 		title: "General",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Team",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Billing",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Limits",
			// 		url: "#",
			// 	},
			// ],
		},
		{
			title: "Tryout",
			url: "/tryout",
			icon: Settings2,
			// items: [
			// 	{
			// 		title: "General",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Team",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Billing",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Limits",
			// 		url: "#",
			// 	},
			// ],
		},
		{
			title: "Leaderboard",
			url: "/leaderboard",
			icon: Settings2,
			// items: [
			// 	{
			// 		title: "General",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Team",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Billing",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Limits",
			// 		url: "#",
			// 	},
			// ],
		},
	],
	// navSecondary: [
	// 	{
	// 		title: "Support",
	// 		url: "#",
	// 		icon: LifeBuoy,
	// 	},
	// 	{
	// 		title: "Feedback",
	// 		url: "#",
	// 		icon: Send,
	// 	},
	// ],
	management: [
		{
			title: "Learning Path",
			url: "/management/learning-path",
			icon: PieChart,
		},
		{
			title: "Grammar",
			url: "/management/grammar",
			icon: PieChart,
		},
		{
			title: "Flashcard",
			url: "/management/flashcard",
			icon: PieChart,
		},
		{
			title: "Quiz",
			url: "/management/quiz",
			icon: Frame,
		},
		{
			title: "Suplement",
			url: "/management/suplement",
			icon: Frame,
		},
		{
			title: "Tryout",
			url: "/management/tryout",
			icon: Frame,
		},
		{
			title: "Bootcamp",
			url: "/management/bootcamp",
			icon: Frame,
		},
	],
	administration: [
		{
			title: "Staff Management",
			url: "/administration/staff",
			icon: Frame,
		},
		{
			title: "User Management",
			url: "/administration/user",
			icon: Frame,
		},
		{
			title: "Pricing",
			url: "/administration/pricing",
			icon: PieChart,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link to="/">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">NihongoZen</span>
									<span className="truncate text-xs">Learning Platform</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<ScrollArea className=" h-full">
					<NavMain label="Platform" items={data.navMain} />
					<NavMain label="Management" items={data.management} />
					<NavMain label="Admin" items={data.administration} />
					{/* <NavProjects projects={data.projects} /> */}
					{/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
				</ScrollArea>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
