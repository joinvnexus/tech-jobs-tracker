"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center",
        className
      )}
    >
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mb-6 max-w-md text-sm text-gray-500">{description}</p>
      )}
      {(actionLabel && (actionHref || onAction)) && (
        <Button onClick={onAction} asChild={!!actionHref}>
          {actionHref ? (
            <a href={actionHref}>{actionLabel}</a>
          ) : (
            actionLabel
          )}
        </Button>
      )}
    </div>
  );
}

// Common empty states
export function NoJobsFound({ onClearFilters }: { onClearFilters?: () => void }) {
  return (
    <EmptyState
      title="No jobs found"
      description="We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms."
      actionLabel={onClearFilters ? "Clear filters" : undefined}
      onAction={onClearFilters}
      className="min-h-[300px]"
    />
  );
}

export function NoApplicationsFound() {
  return (
    <EmptyState
      title="No applications yet"
      description="Start applying to jobs to see your applications here."
      actionLabel="Browse Jobs"
      actionHref="/jobs"
      className="min-h-[300px]"
    />
  );
}

export function NoSavedJobsFound() {
  return (
    <EmptyState
      title="No saved jobs"
      description="Save jobs you're interested in to view them here."
      actionLabel="Browse Jobs"
      actionHref="/jobs"
      className="min-h-[300px]"
    />
  );
}

export function NoNotificationsFound() {
  return (
    <EmptyState
      title="No notifications"
      description="You're all caught up! Check back later for updates."
      className="min-h-[200px]"
    />
  );
}
