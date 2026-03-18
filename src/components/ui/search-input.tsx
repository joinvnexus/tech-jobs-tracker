import * as React from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchInputProps 
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  variant?: "default" | "hero" | "compact"
  showClear?: boolean
  onClear?: () => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ 
    className, 
    placeholder = "Search jobs, companies...", 
    variant = "default",
    showClear = true,
    onClear,
    ...props 
  }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    
    const handleClear = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      inputRef.current?.focus()
      if (inputRef.current) inputRef.current.value = ""
      onClear?.()
    }

    return (
      <div className={cn(
        "group relative flex w-full max-w-md items-stretch focus-within:ring-2",
        {
          "ring-brand-500/20 shadow-glow-brand": variant === "hero",
          "max-w-sm": variant === "compact",
        },
        className
      )}>
        {/* Search icon */}
        <div className="pointer-events-none flex items-center px-4 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        
        {/* Input */}
        <Input
          ref={inputRef}
          className={cn(
            "h-12 border-0 !ring-0 !ring-offset-0 bg-background pl-0 pr-12 text-base shadow-none placeholder:text-muted-foreground/80 focus-visible:ring-0",
            "focus-visible:border-brand-500 focus-visible:shadow-glow-brand",
            {
              "rounded-l-lg shadow-xl": variant === "hero",
              "rounded-none": variant !== "hero",
            }
          )}
          placeholder={placeholder}
          {...props}
        />
        
        {/* Clear button */}
        {showClear && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full h-9 w-9 p-0 hover:bg-muted/50 opacity-0 group-hover:opacity-100 transition-all"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    )
  }
)

SearchInput.displayName = "SearchInput"

export { SearchInput }

