import { CalendarDate } from "@/feature/reservationStatus/types/calendar";
import { ReservationMap } from "../utils/mapReservationsToCalendar";
import { toDateKey } from "@/lib/utils/date";
import CalendarCell from "./CalendarCell";
import { useRef } from "react";

const DAYS = [
  { id: 0, label: "S" },
  { id: 1, label: "M" },
  { id: 2, label: "T" },
  { id: 3, label: "W" },
  { id: 4, label: "T" },
  { id: 5, label: "F" },
  { id: 6, label: "S" },
];

interface Props {
  dates: CalendarDate[];
  badgesMap: ReservationMap;
  selectedDateKey: string | null;
  onSelectDate: (
    key: string,
    position: { top: number; left: number; width: number; height: number }
  ) => void;
}


export default function CalendarGrid({
  dates,
  badgesMap,
  selectedDateKey,
  onSelectDate,
}: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      {/* 요일 */}
      <div className="grid grid-cols-7 mb-4">
        {DAYS.map((day) => (
          <div key={day.id} className="p-3 text-16-b items-center">
            {day.label}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div ref={gridRef} className="relative grid grid-cols-7">
        {dates.map((date) => {
          const dateKey = toDateKey(date.date);

          return (
            <CalendarCell
              key={dateKey}
              date={date}
              badges={badgesMap[dateKey] ?? []}
              isSelected={selectedDateKey === dateKey}
              onSelectDate={onSelectDate}
              containerRef={gridRef}
            />
          );
        })}
      </div>
    </div>
  );
}
