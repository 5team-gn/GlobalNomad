"use client";

import { useMemo } from "react";

type Props = {
  value: Date | null;
  onChange: (d: Date) => void;
};

// 아주 간단한 “이번달 1~31 버튼” 예시
export default function SimpleCalendar({ value, onChange }: Props) {
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based

  return (
    <div className="rounded-2xl bg-white">
      <div className="flex items-center justify-between pb-3">
        <div>
          <p className="text-14-b text-gray-950">날짜</p>
          <p className="text-14-m text-gray-700">
            {year}년 {month + 1}월
          </p>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => {
          const date = new Date(year, month, d);
          const selected =
            value &&
            value.getFullYear() === date.getFullYear() &&
            value.getMonth() === date.getMonth() &&
            value.getDate() === date.getDate();

          return (
            <button
              key={d}
              onClick={() => onChange(date)}
              className={[
                "h-10 rounded-full text-14-m",
                selected
                  ? "bg-primary-500 text-white"
                  : "bg-gray-25 text-gray-900",
              ].join(" ")}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
