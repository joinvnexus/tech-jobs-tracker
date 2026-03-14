"use client";

import { useState, useCallback } from "react";

interface JobFilters {
  search?: string;
  location?: string;
  jobType?: string;
  experienceLevel?: string;
  category?: string;
  skills?: string;
  minSalary?: number;
  maxSalary?: number;
  locationType?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

interface Job {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  locationType: string;
  jobType: string;
  experienceLevel: string;
  category: string;
  skills: string[];
  minSalary?: number;
  maxSalary?: number;
  isSalaryVisible: boolean;
  positions: number;
  applicationsCount: number;
  views: number;
  status: string;
  applicationDeadline: string;
  createdAt: string;
  createdBy?: {
    companyName: string;
    companyLogo?: string;
  };
}

interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

interface UseJobsReturn {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  filters: JobFilters;
  total: number;
  totalPages: number;
  hasMore: boolean;
  setFilters: (filters: JobFilters) => void;
  fetchJobs: () => Promise<void>;
  loadMore: () => Promise<void>;
  clearFilters: () => void;
}

/**
 * A custom hook for fetching and managing jobs
 */
export function useJobs(initialFilters: JobFilters = {}): UseJobsReturn {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<JobFilters>(initialFilters);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const buildQueryString = useCallback((f: JobFilters): string => {
    const params = new URLSearchParams();
    
    Object.entries(f).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    
    return params.toString();
  }, []);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const queryString = buildQueryString(filters);
      const response = await fetch(`/api/jobs?${queryString}`);

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data: JobsResponse = await response.json();
      
      setJobs(data.jobs);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [filters, buildQueryString]);

  const setFilters = useCallback((newFilters: JobFilters) => {
    setFiltersState((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1,
    }));
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = (filters.page || 1) + 1;
      const queryString = buildQueryString({ ...filters, page: nextPage });
      const response = await fetch(`/api/jobs?${queryString}`);

      if (!response.ok) {
        throw new Error("Failed to fetch more jobs");
      }

      const data: JobsResponse = await response.json();
      
      setJobs((prev) => [...prev, ...data.jobs]);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      setHasMore(data.hasMore);
      setFiltersState((prev) => ({ ...prev, page: nextPage }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [filters, hasMore, isLoading, buildQueryString]);

  const clearFilters = useCallback(() => {
    setFiltersState({ page: 1, limit: 20 });
  }, []);

  return {
    jobs,
    isLoading,
    error,
    filters,
    total,
    totalPages,
    hasMore,
    setFilters,
    fetchJobs,
    loadMore,
    clearFilters,
  };
}
