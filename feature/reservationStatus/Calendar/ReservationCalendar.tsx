"use client";

import { getMonthCalendar } from "@/feature/reservationStatus/types/calendar";
import { mapReservationsToCalendar } from "../utils/mapReservationsToCalendar";
import { Reservation } from "../types/reservation";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { useCalendar } from "@/hooks/useCalendar"; 

interface Props {
  reservations: Reservation[];
  selectedDateKey: string | null;
  onSelectDate: (key: string, position: { top: number; left: number }) => void;
}

export default function ReservationCalendar({
  reservations,
  selectedDateKey,
  onSelectDate,
}: Props) {
  const today = new Date();

  const { year, month, prevMonth, nextMonth } = useCalendar(
    today.getFullYear(),
    today.getMonth(),
  );

  const calendarDates = getMonthCalendar(year, month);
  const reservationMap = mapReservationsToCalendar(reservations);

  return (
    <div className="relative border border-white rounded-2xl pt-5 pb-2.5 shadow-xl">
      <CalendarHeader
        year={year}
        month={month}
        onPrev={prevMonth}
        onNext={nextMonth}
      />
      <CalendarGrid
        dates={calendarDates}
        badgesMap={reservationMap}
        selectedDateKey={selectedDateKey}
        onSelectDate={onSelectDate}
      />
    </div>
  );
}
