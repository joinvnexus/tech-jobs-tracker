import { ReactNode } from "react"
import { Sidebar } from "@/components/ui/sidebar"
import HeaderClient from "./header-client"
import { Session } from "next-auth"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"

interface DashboardShellProps {
  children: ReactNode
  session: Session | null
}

export function DashboardShell({ children, session }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <HeaderClient session={session} />

      <div className="flex">
        {/* Sidebar */}
        {isClient && (
          <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen && "lg:ml-0 ml-0", // Mobile overlay handled in sidebar
          "lg:ml-0"
        )}>
          <div className="p-6 md:p-8 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
