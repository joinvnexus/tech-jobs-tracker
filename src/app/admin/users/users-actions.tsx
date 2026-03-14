"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Role } from "@prisma/client"

interface UsersActionsProps {
  userId: string
  currentRole: Role
  isActive: boolean
}

export function UsersActions({ userId, currentRole, isActive }: UsersActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleStatusToggle = async () => {
    setLoading(true)
    setIsOpen(false)
    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      })

      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to toggle user status:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (newRole: Role) => {
    if (newRole === currentRole) return
    
    setLoading(true)
    setIsOpen(false)
    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })

      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to change user role:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        size="sm" 
        disabled={loading}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 z-50 mt-1 w-48 rounded-md border bg-background shadow-lg">
          <div className="py-1">
            <button
              onClick={handleStatusToggle}
              disabled={loading}
              className="flex w-full items-center px-4 py-2 text-sm text-left hover:bg-accent"
            >
              {isActive ? "Deactivate User" : "Activate User"}
            </button>
            {currentRole !== "ADMIN" && (
              <>
                <div className="border-t" />
                <button
                  onClick={() => handleRoleChange("SEEKER")}
                  disabled={currentRole === "SEEKER" || loading}
                  className="flex w-full items-center px-4 py-2 text-sm text-left hover:bg-accent disabled:opacity-50"
                >
                  Set as Job Seeker
                </button>
                <button
                  onClick={() => handleRoleChange("EMPLOYER")}
                  disabled={currentRole === "EMPLOYER" || loading}
                  className="flex w-full items-center px-4 py-2 text-sm text-left hover:bg-accent disabled:opacity-50"
                >
                  Set as Employer
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
