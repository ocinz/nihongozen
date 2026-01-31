import { createFileRoute, Link } from "@tanstack/react-router";
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Edit2, Play } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { LearningPath } from "@/generated/prisma/client";
import { CreateLearningPathDialog } from "./-components/create";
import { DeleteLearningPathDialog } from "./-components/delete";
import { UpdateLearningPathDialog } from "./-components/update";
import { useGetlearningPathsHook } from "./-hooks";

export const Route = createFileRoute("/_authed/management/learning-path/")({
	component: RouteComponent,
});

function RouteComponent() {
	const columns: ColumnDef<LearningPath>[] = [
		{
			header: "No",
			cell: ({ row }) => (
				<div className="capitalize max-w-1/12">{row.index + 1}</div>
			),
		},
		{
			accessorKey: "title",
			header: "Judul",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("title")}</div>
			),
		},
		{
			accessorKey: "level",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Level
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ row }) => <div>{row.getValue("level")}</div>,
		},
		{
			accessorKey: "id",
			header: "Action",
			cell: ({ row }) => (
				<div className=" space-x-1 max-w-2/12">
					<Link
						to={`/management/learning-path/${row.getValue("id")}` as string}
					>
						<Button size={"sm"} className=" hover:cursor-pointer">
							<Play />
						</Button>
					</Link>
					<UpdateLearningPathDialog learningPath={row.original} />
					<DeleteLearningPathDialog id={row.original.id} />
				</div>
			),
		},
	];
	const { data } = useGetlearningPathsHook();
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const table = useReactTable({
		data: data ?? [],
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});
	return (
		<div className="w-full text-foreground">
			<div className="flex items-center py-4 justify-between">
				<Input
					placeholder="Filter judul..."
					value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("title")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<div className=" flex items-center gap-x-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="ml-auto hover:cursor-pointer">
								Columns <ChevronDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
					<CreateLearningPathDialog />
				</div>
			</div>
			<div className="overflow-hidden rounded-md ">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="space-x-2">
					<Button
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
