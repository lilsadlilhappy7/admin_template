"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeSwitcher } from "@/components/ui/theme-switcher" // ✅ ADD THIS

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-2" />
        <h1 className="text-xl font-semibold">DashBoard</h1>
      </div>
    </header>
  )
}
