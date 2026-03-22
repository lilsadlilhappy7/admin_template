"use client"

import { useState } from "react"
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const data3Months = [
  { date: "Jun 24", visitors: 2400, visitors2: 1800 },
  { date: "Jun 25", visitors: 2800, visitors2: 2200 },
  { date: "Jun 26", visitors: 3200, visitors2: 2600 },
  { date: "Jun 27", visitors: 3800, visitors2: 3000 },
  { date: "Jun 28", visitors: 4200, visitors2: 3400 },
  { date: "Jun 29", visitors: 4600, visitors2: 3800 },
  { date: "Jun 30", visitors: 4800, visitors2: 4000 },
]

const data30Days = [
  { date: "Jun 24", visitors: 2200, visitors2: 1600 },
  { date: "Jun 25", visitors: 2600, visitors2: 2000 },
  { date: "Jun 26", visitors: 2900, visitors2: 2300 },
  { date: "Jun 27", visitors: 3400, visitors2: 2700 },
  { date: "Jun 28", visitors: 3800, visitors2: 3100 },
  { date: "Jun 29", visitors: 4100, visitors2: 3400 },
  { date: "Jun 30", visitors: 4400, visitors2: 3700 },
]

const data7Days = [
  { date: "Jun 24", visitors: 1800, visitors2: 1200 },
  { date: "Jun 25", visitors: 2200, visitors2: 1600 },
  { date: "Jun 26", visitors: 2500, visitors2: 1900 },
  { date: "Jun 27", visitors: 2900, visitors2: 2200 },
  { date: "Jun 28", visitors: 3200, visitors2: 2500 },
  { date: "Jun 29", visitors: 3500, visitors2: 2800 },
  { date: "Jun 30", visitors: 3800, visitors2: 3100 },
]

type TimeRange = "3months" | "30days" | "7days"

export function VisitorsChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("3months")

  const dataMap = {
    "3months": data3Months,
    "30days": data30Days,
    "7days": data7Days,
  }

  const chartData = dataMap[timeRange]

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle>Total Visitors</CardTitle>
          <CardDescription>Total for the last 3 months</CardDescription>
        </div>
        <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
          <TabsList>
            <TabsTrigger value="3months">Last 3 months</TabsTrigger>
            <TabsTrigger value="30days">Last 30 days</TabsTrigger>
            <TabsTrigger value="7days">Last 7 days</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="pt-0 pl-0">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillVisitors2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis hide />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="hsl(var(--chart-1))"
              fill="url(#fillVisitors)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="visitors2"
              stroke="hsl(var(--chart-2))"
              fill="url(#fillVisitors2)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
