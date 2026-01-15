"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { getMyInfo } from "@/lib/api/user";
import { refreshToken as refreshTokenApi } from "@/lib/api/auth";
import axios from "axios";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";

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
    const access = localStorage.getItem("accessToken");
    if (!access) {
      setUser(null);
      setIsLoggedIn(false);
      return;
    }

    try {
      const userData = await getMyInfo();

      setUser((prev) => ({
        nickname: userData.nickname,
        profileImageUrl: userData.profileImageUrl ?? null,
        email: userData.email,
        pendingProfileImageUrl: prev?.pendingProfileImageUrl ?? null,
      }));

      setIsLoggedIn(true);
      setProfileImageVersion((v) => v + 1);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          const rtk = localStorage.getItem("refreshToken");
          if (!rtk) throw new Error("No refreshToken");

          // 토큰 재발급
          const tokens = await refreshTokenApi(rtk);

          localStorage.setItem("accessToken", tokens.accessToken);
          localStorage.setItem("refreshToken", tokens.refreshToken);

          // 재발급 후 다시 내 정보 조회
          const userData = await getMyInfo();

          setUser((prev) => ({
            nickname: userData.nickname,
            profileImageUrl: userData.profileImageUrl ?? null,
            email: userData.email,
            pendingProfileImageUrl: prev?.pendingProfileImageUrl ?? null,
          }));

          setIsLoggedIn(true);
          setProfileImageVersion((v) => v + 1);
          return;
        } catch (e) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUser(null);
          setIsLoggedIn(false);
          return;
        }
      }

      console.error("Failed to fetch user info:", error);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  useAutoRefresh({
    thresholdSec: 60,
    refresh: async () => {
      const rtk = localStorage.getItem("refreshToken");
      if (!rtk) throw new Error("No refreshToken");
      const tokens = await refreshTokenApi(rtk);
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
    },
    onFail: logout,
  });

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
