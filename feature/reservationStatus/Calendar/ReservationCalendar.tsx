"use client";

import { useEffect, useState } from "react";
import { getMonthCalendar } from "@/feature/reservationStatus/types/calendar";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { useCalendar } from "@/hooks/useCalendar";
import { getReservationDashboard } from "@/lib/api/getReservedSchedule";

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

  // 가공된 데이터 형태: { "2026-01-13": [{ status: 'pending', count: 1 }, ...] }
  const [badgesMap, setBadgesMap] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const fetchDashboard = async () => {
      // activityId가 없으면 데이터를 비우고 종료
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

        // 🔴 핵심 수정: API 응답 객체를 배열 형태로 변환하여 저장
        const newBadgesMap = data.reduce((acc, curr) => {
          /**
           * curr.reservations가 { pending: 1, confirmed: 2 } 형태라면
           * 이를 [{ status: 'pending', count: 1 }, { status: 'confirmed', count: 2 }] 배열로 변환합니다.
           */
          const badgeArray = Object.entries(curr.reservations)
            .filter(([_, count]) => (count as number) > 0) // 수량이 0보다 큰 데이터만 추출
            .map(([status, count]) => ({
              status: status as any,
              count: count as number,
            }));

          acc[curr.date] = badgeArray; 
          return acc;
        }, {} as Record<string, any[]>);

        console.log("변환된 배지 데이터:", newBadgesMap); // 디버깅용 로그
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
        badgesMap={badgesMap}
        selectedDateKey={selectedDateKey}
        onSelectDate={onSelectDate}
      />
    </div>
  );
}