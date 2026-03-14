"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Check, X, Eye } from "lucide-react"

interface JobApprovalActionsProps {
  jobId: string
}

export function JobApprovalActions({ jobId }: JobApprovalActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleApproval = async (status: "ACTIVE" | "EXPIRED") => {
    setLoading(status)
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/approve`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to update job status:", error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleApproval("ACTIVE")}
        disabled={loading !== null}
        className="gap-1"
      >
        <Check className="h-4 w-4" />
        {loading === "ACTIVE" ? "Approving..." : "Approve"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleApproval("EXPIRED")}
        disabled={loading !== null}
        className="gap-1 text-muted-foreground"
      >
        <X className="h-4 w-4" />
        {loading === "EXPIRED" ? "Rejecting..." : "Reject"}
      </Button>
    </div>
  )
}
