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


type Category = {
  id: string
  name: string
  image: string
  createdAt: string
  updatedAt: string

}

const initialCategories: Category[] = [
  { id: "1", name: "Cars and Vehicles", image: "/cate-img/car-vehicles.png", createdAt: "2024-01-15", updatedAt: "2024-01-15" },
  { id: "2", name: "Phones & Tablets", image: "/cate-img/phones-tablets.png", createdAt: "2024-01-20", updatedAt: "2024-01-20" },
  { id: "3", name: "Computers & Accessories", image: "/cate-img/computers-accessories.png", createdAt: "2024-02-01", updatedAt: "2024-02-01" },
  { id: "4", name: "Electronics & Appliances", image: "/cate-img/electronics-appliances.png", createdAt: "2024-02-10", updatedAt: "2024-02-10" },
  { id: "5", name: "House & Land", image: "/cate-img/house-land.png", createdAt: "2024-02-15", updatedAt: "2024-02-15" },
  { id: "6", name: "Jobs", image: "/cate-img/jobs.png", createdAt: "2024-03-01", updatedAt: "2024-03-01" },
  { id: "7", name: "Services", image: "/cate-img/services.png", createdAt: "2024-01-15", updatedAt: "2024-01-15" },
  { id: "8", name: "Fashion & Beauty", image: "/cate-img/fashion-beauty.png", createdAt: "2024-01-20", updatedAt: "2024-01-20" },
  { id: "9", name: "Furniture & Decor", image: "/cate-img/furniture-decor.png", createdAt: "2024-02-01", updatedAt: "2024-02-01" },
  { id: "10", name: "Books, Sports & hobbies", image: "/cate-img/books-sports-hobbies.png", createdAt: "2024-02-10", updatedAt: "2024-02-10" },
  { id: "11", name: "Pets", image: "/cate-img/pets.png", createdAt: "2024-02-15", updatedAt: "2024-02-15" },
  { id: "12", name: "Foods", image: "/cate-img/foods.png", createdAt: "2024-03-01", updatedAt: "2024-03-01" },
]

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    image: ""
  })

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.image.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAdd = () => {
    const newCategory: Category = {
      id: String(Date.now()),
      name: formData.name,
      image: formData.image,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],

    }
    setCategories([...categories, newCategory])
    setFormData({ name: "", image: "" })
    setIsAddDialogOpen(false)
  }

  const handleEdit = () => {
    if (!selectedCategory) return
    setCategories(
      categories.map((c) =>
        c.id === selectedCategory.id
          ? {
            ...c,
            name: formData.name,
            image: formData.image,
            updatedAt: new Date().toISOString().split("T")[0],
          }
          : c
      )
    )
    setFormData({ name: "", image: "" })
    setSelectedCategory(null)
    setIsEditDialogOpen(false)
  }

  const handleDelete = () => {
    if (!selectedCategory) return
    setCategories(categories.filter((c) => c.id !== selectedCategory.id))
    setSelectedCategory(null)
    setIsDeleteDialogOpen(false)
  }

  const openEditDialog = (category: Category) => {
    setSelectedCategory(category)
    setFormData({ name: category.name, image: category.image })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (category: Category) => {
    setSelectedCategory(category)
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
              <BreadcrumbPage>Category</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex-1 overflow-auto p-6 min-w-0">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
              <p className="text-sm text-muted-foreground">
                Manage your product categories
              </p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 size-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Create a new category for your products.
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
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <img
                        src={category.image}
                        className="w-10 h-10 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>{category.createdAt}</TableCell>
                    <TableCell>{category.updatedAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon" className="cursor-pointer" >
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => openEditDialog(category)}>
                            <Pencil className="mr-2 size-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(category)}>
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
          </div>
        </div>
      </main>
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Make changes to the category details.
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
              Are you sure you want to delete &quot;{selectedCategory?.name}&quot;? This action cannot be undone.
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