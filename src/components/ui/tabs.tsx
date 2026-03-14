import * as React from "react"

import { cn } from "@/lib/utils"

export interface Tab {
  id: string
  label: string
}

export interface TabsProps {
  tabs: Tab[]
  value: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({
  tabs,
  value,
  onChange,
  className,
}: TabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-start rounded-lg border bg-muted p-1 text-sm",
        className,
      )}
      role="tablist"
      aria-orientation="horizontal"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === value
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={cn(
              "inline-flex min-w-[80px] items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
