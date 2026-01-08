"use client";

import { useState } from "react";

/**
 * useAuth
 *
 * - 로그인 API 구현 전에도 사용 가능
 * - localStorage에 accessToken 존재 여부로 로그인 판단
 * - 로그인 API 연결 시 이 파일 수정 없이 그대로 사용
 */
export function useAuth() {
  const [isLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    return Boolean(localStorage.getItem("accessToken"));
  });

  return { isLoggedIn };
}
