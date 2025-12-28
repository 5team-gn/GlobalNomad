"use client";

import { useMemo, useState } from "react";
import { toISODate } from "@/utils/date";

type Props = {
  value: Date | null;
  onChange: (d: Date) => void;
  enabledDateSet: Set<string>; // "YYYY-MM-DD"
};

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function SimpleCalendar({
  value,
  onChange,
  enabledDateSet,
}: Props) {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = useMemo(() => {
    const arr: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(new Date(year, month, d));
    return arr;
  }, [year, month, startWeekday, daysInMonth]);

  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="text-16-body-b text-gray-950">
          {cursor.toLocaleString("en-US", { month: "long" })} {year}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            className="h-9 w-9 rounded-lg border border-gray-200"
          >
            ‹
          </button>
          <button
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            className="h-9 w-9 rounded-lg border border-gray-200"
          >
            ›
          </button>
        </div>
      </div>

      {/* 날짜 */}
      <div className="mt-4 grid grid-cols-7 gap-y-2 text-center">
        {cells.map((date, idx) => {
          if (!date) return <div key={idx} className="h-10" />;

          const ymd = toISODate(date);
          const enabled = enabledDateSet.has(ymd);
          const selected = value ? isSameDay(value, date) : false;
          const isTodayFlag = isSameDay(today, date);

          const base =
            "relative mx-auto flex h-10 w-10 items-center justify-center rounded-full text-14-m";

          let cls = base;

          // 1) 선택 최우선
          if (selected) {
            cls = base + " bg-primary-500 text-white cursor-pointer";
          }
          // 2) 예약 가능일 (더 진한 하늘색 + 흰색)
          else if (enabled) {
            cls =
              base +
              " bg-primary-500 text-white cursor-pointer hover:bg-primary-600";
          }
          // 3) 오늘(당일) - 예약 불가일 때만: 연한 하늘색 + 진한 하늘색 숫자
          else if (isTodayFlag) {
            cls = base + " bg-primary-100 text-primary-500";
          }
          // 4) 예약 불가 기본
          else {
            cls = base + " text-gray-300";
          }

          return (
            <button
              key={idx}
              disabled={!enabled}
              onClick={() => enabled && onChange(date)}
              className={cls}
            >
              {date.getDate()}

              {/* 예약 가능 dot (선택되면 숨김) */}
              {/* {enabled && !selected && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary-500" />
              )} */}
            </button>
          );
        })}
      </div>
    </div>
  );
}
