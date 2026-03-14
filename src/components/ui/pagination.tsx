"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblings?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblings = 1,
  className,
}: PaginationProps) {
  const [pageNumbers, setPageNumbers] = React.useState<number[]>([]);

  React.useEffect(() => {
    const calculatePages = () => {
      const pages: number[] = [];
      
      // Always show first page
      pages.push(1);
      
      // Add ellipsis if needed after first page
      if (currentPage > siblings + 2) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Add pages around current page
      const start = Math.max(2, currentPage - siblings);
      const end = Math.min(totalPages - 1, currentPage + siblings);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed before last page
      if (currentPage < totalPages - siblings - 1) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Always show last page if more than 1 page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
      
      setPageNumbers(pages);
    };

    calculatePages();
  }, [currentPage, totalPages, siblings]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md border transition-colors",
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) => {
        if (page === -1) {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-10 w-10 items-center justify-center"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors",
              page === currentPage
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            )}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md border transition-colors",
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

// Simple pagination for when you just need prev/next
interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: SimplePaginationProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
        )}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
