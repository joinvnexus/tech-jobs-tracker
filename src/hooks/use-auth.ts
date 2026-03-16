"use client";

import { useSession, signOut } from "next-auth/react";
import { useCallback } from "react";

interface UseAuthReturn {
  user: {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    role: string;
  } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isEmployer: boolean;
  isJobSeeker: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
}

/**
 * A custom hook for authentication-related functionality
 */
export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated" && !!session?.user;
  
  const user = session?.user
    ? {
        id: session.user.id as string,
        email: session.user.email as string,
        name: session.user.name,
        image: session.user.image,
        role: (session.user as { role?: string }).role || "SEEKER",
      }
    : null;

  const isEmployer = user?.role === "EMPLOYER";
  const isJobSeeker = user?.role === "SEEKER";
  const isAdmin = user?.role === "ADMIN";

  const logout = useCallback(async () => {
    await signOut({ callbackUrl: "/" });
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    isEmployer,
    isJobSeeker,
    isAdmin,
    logout,
  };
}
