

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

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-2" />
        <h1 className="text-xl font-semibold">DashBoard</h1>
      </div>
      {/* <div className="flex items-center gap-3">
        <Select defaultValue="neutral">
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="detailed">Detailed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="icon">
          <Trash2 className="size-4" />
        </Button>
        <Button>
          <Plus className="size-4 mr-2" />
          Quick Create
        </Button>
      </div> */}
    </header>
  )
}
