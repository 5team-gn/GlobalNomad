import { CalendarDate } from "@/feature/reservationStatus/types/calendar";
import { ReservationMap } from "../utils/mapReservationsToCalendar";
import { toDateKey } from "@/lib/utils/date";
import CalendarCell from "./CalendarCell";

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
  onSelectDate: (key: string, position: { top: number; left: number }) => void;
}

export default function CalendarGrid({
  dates,
  badgesMap,
  selectedDateKey,
  onSelectDate,
}: Props) {
  return (
    <>
      {/* 요일 */}
      <div className="grid grid-cols-7 mb-4">
        {DAYS.map((day) => (
          <div key={day.id} className="...">
            {day.label}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-7 border-t">
        {dates.map((date) => {
          const key = toDateKey(date.date);

          return (
            <CalendarCell
              key={key}
              date={date}
              badges={badgesMap[key] ?? []}
              isSelected={selectedDateKey === key}
              onClick={(position) => onSelectDate(key, position)}
            />
          );
        })}
      </div>
    </>
  );
}
