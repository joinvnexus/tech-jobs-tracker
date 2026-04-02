import * as React from "react"

import { cn } from "@/lib/utils"

export interface DropdownOption {
  label: string
  value: string
}

export interface DropdownProps {
  options: DropdownOption[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  name?: string
}

export function Dropdown({
  options,
  value,
  placeholder = "Select...",
  onChange,
  name,
}: DropdownProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange?.(event.target.value)
  }

  return (
    <select
      name={name}
      className={cn(
        "w-full rounded-md border border-input bg-secondary/40 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      )}
      value={value}
      onChange={handleChange}
      aria-label={name}
    >
      {placeholder ? (
        <option value="" disabled={value !== undefined && value !== ""}>
          {placeholder}
        </option>
      ) : null}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
