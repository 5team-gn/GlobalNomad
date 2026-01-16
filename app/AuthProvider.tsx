"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getMyInfo } from "@/lib/api/user";
import { refreshToken as refreshTokenApi } from "@/lib/api/auth";
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

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = "/";
  }, []);

  // 유저 상태 세팅 로직 단일화
  const applyUser = useCallback((userData: any) => {
    setUser((prev) => ({
      nickname: userData.nickname,
      profileImageUrl: userData.profileImageUrl ?? null,
      email: userData.email,
      pendingProfileImageUrl: prev?.pendingProfileImageUrl ?? null,
    }));
    setIsLoggedIn(true);
    setProfileImageVersion((v) => v + 1);
  }, []);

  //  토큰 재발급 로직 단일화
  const reissueTokens = useCallback(async () => {
    const rtk = localStorage.getItem("refreshToken");
    if (!rtk) throw new Error("No refreshToken");

    const tokens = await refreshTokenApi(rtk);
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  }, []);

  // 내 정보 조회 + applyUser 단일화
  const fetchAndApplyMe = useCallback(async () => {
    const userData = await getMyInfo();
    applyUser(userData);
  }, [applyUser]);

  // 외부에서 쓰는 refreshUser (401이면 갱신 후 재시도)
  const refreshUser = useCallback(async (): Promise<void> => {
    const access = localStorage.getItem("accessToken");
    if (!access) {
      setUser(null);
      setIsLoggedIn(false);
      return;
    }

    try {
      await fetchAndApplyMe();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          await reissueTokens();
          await fetchAndApplyMe();
        } catch {
          logout();
        }
        return;
      }

      console.error("Failed to fetch user info:", error);
    }
  }, [fetchAndApplyMe, reissueTokens, logout]);

  //  만료 임박 자동 재발급: 토큰만 갱신
  useAutoRefresh({
    thresholdSec: 60,
    refresh: reissueTokens,
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
