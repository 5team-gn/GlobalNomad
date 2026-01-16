"use client";

import { getJwtExpMs } from "@/feature/reservationStatus/utils/jwt";
import { useEffect, useState } from "react";

type Props = {
  getToken: () => string | null;
  onExpire?: () => void;
  warnBeforeSec?: number;
  className?: string;
};

function formatMMSS(totalSec: number) {
  const s = Math.max(0, totalSec);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function SessionCountdown({
  getToken,
  onExpire,
  warnBeforeSec = 120,
  className = "",
}: Props) {
  const [remainSec, setRemainSec] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const token = getToken();
      if (!token) {
        setRemainSec(null);
        return;
      }

      const expMs = getJwtExpMs(token);
      if (!expMs) {
        setRemainSec(null);
        return;
      }

      const diff = Math.floor((expMs - Date.now()) / 1000);
      setRemainSec(diff);

      if (diff <= 0) onExpire?.();
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [getToken, onExpire]);

  if (remainSec === null) return null;

  const isWarn = remainSec <= warnBeforeSec;

  return (
    <div
      className={[
        "px-3 py-1 rounded-full border text-[12px] font-medium tabular-nums",
        isWarn
          ? "border-red-300 text-red-600 bg-red-50"
          : "bg-black text-white border-black opacity-85",
        className,
      ].join(" ")}
      aria-label="세션 만료까지 남은 시간"
    >
      자동 갱신까지 {formatMMSS(remainSec)}
    </div>
  );
}
