import * as React from "react"

import { cn } from "@/lib/utils"

export interface ModalProps {
  open: boolean
  onClose?: () => void
  title?: string
  children: React.ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps): JSX.Element | null {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      onClose?.()
    }
  }

  React.useEffect(() => {
    const handler = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose?.()
      }
    }
    if (open) {
      window.addEventListener("keydown", handler)
    }
    return () => {
      window.removeEventListener("keydown", handler)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={handleBackdropClick}
    >
      <div className={cn("w-full max-w-lg rounded-lg bg-background p-6 shadow-lg")}>
        {title ? (
          <h2 className="mb-4 text-lg font-semibold">{title}</h2>
        ) : null}
        {children}
      </div>
    </div>
  )
}

