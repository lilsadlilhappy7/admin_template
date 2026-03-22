"use client"

import { Columns3, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DocumentTabs() {
  return (
    <div className="flex items-center justify-between border-t px-6 py-4">
      <Tabs defaultValue="outline">
        <TabsList>
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            Past Performance
            <Badge variant="secondary" className="rounded-full px-1.5 py-0.5 text-[10px]">
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="personnel" className="gap-2">
            Key Personnel
            <Badge variant="secondary" className="rounded-full px-1.5 py-0.5 text-[10px]">
              2
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="focus">Focus Documents</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Columns3 className="size-4 mr-2" />
          Customize Columns
        </Button>
        <Button variant="outline" size="sm">
          <Plus className="size-4 mr-2" />
          Add Section
        </Button>
      </div>
    </div>
  )
}
