"use client";

import { getJwtExpMs } from "@/feature/reservationStatus/utils/jwt";
import { useEffect, useRef } from "react";

type Args = {
  thresholdSec?: number; // 만료 몇 초 전에 갱신할지
  refresh: () => Promise<void>; // 토큰 재발급 + 저장까지 포함
  onFail?: () => void; // 실패 시 로그아웃 등
};

export function useAutoRefresh({ thresholdSec = 60, refresh, onFail }: Args) {
  const refreshingRef = useRef(false);

  useEffect(() => {
    const tick = async () => {
      const access = localStorage.getItem("accessToken");
      if (!access) return;

      const expMs = getJwtExpMs(access);
      if (!expMs) return;

      const remainSec = Math.floor((expMs - Date.now()) / 1000);

      // 만료 임박 -> refresh (중복 실행 방지)
      if (
        remainSec <= thresholdSec &&
        remainSec > 0 &&
        !refreshingRef.current
      ) {
        refreshingRef.current = true;
        try {
          await refresh();
        } catch {
          onFail?.();
        } finally {
          refreshingRef.current = false;
        }
      }
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [thresholdSec, refresh, onFail]);
}
