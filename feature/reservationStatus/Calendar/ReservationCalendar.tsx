"use client";
import { useEffect, useState } from "react";
import { getMonthCalendar } from "@/feature/reservationStatus/types/calendar";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { useCalendar } from "@/hooks/useCalendar";
import {
  getReservationDashboard,
} from "@/lib/api/getReservedSchedule";

interface Props {
  activityId: number | null;
  selectedDateKey: string | null;
  onSelectDate: (key: string, position: { top: number; left: number }) => void;
}

export default function ReservationCalendar({
  activityId,
  selectedDateKey,
  onSelectDate,
}: Props) {
  const today = new Date();
  const { year, month, prevMonth, nextMonth } = useCalendar(
    today.getFullYear(),
    today.getMonth()
  );

  // 데이터를 가공된 객체 형태 { "2024-01-09": { pending: 1, ... } } 로 관리합니다.
  const [badgesMap, setBadgesMap] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!activityId) {
        setBadgesMap({});
        return;
      }

      try {
        const formattedMonth = String(month + 1).padStart(2, "0");
        const data = await getReservationDashboard(
          activityId,
          String(year),
          formattedMonth
        );

        const newBadgesMap = data.reduce((acc, curr) => {
          acc[curr.date] = curr.reservations; 
          return acc;
        }, {} as Record<string, any>);

        setBadgesMap(newBadgesMap);
      } catch (error) {
        console.error("대시보드 데이터 로딩 실패:", error);
        setBadgesMap({});
      }
    };

    fetchDashboard();
  }, [activityId, year, month]);

  const calendarDates = getMonthCalendar(year, month);

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
        badgesMap={badgesMap} // 가공된 배지 데이터 전달
        selectedDateKey={selectedDateKey}
        onSelectDate={onSelectDate}
      />
    </div>
  );
}