"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Search } from "lucide-react"

type ReportStatus = "pending" | "approved" | "rejected"

type Report = {
    id: string
    type: "post" | "user"
    postId?: string
    targetUserId?: string
    reportedBy: string
    image?: string
    reason: string
    description: string
    status: ReportStatus
    createdAt: string
}

const initialReports: Report[] = [
    {
        id: "1",
        type: "post",
        postId: "P001",
        reportedBy: "U100",
        reason: "Spam",
        description: "This post is spam",
        status: "pending",
        createdAt: "2024-03-01",
    },
    {
        id: "2",
        type: "user",
        targetUserId: "U200",
        reportedBy: "U101",
        image: "/avatar/user1.png",
        reason: "Fake Account",
        description: "Suspicious user",
        status: "pending",
        createdAt: "2024-03-02",
    },
    {
        id: "3",
        type: "user",
        targetUserId: "U202",
        reportedBy: "U102",
        image: undefined,
        reason: "Fake Account",
        description: "Suspicious user",
        status: "pending",
        createdAt: "2024-03-02",
    },
    {
        id: "4",
        type: "user",
        targetUserId: "U203",
        reportedBy: "U103",
        image: undefined,
        reason: "Spam",
        description: "Suspicious user",
        status: "pending",
        createdAt: "2024-03-02",
    },
    {
        id: "5",
        type: "user",
        targetUserId: "U204",
        reportedBy: "U104",
        image: undefined,
        reason: "Scam",
        description: "Suspicious user",
        status: "pending",
        createdAt: "2024-03-02",
    },
]

export default function ReportPage() {
    const [reports, setReports] = useState<Report[]>(initialReports)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const updateStatus = (id: string, status: ReportStatus) => {
        setReports((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, status } : r
            )
        )
    }

    // ✅ SEARCH
    const filteredReports = reports.filter((r) =>
        r.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.targetUserId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.postId || "").toLowerCase().includes(searchQuery.toLowerCase())
    )

    // ✅ PAGINATION (AFTER FILTER)
    const totalPages = Math.ceil(filteredReports.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage

    const paginatedReports = filteredReports.slice(
        startIndex,
        startIndex + rowsPerPage
    )

    // ✅ VIEW FUNCTION
    const handleView = (report: Report) => {
        alert(
            report.type === "user"
                ? `View User: ${report.targetUserId}`
                : `View Post: ${report.postId}`
        )
    }

    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="flex flex-col gap-1 mb-4">
                <h1 className="text-2xl font-semibold">Reports</h1>
                <p className="text-sm text-muted-foreground">
                    Manage and review user reports
                </p>

                <div className="relative max-w-sm mt-2">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search reports..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-10"
                    />
                </div>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Reported By</TableHead>
                            <TableHead>Target</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedReports.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-6">
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground py-6">
                                        <span className="text-lg">🔍</span>
                                        <p>No reports found</p>
                                        {searchQuery && (
                                            <p className="text-sm">No results for "{searchQuery}"</p>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedReports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell>{report.id}</TableCell>

                                    <TableCell>{report.type}</TableCell>

                                    <TableCell>{report.reportedBy}</TableCell>

                                    <TableCell>
                                        {report.type === "user"
                                            ? report.targetUserId
                                            : report.postId}
                                    </TableCell>

                                    <TableCell>
                                        {report.type === "user" && report.image ? (
                                            <img
                                                src={report.image}
                                                className="w-10 h-10 rounded object-cover"
                                            />
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>

                                    <TableCell>{report.reason}</TableCell>

                                    <TableCell>
                                        <Badge
                                            variant={
                                                report.status === "approved"
                                                    ? "default"
                                                    : report.status === "rejected"
                                                        ? "destructive"
                                                        : "outline"
                                            }
                                        >
                                            {report.status}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="flex gap-2">
                                        {/* VIEW */}
                                        <Button size="sm" variant="outline" onClick={() => handleView(report)}>
                                            View
                                        </Button>

                                        {/* APPROVE */}
                                        <Button
                                            size="sm"
                                            onClick={() => updateStatus(report.id, "approved")}
                                        >
                                            Approve
                                        </Button>

                                        {/* REJECT */}
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => updateStatus(report.id, "rejected")}
                                        >
                                            Reject
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {/* PAGINATION */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t px-4 py-4">

                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>
                            {filteredReports.length === 0
                                ? "No data"
                                : `Showing ${startIndex + 1} - ${Math.min(
                                    startIndex + rowsPerPage,
                                    filteredReports.length
                                )} of ${filteredReports.length}`}
                        </span>

                        <Select
                            value={rowsPerPage.toString()}
                            onValueChange={(value) => {
                                setRowsPerPage(Number(value))
                                setCurrentPage(1)
                            }}
                        >
                            <SelectTrigger className="h-8 w-[80px]">
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

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-2">

                        {/* FIRST */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1 || totalPages === 0}
                        >
                            <ChevronsLeft className="size-4" />
                        </Button>

                        {/* PREVIOUS */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1 || totalPages === 0}
                        >
                            <ChevronLeft className="size-4" />
                        </Button>

                        {/* PAGE INFO */}
                        <div className="px-3 py-1 text-sm border rounded-md bg-muted font-medium">
                            {totalPages === 0 ? 0 : currentPage} / {totalPages || 1}
                        </div>

                        {/* NEXT */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                                setCurrentPage((p) => Math.min(totalPages, p + 1))
                            }
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            <ChevronRight className="size-4" />
                        </Button>

                        {/* LAST */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            <ChevronsRight className="size-4" />
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
}