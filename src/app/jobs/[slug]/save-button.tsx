"use client"

import { useTransition } from "react"

import { Button } from "@/components/ui/button"

import { toggleSaveJobAction } from "./save-actions"

interface SaveButtonProps {
  jobId: string
  initialSaved: boolean
}

export function SaveJobButton({
  jobId,
  initialSaved,
}: SaveButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleClick = (action: "save" | "unsave"): void => {
    const formData = new FormData()
    formData.append("jobId", jobId)
    formData.append("action", action)

    startTransition(async () => {
      await toggleSaveJobAction(formData)
    })
  }

  if (initialSaved) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        disabled={isPending}
        onClick={() => handleClick("unsave")}
      >
        {isPending ? "Updating..." : "Unsave job"}
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="w-full"
      disabled={isPending}
      onClick={() => handleClick("save")}
    >
      {isPending ? "Saving..." : "Save job"}
    </Button>
  )
}

