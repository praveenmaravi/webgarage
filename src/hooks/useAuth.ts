// src/hooks/useAuth.ts

import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback } from "react";

export function useAuth() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user || null;

  const login = useCallback(() => {
    signIn(); // Uses default provider; can pass provider name as arg
  }, []);

  const logout = useCallback(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };
}
