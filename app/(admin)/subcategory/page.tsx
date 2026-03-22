'use client'

import { useState } from "react"
import { Plus, Pencil, Trash2, Search, MoreHorizontal, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"


import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"

import { Check, ChevronsUpDown } from "lucide-react"


type Category = {
    id: string
    name: string
}

type Subcategory = {
    id: string
    name: string
    image: string
    categoryId: string
    createdAt: string
    updatedAt: string
}
const categoryList: Category[] = [
    { id: "1", name: "Cars and Vehicles" },
    { id: "2", name: "Phones & Tablets" },
    { id: "3", name: "Computers & Accessories" },
    { id: "4", name: "Electronics & Appliances" },
    { id: "5", name: "House & Land" },
    { id: "6", name: "Jobs" },
    { id: "7", name: "Services" },
    { id: "8", name: "Fashion & Beauty" },
    { id: "9", name: "Furniture & Decor" },
    { id: "10", name: "Books, Sports & hobbies" },
    { id: "11", name: "Pets" },
    { id: "12", name: "Foods" },
]

const initialSubCategories: Subcategory[] = [
    { id: "1", name: "Cars for Sale", image: "/sub-img/cars-for-sale.png", categoryId: "1", createdAt: "2024-01-15", updatedAt: "2024-01-15" },
    { id: "2", name: "Phones", image: "/sub-img/phones.png", categoryId: "2", createdAt: "2024-01-20", updatedAt: "2024-01-20" },
    { id: "3", name: "Laptops", image: "/sub-img/laptops.png", categoryId: "3", createdAt: "2024-02-01", updatedAt: "2024-02-01" },
    { id: "4", name: "Washing Machines & Dryers", image: "/sub-img/washing-machines-dryers.png", categoryId: "4", createdAt: "2024-02-10", updatedAt: "2024-02-10" },
    { id: "5", name: "House For Sale", image: "/sub-img/house-for-sale.png", categoryId: "5", createdAt: "2024-02-15", updatedAt: "2024-02-15" },
    { id: "6", name: "Accounting", image: "/sub-img/accounting.png", categoryId: "6", createdAt: "2024-03-01", updatedAt: "2024-03-01" },
    { id: "7", name: "Financial Services", image: "/sub-img/financial-services.png", categoryId: "7", createdAt: "2024-01-15", updatedAt: "2024-01-15" },
    { id: "8", name: "Women's Fashion", image: "/sub-img/womens-fashion.png", categoryId: "8", createdAt: "2024-01-20", updatedAt: "2024-01-20" },
    { id: "9", name: "Tables & Desks", image: "/sub-img/tables-desks.png", categoryId: "9", createdAt: "2024-02-01", updatedAt: "2024-02-01" },
    { id: "10", name: "Musical Instruments", image: "/sub-img/musical-instruments.png", categoryId: "10", createdAt: "2024-02-10", updatedAt: "2024-02-10" },
    { id: "11", name: "Dogs", image: "/sub-img/dogs.png", categoryId: "11", createdAt: "2024-02-15", updatedAt: "2024-02-15" },
    { id: "12", name: "Meat", image: "/sub-img/meat.png", categoryId: "12", createdAt: "2024-03-01", updatedAt: "2024-03-01" },
]


export default function SubcategoryPage() {
    const [subcategories, setSubCategories] = useState<Subcategory[]>(initialSubCategories)
    const [searchQuery, setSearchQuery] = useState("")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedSubCategory, setSelectedSubCategory] = useState<Subcategory | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        categoryId: "",
    })

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const filteredSubCategories = subcategories.filter(
        (subcategory) =>
            subcategory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subcategory.image.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const totalPages = Math.ceil(filteredSubCategories.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const paginatedSubCategories = filteredSubCategories.slice(startIndex, startIndex + rowsPerPage)
    const handleAdd = () => {
        const newSubCategory: Subcategory = {
            id: String(Date.now()),
            name: formData.name,
            image: formData.image,
            categoryId: formData.categoryId,
            createdAt: new Date().toISOString().split("T")[0],
            updatedAt: ""
        }
        setSubCategories([...subcategories, newSubCategory])
        setFormData({ name: "", image: "", categoryId: "" })
        setIsAddDialogOpen(false)
    }

    const handleEdit = () => {
        if (!selectedSubCategory) return

        setSubCategories(
            subcategories.map((c) =>
                c.id === selectedSubCategory.id
                    ? {
                        ...c,
                        name: formData.name,
                        image: formData.image,
                        categoryId: formData.categoryId,
                        updatedAt: new Date().toISOString().split("T")[0], // ✅ FIX
                    }
                    : c
            )
        )

        setFormData({ name: "", image: "", categoryId: "" })
        setSelectedSubCategory(null)
        setIsEditDialogOpen(false)
    }

    const handleDelete = () => {
        if (!selectedSubCategory) return
        setSubCategories(subcategories.filter((c) => c.id !== selectedSubCategory.id))
        setSelectedSubCategory(null)
        setIsDeleteDialogOpen(false)
    }

    const openEditDialog = (subcategory: Subcategory) => {
        setSelectedSubCategory(subcategory)
        setFormData({ name: subcategory.name, image: subcategory.image, categoryId: subcategory.categoryId })
        setIsEditDialogOpen(true)
    }

    const openDeleteDialog = (subcategory: Subcategory) => {
        setSelectedSubCategory(subcategory)
        setIsDeleteDialogOpen(true)
    }

    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>SubCategory</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <main className="flex-1 overflow-auto p-6 min-w-0">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">Sub Categories</h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your product sub categories
                            </p>
                        </div>

                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 size-4" />
                                    Add Sub Category
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Sub Category</DialogTitle>
                                    <DialogDescription>
                                        Create a new sub category for your products.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label>Name</Label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Image</Label>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) {
                                                    const imageUrl = URL.createObjectURL(file)
                                                    setFormData({ ...formData, image: imageUrl })
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Sub Category</Label>

                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="cursor-pointer" >
                                                    {formData.categoryId
                                                        ? categoryList.find((c) => c.id === formData.categoryId)?.name
                                                        : "Select category..."}

                                                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className="p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search category..." />
                                                    <CommandEmpty>No sub category found.</CommandEmpty>

                                                    <CommandGroup>
                                                        {categoryList.map((cat) => (
                                                            <CommandItem
                                                                key={cat.id}
                                                                value={cat.name}
                                                                onSelect={() => {
                                                                    setFormData({ ...formData, categoryId: cat.id })
                                                                    setOpen(false)
                                                                }}
                                                            >
                                                                {cat.name}

                                                                {formData.categoryId === cat.id && (
                                                                    <Check className="ml-auto h-4 w-4" />
                                                                )}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleAdd}>Add</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    <div className="rounded-lg border border-border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Updated</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedSubCategories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-32 text-center">
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <Search className="size-8" />
                                                <p>No sub category found</p>
                                                {searchQuery && (
                                                    <p className="text-sm">
                                                        No results for &quot;{searchQuery}&quot;
                                                    </p>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : null}
                                {paginatedSubCategories.map((subcategory) => (
                                    <TableRow key={subcategory.id}>
                                        <TableCell>{subcategory.id}</TableCell>

                                        <TableCell>{subcategory.name}</TableCell>

                                        <TableCell>
                                            <img
                                                src={subcategory.image}
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                        </TableCell>

                                        <TableCell>
                                            {
                                                categoryList.find((cat) => cat.id === subcategory.categoryId)?.name
                                            }
                                        </TableCell>

                                        <TableCell>{subcategory.createdAt}</TableCell>

                                        <TableCell>{subcategory.updatedAt}</TableCell>

                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" size="icon">
                                                        <MoreHorizontal />
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => openEditDialog(subcategory)}>
                                                        <Pencil className="mr-2 size-4" />
                                                        Edit
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(subcategory)}>
                                                        <Trash2 className="mr-2 size-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t px-4 py-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                Rows per page
                                <Select
                                    value={rowsPerPage.toString()}
                                    onValueChange={(value) => {
                                        setRowsPerPage(Number(value))
                                        setCurrentPage(1)
                                    }}
                                >
                                    <SelectTrigger className="h-8 w-[70px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="size-8"
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronsLeft className="size-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="size-8"
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="size-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="size-8"
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronRight className="size-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="size-8"
                                        onClick={() => setCurrentPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronsRight className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Sub Category</DialogTitle>
                        <DialogDescription>
                            Make changes to the sub category details.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-image">Image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        const imageUrl = URL.createObjectURL(file)
                                        setFormData({ ...formData, image: imageUrl })
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEdit}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Category</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete &quot;{selectedSubCategory?.name}&quot;? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}