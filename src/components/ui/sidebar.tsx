import * as React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion"
import { ChevronDown, LayoutDashboard, Briefcase, User, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Briefcase, label: "Jobs", href: "/jobs" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border/50 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "lg:static lg:translate-x-0"
    )}>
      {/* Mobile overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "block lg:hidden" : "hidden"
        )}
        onClick={onToggle}
      />
      
      {/* Sidebar content */}
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={onToggle}
              className="lg:hidden"
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-brand-500 to-seeker-500 rounded-xl shadow-glow-brand" />
              <span className="font-heading text-lg font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                HireHub
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl p-3 transition-all duration-200",
                  "hover:bg-accent/50 hover:shadow-glow-brand/50",
                  isActive 
                    ? "bg-gradient-to-r from-brand-500/10 to-seeker-500/10 shadow-glow-brand border border-brand/30 text-brand-600" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-brand-600" : "group-hover:text-brand-500"
                )} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 mt-auto border-t border-border/50 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
