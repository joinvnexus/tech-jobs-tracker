"use client";

import { useState, useCallback } from "react";

interface Application {
  id: string;
  jobId: string;
  job: {
    title: string;
    company: string;
    location: string;
  };
  status: string;
  coverLetter?: string;
  resumeUrl: string;
  resumeName: string;
  expectedSalary?: number;
  noticePeriod?: string;
  createdAt: string;
  updatedAt: string;
}

interface ApplicationsResponse {
  applications: Application[];
  total: number;
  page: number;
  totalPages: number;
}

interface UseApplicationsReturn {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  total: number;
  totalPages: number;
  fetchApplications: (jobId?: string) => Promise<void>;
  updateStatus: (applicationId: string, status: string, note?: string) => Promise<void>;
  withdrawApplication: (applicationId: string) => Promise<void>;
}

/**
 * A custom hook for managing job applications
 */
export function useApplications(): UseApplicationsReturn {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchApplications = useCallback(async (jobId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = jobId
        ? `/api/applications?jobId=${jobId}`
        : "/api/applications";
      
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data: ApplicationsResponse = await response.json();
      
      setApplications(data.applications);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStatus = useCallback(async (
    applicationId: string,
    status: string,
    note?: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/applications/${applicationId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, statusNote: note }),
      });

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      const updatedApplication = await response.json();
      
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId
            ? { ...app, status: updatedApplication.status }
            : app
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const withdrawApplication = useCallback(async (applicationId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to withdraw application");
      }

      setApplications((prev) =>
        prev.filter((app) => app.id !== applicationId)
      );
      setTotal((prev) => prev - 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    applications,
    isLoading,
    error,
    total,
    totalPages,
    fetchApplications,
    updateStatus,
    withdrawApplication,
  };
}
