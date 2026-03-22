'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'
import { cn } from '@/lib/utils'

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }
  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<'div'> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >['children']
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn(
          `
  flex aspect-video justify-center text-xs

  [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground
  [&_.recharts-cartesian-grid_line]:stroke-border/50

  [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border
  [&_.recharts-reference-line]:stroke-border

  [&_.recharts-dot[stroke='#fff']]:stroke-transparent
  [&_.recharts-layer]:outline-none
  [&_.recharts-surface]:outline-none
  `,
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const entries = Object.entries(config)

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${entries
                .map(([key, item]) => {
                  const color =
                    item.theme?.[theme as keyof typeof item.theme] ??
                    item.color ??
                    '#3b82f6'
                  return `--color-${key}: ${color};`
                })
                .join('\n')}
}
`
          )
          .join('\n'),
      }}
    />
  )
}

// ✅ CLEAN TOOLTIP
const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({ active, payload, label }: any) {
  const { config } = useChart()
  if (!active || !payload?.length) return null

  return (
    <div className="bg-background border border-border rounded-lg px-3 py-2 text-sm shadow-xl flex flex-col gap-1.5 min-w-[130px]">
      {label && <div className="text-muted-foreground font-medium mb-1">{label}</div>}
      {payload.map((item: any) => {
        const itemConfig = config[item.dataKey as keyof typeof config] || {}
        const itemName = itemConfig.label || item.name
        const itemColor = item.color || `var(--color-${item.dataKey})`

        return (
          <div key={item.dataKey} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-[2px]"
                style={{ backgroundColor: itemColor }}
              />
              <span className="text-muted-foreground">{itemName}</span>
            </div>
            <span className="font-medium text-foreground">
              {item.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
}