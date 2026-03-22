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


type AttributeItem = {
    name: string
    image?: string
}

type Attribute = {
    id: string
    brand?: { name: string; image: string }
    model?: string
    bodyType?: { name: string; image: string }
    engine?: string
    subcategoryId: string
    createdAt: string
    updatedAt?: string
}
type SubCategory = {
    id: string
    name: string
}
const brandImages: Record<string, string> = {
    Toyota: "/brand/toyota.png",
    Honda: "/brand/honda.png",
    BMW: "/brand/bmw.png",
}

const modelImages: Record<string, string> = {
    Camry: "/model/camry.png",
    Civic: "/model/civic.png",
}

const bodyTypeImages: Record<string, string> = {
    SUV: "/body/suv.png",
    Sedan: "/body/sedan.png",
}
const subCategoryList: SubCategory[] = [
    { id: "1", name: "Cars for Sale" },
    { id: "2", name: "Phones" },
    { id: "3", name: "Laptops" },
    { id: "4", name: "Washing Machines & Dryers" },
    { id: "5", name: "House For Sale" },
    { id: "6", name: "Accounting" },
    { id: "7", name: "Financial Services" },
    { id: "8", name: "Women's Fashion" },
    { id: "9", name: "Tables & Desks" },
    { id: "10", name: "Musical Instruments" },
    { id: "11", name: "Dogs" },
    { id: "12", name: "Meat" },
]


export default function AttributePage() {
    const [attributes, setAttributes] = useState<Attribute[]>([
        {
            id: "1",
            brand: { name: "MG", image: "/brand/mg.png" },
            model: "RX8",
            bodyType: { name: "Sedan", image: "/bodytype/sedan.png" },
            engine: "V6",
            subcategoryId: "1",
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01",
        },
        {
            id: "2",
            brand: { name: "Apple", image: "/brand/apple.png" },
            model: "iphone 15 Pro",
            bodyType: undefined,
            engine: "",
            subcategoryId: "2",
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01",
        },
        {
            id: "3",
            brand: { name: "MSI", image: "/brand/msi.png" },
            model: "",
            bodyType: undefined,
            engine: undefined,
            subcategoryId: "3",
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01",
        },
        {
            id: "4",
            brand: undefined,
            model: undefined,
            bodyType: { name: "Flat", image: "/bodytype/flat.png" },
            engine: undefined,
            subcategoryId: "5",
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01",
        },
        {
            id: "5",
            brand: { name: "Accounting", image: "/brand/accounting.png" },
            model: undefined,
            bodyType: { name: "Full-time", image: "/bodytype/full-time.png" },
            engine: undefined,
            subcategoryId: "6",
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01",
        }
    ])
    const [searchQuery, setSearchQuery] = useState("")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [formData, setFormData] = useState({
        brandName: "",
        brandImage: "",
        modelName: "",
        modelImage: "",
        bodyTypeName: "",
        bodyTypeImage: "",
        engine: "",
        subcategoryId: "",
    })

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const filteredAttributes = attributes.filter((attr) =>
        (attr.brand?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (attr.model || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (attr.bodyType?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (attr.engine || "").toLowerCase().includes(searchQuery.toLowerCase())
    )
    const totalPages = Math.ceil(filteredAttributes.length / rowsPerPage)

    const startIndex = (currentPage - 1) * rowsPerPage

    const paginatedAttributes = filteredAttributes.slice(
        startIndex,
        startIndex + rowsPerPage
    )


    const handleAdd = () => {
        const newAttr: Attribute = {
            id: String(Date.now()),

            brand: formData.brandName
                ? {
                    name: formData.brandName,
                    image: brandImages[formData.brandName] || "/no-image.png",
                }
                : undefined,

            model: formData.modelName,

            bodyType: formData.bodyTypeName
                ? {
                    name: formData.bodyTypeName,
                    image: bodyTypeImages[formData.bodyTypeName] || "/no-image.png",
                }
                : undefined,

            engine: formData.engine || undefined,
            subcategoryId: formData.subcategoryId,
            createdAt: new Date().toISOString().split("T")[0],
            updatedAt: "",
        }

        setAttributes((prev) => [...prev, newAttr])

        setFormData({
            brandName: "",
            brandImage: "",
            modelName: "",
            modelImage: "",
            bodyTypeName: "",
            bodyTypeImage: "",
            engine: "",
            subcategoryId: "",
        })

        setIsAddDialogOpen(false)
    }
    const handleEdit = () => {
        if (!selectedAttribute) return

        setAttributes(
            attributes.map((attr) =>
                attr.id === selectedAttribute.id
                    ? {
                        ...attr,

                        brand: formData.brandName
                            ? {
                                name: formData.brandName,
                                image: formData.brandImage || "/no-image.png",
                            }
                            : undefined,

                        model: formData.modelName,

                        bodyType: formData.bodyTypeName
                            ? {
                                name: formData.bodyTypeName,
                                image: formData.bodyTypeImage || "/no-image.png",
                            }
                            : undefined,

                        engine: formData.engine || undefined,
                        subcategoryId: formData.subcategoryId,
                        updatedAt: new Date().toISOString().split("T")[0],
                    }
                    : attr
            )
        )

        setIsEditDialogOpen(false)
    }

    const handleDelete = () => {
        if (!selectedAttribute) return

        setAttributes(attributes.filter((c) => c.id !== selectedAttribute.id))
        setSelectedAttribute(null)
        setIsDeleteDialogOpen(false)
    }

    const openEditDialog = (attribute: Attribute) => {
        setSelectedAttribute(attribute)

        setFormData({
            brandName: attribute.brand?.name || "",
            brandImage: attribute.brand?.image || "",
            modelName: attribute.model || "",
            modelImage: "",
            bodyTypeName: attribute.bodyType?.name || "",
            bodyTypeImage: attribute.bodyType?.image || "",
            engine: attribute.engine || "",
            subcategoryId: attribute.subcategoryId,
        })

        setIsEditDialogOpen(true)
    }

    const openDeleteDialog = (attribute: Attribute) => {
        setSelectedAttribute(attribute)
        setIsDeleteDialogOpen(true)
    }
    const handleImageUpload = (file: File, field: string) => {
        const reader = new FileReader()

        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                [field]: reader.result as string,
            }))
        }

        reader.readAsDataURL(file)
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
                            <BreadcrumbPage>Attribute</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <main className="flex-1 overflow-auto p-6 min-w-0">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">Attributes</h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your product attributes
                            </p>
                        </div>

                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 size-4" />
                                    Add Attribute
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Attribute</DialogTitle>
                                    <DialogDescription>
                                        Create a new attribute for your products.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label> Brand Name</Label>
                                        <Input
                                            value={formData.brandName}
                                            onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Brand Image</Label>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) {
                                                    const imageUrl = URL.createObjectURL(file)
                                                    setFormData({ ...formData, brandImage: imageUrl })
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Model Name</Label>
                                        <Input
                                            value={formData.modelName}
                                            onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Model Image</Label>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) {
                                                    const imageUrl = URL.createObjectURL(file)
                                                    setFormData({ ...formData, modelImage: imageUrl })
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Body Type</Label>
                                        <Input
                                            value={formData.bodyTypeName}
                                            onChange={(e) => setFormData({ ...formData, bodyTypeName: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Body Type Image</Label>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) {
                                                    const imageUrl = URL.createObjectURL(file)
                                                    setFormData({ ...formData, bodyTypeImage: imageUrl })
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Engine</Label>
                                        <Input
                                            value={formData.engine}
                                            onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Select Sub Category</Label>

                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="w-full">
                                                    {formData.subcategoryId
                                                        ? subCategoryList.find((c) => c.id === formData.subcategoryId)?.name
                                                        : "Select sub category..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className="p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search..." />
                                                    <CommandGroup>
                                                        {subCategoryList.map((cat) => (
                                                            <CommandItem
                                                                key={cat.id}
                                                                value={cat.name}
                                                                onSelect={() => {
                                                                    setFormData({ ...formData, subcategoryId: cat.id })
                                                                    setOpen(false)
                                                                }}
                                                            >
                                                                {cat.name}
                                                                {formData.subcategoryId === cat.id && (
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
                                    <TableHead>Brand</TableHead>
                                    <TableHead>Model</TableHead>
                                    <TableHead>Body Type</TableHead>
                                    <TableHead>Engine</TableHead>
                                    <TableHead>Subcategory</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Updated At</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedAttributes.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-32 text-center">
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <Search className="size-8" />
                                                <p>No Attribute found</p>
                                                {searchQuery && (
                                                    <p className="text-sm">
                                                        No results for &quot;{searchQuery}&quot;
                                                    </p>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : null}
                                {paginatedAttributes.map((attr) => (
                                    <TableRow key={attr.id}>
                                        <TableCell>{attr.id}</TableCell>

                                        {/* BRAND */}
                                        <TableCell>
                                            {attr.brand ? (
                                                <div className="flex items-center gap-2">
                                                    <img src={attr.brand.image} className="w-8 h-8 rounded" />
                                                    {attr.brand.name}
                                                </div>
                                            ) : "-"}
                                        </TableCell>

                                        {/* MODEL */}
                                        <TableCell>
                                            {attr.model ? (
                                                <div className="flex items-center gap-2">
                                                    {attr.model}
                                                </div>
                                            ) : "-"}
                                        </TableCell>

                                        {/* BODY TYPE */}
                                        <TableCell>
                                            {attr.bodyType ? (
                                                <div className="flex items-center gap-2">
                                                    <img src={attr.bodyType.image} className="w-8 h-8 rounded" />
                                                    {attr.bodyType.name}
                                                </div>
                                            ) : "-"}
                                        </TableCell>

                                        {/* ENGINE */}
                                        <TableCell>{attr.engine || "-"}</TableCell>

                                        {/* SUBCATEGORY */}
                                        <TableCell>
                                            {subCategoryList.find(s => s.id === attr.subcategoryId)?.name}
                                        </TableCell>

                                        <TableCell>{attr.createdAt}</TableCell>
                                        <TableCell>{attr.updatedAt || "-"}</TableCell>

                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" size="icon">
                                                        <MoreHorizontal />
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => openEditDialog(attr)}>
                                                        <Pencil className="mr-2 size-4" />
                                                        Edit
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        className="text-destructive"
                                                        onClick={() => openDeleteDialog(attr)}
                                                    >
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
                        <DialogTitle>Edit Attribute</DialogTitle>
                        <DialogDescription>
                            Make changes to the Attribute details.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name"> Brand Name</Label>
                            {/* BRAND */}
                            <Input placeholder="Brand Name"
                                value={formData.brandName}
                                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                            />
                            <Label htmlFor="edit-name">Brand Image</Label>
                            <Input type="file" onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    setFormData({ ...formData, brandImage: URL.createObjectURL(file) })
                                }
                            }} />

                            {/* MODEL */}
                            <Label htmlFor="edit-name">Model Name</Label>
                            <Input placeholder="Model Name"
                                value={formData.modelName}
                                onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                            />

                            {/* BODY TYPE */}
                            <Label htmlFor="edit-name">Body Type</Label>
                            <Input placeholder="Body Type"
                                value={formData.bodyTypeName}
                                onChange={(e) => setFormData({ ...formData, bodyTypeName: e.target.value })}
                            />
                            <Label htmlFor="edit-name">Body Type Image</Label>
                            <Input type="file" onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    setFormData({ ...formData, bodyTypeImage: URL.createObjectURL(file) })
                                }
                            }} />

                            {/* ENGINE */}
                            <Label htmlFor="edit-name">Engine</Label>
                            <Input placeholder="Engine"
                                value={formData.engine}
                                onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                            />
                        </div>
                    </div>
                    <Label htmlFor="edit-name"> Select Sub Category</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full">
                                {formData.subcategoryId
                                    ? subCategoryList.find((c) => c.id === formData.subcategoryId)?.name
                                    : "Select sub category..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder="Search..." />
                                <CommandGroup>
                                    {subCategoryList.map((cat) => (
                                        <CommandItem
                                            key={cat.id}
                                            value={cat.name}
                                            onSelect={() => {
                                                setFormData({ ...formData, subcategoryId: cat.id })
                                                setOpen(false)
                                            }}
                                        >
                                            {cat.name}
                                            {formData.subcategoryId === cat.id && (
                                                <Check className="ml-auto h-4 w-4" />
                                            )}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
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
                        <DialogTitle>Delete Attribute</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete &quot;{selectedAttribute?.brand?.name}&quot;? This action cannot be undone.
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