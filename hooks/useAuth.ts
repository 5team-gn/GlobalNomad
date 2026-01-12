"use client";

import { useState, useEffect, useCallback } from "react";
import { getMyInfo } from "@/lib/api/user";

interface User {
  nickname: string;
  profileImageUrl: string | null;
  email: string;
}

/**
 * useAuth
 *
 * - 로그인 상태 및 유저 정보 관리
 * - 로그아웃 기능 제공
 */
export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      // 내 정보 조회
      const userData = await getMyInfo();
      setUser({
        nickname: userData.nickname,
        profileImageUrl: userData.profileImageUrl,
        email: userData.email,
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("인증 확인 실패:", error);
      // 토큰이 만료되었거나 유효하지 않은 경우
      logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/"; // 메인 페이지로 이동 및 새로고침
  };

  return { isLoggedIn, user, logout, isLoading };
}
