"use client";

import { CalendarDate } from "../types/calendar";
import { ReservationBadge } from "@/feature/reservationStatus/types/reservationStatus";
import { cn } from "@/lib/utils/twmerge";
import { StatusBadge } from "./StatusBadge";
import { toDateKey } from "@/lib/utils/date";

interface Props {
  date: CalendarDate;
  badges: ReservationBadge[];
  isSelected: boolean;
  onSelectDate: (
    key: string,
    position: { top: number; left: number; width: number; height: number }
  ) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function CalendarCell({
  date,
  badges,
  isSelected,
  onSelectDate,
  containerRef,
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!date.isCurrentMonth) return;
    if (!containerRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const dateKey = toDateKey(date.date);
    const MODAL_VERTICAL_OFFSET = 70;

    const position = {
      top:
        rect.top -
        containerRect.top +
        rect.height / 2 +
        MODAL_VERTICAL_OFFSET,
      left:
        rect.left -
        containerRect.left +
        rect.width +
        12,
      width: rect.width,
      height: rect.height,
    };

    

    onSelectDate(dateKey, position);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative min-h-25 cursor-pointer transition-colors px-3 pt-4.5 pb-2.5",
        "hover:text-black",
        !date.isCurrentMonth && "text-gray-300",
        isSelected && "bg-gray-50 text-gray-950 hover:bg-gray-100"
      )}
    >
      {/* 날짜 숫자 */}
      <div className="flex justify-center items-center mb-1.5">
        <span
          className={cn(
            "text-sm",
            date.isToday &&
              "flex h-6 w-6 items-center justify-center rounded-full bg-gray-100",
            isSelected && date.isToday && "bg-white text-black"
          )}
        >
          {date.day}
        </span>

        {/* 예약 있음 표시 (점) */}
        {badges.length > 0 && (
          <span
            className={cn(
              "ml-1 h-1.5 w-1.5 rounded-full",
              isSelected ? "bg-primary-500" : "bg-red-500"
            )}
          />
        )}
      </div>

      {/* 상태 배지 */}
      <div className="flex flex-col gap-1">
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
