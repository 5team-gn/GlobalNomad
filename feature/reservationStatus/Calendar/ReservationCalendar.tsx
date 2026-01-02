"use client";
import { useState } from "react";
import { getMonthCalendar } from "@/feature/reservationStatus/types/calendar";
import { mapReservationsToCalendar } from "../utils/mapReservationsToCalendar";
import { Reservation } from "../types/reservation";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

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

  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const calendarDates = getMonthCalendar(current.year, current.month);
  const reservationMap = mapReservationsToCalendar(reservations);

  const handlePrev = () => {
    setCurrent((prev) => {
      const date = new Date(prev.year, prev.month - 1, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  };

  const handleNext = () => {
    setCurrent((prev) => {
      const date = new Date(prev.year, prev.month + 1, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  };

  return (
    <div className="relative border border-white rounded-2xl pt-5 pb-2.5 shadow-xl">
      <CalendarHeader
        year={current.year}
        month={current.month}
        onPrev={handlePrev}
        onNext={handleNext}
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
