import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  description: string
  subtext: string
}

export function StatCard({
  title,
  value,
  change,
  trend,
  description,
  subtext,
}: StatCardProps) {
  const isPositive = trend === "up"

  return (
    <Card className="gap-4 py-4">
      <CardContent className="flex flex-col gap-3 p-0 px-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{title}</span>
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-medium",
              isPositive ? "text-emerald-500" : "text-red-400"
            )}
          >
            {isPositive ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
            {change}
          </div>
        </div>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span>{description}</span>
          {isPositive ? (
            <TrendingUp className="size-3" />
          ) : (
            <TrendingDown className="size-3" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </CardContent>
    </Card>
  )
}
