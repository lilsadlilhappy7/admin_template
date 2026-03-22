'use client'

import { useState, useEffect } from "react"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// ✅ DATA SETS
const data7Days = [
  { date: "Jun 24", visitors: 1800, visitors2: 1200 },
  { date: "Jun 25", visitors: 2200, visitors2: 1600 },
  { date: "Jun 26", visitors: 2500, visitors2: 1900 },
  { date: "Jun 27", visitors: 2900, visitors2: 2200 },
  { date: "Jun 28", visitors: 3200, visitors2: 2500 },
  { date: "Jun 29", visitors: 3500, visitors2: 2800 },
  { date: "Jun 30", visitors: 3800, visitors2: 3100 },
]

const data30Days = [
  { date: "Week 1", visitors: 2200, visitors2: 1600 },
  { date: "Week 2", visitors: 2600, visitors2: 2000 },
  { date: "Week 3", visitors: 3000, visitors2: 2400 },
  { date: "Week 4", visitors: 3400, visitors2: 2800 },
]

const data3Months = [
  { date: "Month 1", visitors: 3000, visitors2: 2400 },
  { date: "Month 2", visitors: 4200, visitors2: 3400 },
  { date: "Month 3", visitors: 5200, visitors2: 4300 },
]

// ✅ COLOR CONFIG
const chartConfig = {
  visitors: {
    label: "Visitors",
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa",
    },
  },
  visitors2: {
    label: "Returning",
    theme: {
      light: "#22c55e",
      dark: "#4ade80",
    },
  },
}

type Range = "7days" | "30days" | "3months"

export function VisitorsChart() {
  const [mounted, setMounted] = useState(false)
  const [range, setRange] = useState<Range>("7days")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const dataMap = {
    "7days": data7Days,
    "30days": data30Days,
    "3months": data3Months,
  }

  return (
    <Card className="bg-white dark:bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Total Visitors</CardTitle>
          <CardDescription>Analytics overview</CardDescription>
        </div>

        {/* ✅ TABS BACK */}
        <Tabs value={range} onValueChange={(v) => setRange(v as Range)}>
          <TabsList>
            <TabsTrigger value="7days">7days</TabsTrigger>
            <TabsTrigger value="30days">30days</TabsTrigger>
            <TabsTrigger value="3months">3months</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      {/* ✅ SMALLER CHART */}
      <CardContent className="p-4 pt-0">
        <ChartContainer config={chartConfig} className="h-[250px] w-full aspect-auto">
          <AreaChart 
            data={dataMap[range]}
            margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={0}
            />
            <YAxis hide />

            <ChartTooltip content={<ChartTooltipContent />} />

            <Area
              dataKey="visitors"
              type="monotone"
              stroke="var(--color-visitors)"
              fill="var(--color-visitors)"
              fillOpacity={0.2}
              strokeWidth={2}
            />

            <Area
              dataKey="visitors2"
              type="monotone"
              stroke="var(--color-visitors2)"
              fill="var(--color-visitors2)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}