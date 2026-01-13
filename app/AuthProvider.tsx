"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { getMyInfo } from "@/lib/api/user";

interface User {
  nickname: string;
  profileImageUrl: string | null;
  email: string;

  pendingProfileImageUrl: string | null;
}

export interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;

  profileImageVersion: number;
  updateUser: (patch: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [profileImageVersion, setProfileImageVersion] = useState(0);

  const updateUser = useCallback((patch: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
    if (
      patch.profileImageUrl !== undefined ||
      patch.pendingProfileImageUrl !== undefined
    ) {
      setProfileImageVersion((v) => v + 1);
    }
  }, []);

  const refreshUser = useCallback(async (): Promise<void> => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      setIsLoggedIn(false);
      return;
    }

    const userData = await getMyInfo();

    setUser((prev) => ({
      nickname: userData.nickname,
      profileImageUrl: userData.profileImageUrl ?? null,
      email: userData.email,
      pendingProfileImageUrl: prev?.pendingProfileImageUrl ?? null,
    }));

    setIsLoggedIn(true);
    setProfileImageVersion((v) => v + 1);
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await refreshUser();
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        refreshUser,
        logout,
        profileImageVersion,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
