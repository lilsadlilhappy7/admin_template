import { StatCard } from "@/components/dashboard/stat-card"
import { VisitorsChart } from "@/components/dashboard/visitors-chart"
import { DocumentTabs } from "@/components/dashboard/document-tabs"

const stats = [
  {
    title: "New Customers",
    value: "1,250",
    change: "+12.5%",
    trend: "up" as const,
    description: "Trending up this month",
    subtext: "Visitors for the last 6 months",
  },
  {
    title: "Active Accounts",
    value: "1,234",
    change: "-20%",
    trend: "down" as const,
    description: "Down 20% this period",
    subtext: "Acquisition needs attention",
  },
  {
    title: "Total Posts",
    value: "45,678",
    change: "+12.5%",
    trend: "up" as const,
    description: "Strong user retention",
    subtext: "Engagement exceed targets",
  },
  {
    title: "Total Users",
    value: "1686",
    change: "+4.5%",
    trend: "up" as const,
    description: "Steady performance increase",
    subtext: "Meets growth projections",
  },
]

export default function AdminPage() {
  return (
    <main className="flex-1 overflow-auto p-6 min-w-0">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="mt-6">
        <VisitorsChart />
      </div>

      <DocumentTabs />
    </main>
  )
}