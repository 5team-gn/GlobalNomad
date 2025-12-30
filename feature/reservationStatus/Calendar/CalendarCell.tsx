"use client";

import { CalendarDate } from "../types/calendar";
import { ReservationBadge } from "@/feature/reservationStatus/types/reservationStatus";
import { cn } from "@/lib/utils/twmerge";
import { StatusBadge } from "./StatusBadge";

interface Props {
  date: CalendarDate;
  badges: ReservationBadge[];
  isSelected: boolean;
  onClick: (position: { top: number; left: number }) => void;
}

export default function CalendarCell({
  date,
  badges,
  isSelected,
  onClick,
}: Props) {
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    onClick({
      top: rect.top + window.scrollY,
      left: rect.right + 12, 
    });
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative min-h-25 border-b border-r p-2 cursor-pointer transition-colors",
        "hover:bg-gray-100",
        !date.isCurrentMonth && "bg-gray-50 text-gray-300",
        isSelected && "bg-black text-white hover:bg-black"
      )}
    >
      {/* 날짜 숫자 */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "text-sm",
            date.isToday &&
              "flex h-6 w-6 items-center justify-center rounded-full bg-black text-white",
            isSelected && date.isToday && "bg-white text-black"
          )}
        >
          {date.day}
        </span>

        {/* 예약 있음 표시 (점) */}
        {badges.length > 0 && (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isSelected ? "bg-white" : "bg-red-500"
            )}
          />
        )}
      </div>

      {/* 상태 배지 */}
      <div className="mt-1 flex flex-col gap-1">
        {badges.map((badge) => (
          <StatusBadge
            key={badge.status}
            status={badge.status}
            count={badge.count}
          />
        ))}
      </div>
    </div>
  );
}
