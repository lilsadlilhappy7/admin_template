'use client'

import { useState } from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreVertical, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

type User = {
    id: string
    name: string
    email: string
    avatar: string
    phone: string
    type: "Normal" | "Premium"
    role: "User" | "Member" | "Editor"
    verified: boolean
    posts: number
    category: string
    createdAt: string
    status: "Active" | "Offline"
}

const initialUsers: User[] = [
    {
        id: "001",
        name: "Eddie Lake",
        email: "eddie@example.com",
        avatar: "avatar/user1.png",
        phone: "012345678",
        type: "Premium",
        role: "User",
        verified: true,
        posts: 18,
        category: "Tech",
        createdAt: "2024-01-15",
        status: "Active",
    },
    {
        id: "002",
        name: "Sarah Chen",
        email: "sarah@example.com",
        avatar: "",
        phone: "098765432",
        type: "Normal",
        role: "User",
        verified: false,
        posts: 5,
        category: "Lifestyle",
        createdAt: "2024-03-10",
        status: "Offline",
    },
    {
        id: "003",
        name: "Michael Brown",
        email: "michael@example.com",
        avatar: "",
        phone: "012345678",
        type: "Normal",
        role: "User",
        verified: true,
        posts: 12,
        category: "Tech",
        createdAt: "2024-03-25",
        status: "Active",
    },
    {
        id: "004",
        name: "Emily Davis",
        email: "emily@example.com",
        avatar: "",
        phone: "098765432",
        type: "Normal",
        role: "User",
        verified: false,
        posts: 34,
        category: "Lifestyle",
        createdAt: "2024-04-05",
        status: "Active",
    },
    {
        id: "005",
        name: "Emily Davis",
        email: "emily@example.com",
        avatar: "",
        phone: "098765432",
        type: "Normal",
        role: "User",
        verified: false,
        posts: 34,
        category: "Lifestyle",
        createdAt: "2024-04-05",
        status: "Active",
    },
    {
        id: "006",
        name: "David Wilson",
        email: "david@example.com",
        avatar: "",
        phone: "098765432",
        type: "Normal",
        role: "User",
        verified: false,
        posts: 34,
        category: "Lifestyle",
        createdAt: "2024-04-05",
        status: "Active",
    },
    {
        id: "007",
        name: "Lisa Anderson",
        email: "lisa@example.com",
        avatar: "avatar/user1.png",
        phone: "098765432",
        type: "Premium",
        role: "User",
        verified: false,
        posts: 34,
        category: "Lifestyle",
        createdAt: "2024-04-05",
        status: "Active",
    },
    {
        id: "008",
        name: "James Taylor",
        email: "james@example.com",
        avatar: "",
        phone: "098765432",
        type: "Premium",
        role: "User",
        verified: false,
        posts: 34,
        category: "Lifestyle",
        createdAt: "2024-04-05",
        status: "Active",
    },
    {
        id: "009",
        name: "Anna Martinez",
        email: "anna@example.com",
        avatar: "",
        phone: "098765432",
        type: "Premium",
        role: "User",
        verified: false,
        posts: 34,
        category: "Lifestyle",
        createdAt: "2024-04-05",
        status: "Active",
    },
    {
        id: "010",
        name: "Robert Johnson",
        email: "robert@example.com",
        avatar: "",
        phone: "098765432",
        type: "Premium",
        role: "User",
        verified: false,
        posts: 34,
        category: "Lifestyle",
        createdAt: "2024-04-05",
        status: "Active",
    },
]

export default function UserPage() {
    const [users, setUsers] = useState<User[]>(initialUsers)
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [viewUser, setViewUser] = useState<User | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchQuery, setSearchQuery] = useState("")

    // Filter users based on search query
    const [tab, setTab] = useState("all")

    const filteredUsers = users.filter((user) => {
        const query = searchQuery.toLowerCase()

        const matchesSearch =
            user.id.toLowerCase().includes(query) ||
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.type.toLowerCase().includes(query) ||
            user.role.toLowerCase().includes(query) ||
            user.status.toLowerCase().includes(query)

        const matchesTab =
            tab === "all" ||
            (tab === "active" && user.status === "Active") ||
            (tab === "offline" && user.status === "Offline")

        return matchesSearch && matchesTab
    })
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + rowsPerPage)
    const toggleSelectAll = () => {
        if (selectedUsers.length === paginatedUsers.length) {
            setSelectedUsers([])
        } else {
            setSelectedUsers(paginatedUsers.map((u) => u.id))
        }
    }

    const toggleSelect = (id: string) => {
        setSelectedUsers((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        )
    }
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "User",
        type: "Normal",
        verified: false,
        posts: 0,
        category: "",
        createdAt: "",
        status: "Active",
    })

    const handleAdd = () => {
        console.log(formData)

        setIsAddDialogOpen(false)

        setFormData({
            name: "",
            email: "",
            phone: "",
            password: "",
            role: "User",
            type: "Normal",
            verified: false,
            posts: 0,
            category: "",
            createdAt: "",
            status: "Active",
        })
    }
    const handleDelete = () => {
        if (!selectedUser) return

        setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id))

        setIsDeleteDialogOpen(false)
        setSelectedUser(null)
    }

    const getStatusBadge = (status: User["status"]) => {
        switch (status) {
            case "Active":
                return (
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10">
                        <span className="mr-1.5 size-1.5 rounded-full bg-emerald-500" />
                        Active
                    </Badge>
                )
            case "Offline":
                return (
                    <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30">
                        <span className="mr-1.5 size-1.5 rounded-full bg-muted-foreground" />
                        Offline
                    </Badge>
                )
        }
    }

    const getAccountTypeBadge = (type: User["type"]) => {
        const colors: Record<User["type"], string> = {
            Premium: "text-rose-500 border-rose-500/30 bg-rose-500/10",
            Normal: "text-blue-500 border-blue-500/30 bg-blue-500/10",
        }
        return (
            <Badge variant="outline" className={colors[type]}>
                {type}
            </Badge>
        )
    }
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const openEditDialog = (user: User) => {
        setSelectedUser(user)
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: "",
            role: user.role,
            type: user.type,
            verified: user.verified,
            posts: user.posts,
            category: user.category,
            createdAt: user.createdAt,
            status: user.status,
        })
        setIsEditDialogOpen(true)
    }
    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Users</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <main className="flex-1 overflow-auto p-6 min-w-0">
                <div className="space-y-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your users and accounts
                            </p>
                        </div>

                        {/* Search and Actions */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name, email, ID..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        setCurrentPage(1) // Reset to first page on search
                                    }}
                                    className="pl-9"
                                />
                            </div>
                            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="mr-2 size-4" />
                                        Add User
                                    </Button>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New User</DialogTitle>
                                        <DialogDescription>
                                            Create a new user account.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="grid gap-4 py-4">

                                        {/* NAME */}
                                        <div className="grid gap-2">
                                            <label className="text-sm">Name</label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, name: e.target.value })
                                                }
                                            />
                                        </div>

                                        {/* EMAIL & PHONE */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <label className="text-sm">Email</label>
                                                <Input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, email: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <label className="text-sm">Phone</label>
                                                <Input
                                                    value={formData.phone}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, phone: e.target.value })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {/* PASSWORD */}
                                        <div className="grid gap-2">
                                            <label className="text-sm">Password</label>
                                            <Input
                                                type="password"
                                                value={formData.password}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, password: e.target.value })
                                                }
                                            />
                                        </div>

                                        {/* ROLE */}
                                        <div className="grid gap-2">
                                            <label className="text-sm">Role</label>
                                            <Select
                                                value={formData.role}
                                                onValueChange={(value) =>
                                                    setFormData({ ...formData, role: value as User["role"] })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="User">User</SelectItem>
                                                    <SelectItem value="Member">Member</SelectItem>
                                                    <SelectItem value="Editor">Editor</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleAdd}>
                                            Add
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>

                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs
                        value={tab}
                        onValueChange={(value) => {
                            setTab(value)
                            setCurrentPage(1) // ✅ reset page
                        }}
                    >
                        <TabsList>
                            <TabsTrigger value="all">All Users</TabsTrigger>

                            <TabsTrigger value="active">
                                Active
                                <Badge className="ml-1.5 text-xs">
                                    {users.filter((u) => u.status === "Active").length}
                                </Badge>
                            </TabsTrigger>

                            <TabsTrigger value="offline">
                                Offline
                                <Badge className="ml-1.5 text-xs">
                                    {users.filter((u) => u.status === "Offline").length}
                                </Badge>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Table */}
                    <div className="rounded-lg border bg-card">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>ID</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Verified</TableHead>
                                    <TableHead>Posts</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-32 text-center">
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <Search className="size-8" />
                                                <p>No users found</p>
                                                {searchQuery && (
                                                    <p className="text-sm">
                                                        No results for &quot;{searchQuery}&quot;
                                                    </p>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : null}
                                {paginatedUsers.map((user) => (
                                    <TableRow key={user.id} className="group">
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedUsers.includes(user.id)}
                                                onCheckedChange={() => toggleSelect(user.id)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-muted-foreground">
                                            {user.id}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="size-8">
                                                    <AvatarImage src={user.avatar} />
                                                    <AvatarFallback>
                                                        {user.name[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{getAccountTypeBadge(user.type)}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{user.role}</Badge>
                                        </TableCell>
                                        {/* Verified */}
                                        <TableCell>
                                            {user.verified ? (
                                                <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                                                    Yes
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">No</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{user.posts}</TableCell>

                                        {/* Category */}
                                        <TableCell>{user.category}</TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            {user.status === "Active" ? (
                                                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">Offline</Badge>
                                            )}
                                        </TableCell>

                                        <TableCell className="text-muted-foreground">
                                            {new Date(user.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="icon" variant="outline">
                                                        <MoreVertical className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => setViewUser(user)}>
                                                        <Eye className="mr-2 size-4" />
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-destructive"
                                                        onClick={() => {
                                                            setSelectedUser(user)
                                                            setIsDeleteDialogOpen(true)
                                                        }}
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

            {/* View User Dialog */}
            <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                        <DialogDescription>View user information</DialogDescription>
                    </DialogHeader>
                    {viewUser && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="size-16">
                                    <AvatarImage src={viewUser.avatar} alt={viewUser.name} />
                                    <AvatarFallback className="text-lg">
                                        {viewUser.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold text-lg">{viewUser.name}</h3>
                                    <p className="text-sm text-muted-foreground">{viewUser.email}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <p className="text-sm text-muted-foreground">User ID</p>
                                    <p className="font-mono text-sm">{viewUser.id}</p>
                                </div>
                                 <div>
                                    <p className="text-sm text-muted-foreground">Role</p>
                                    <p className="font-semibold">{viewUser.role}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Account Type</p>
                                    <div className="mt-1">{getAccountTypeBadge(viewUser.type)}</div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Category</p>
                                    <p className="font-semibold">{viewUser.category}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Posts</p>
                                    <p className="font-semibold">{viewUser.posts}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <div className="mt-1">{getStatusBadge(viewUser.status)}</div>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-muted-foreground">Created At</p>
                                    <p>
                                        {new Date(viewUser.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <strong>{selectedUser?.name}</strong>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
