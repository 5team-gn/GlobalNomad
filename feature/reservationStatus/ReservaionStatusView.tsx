"use client";

import { useState } from "react";
import { toDateKey } from "@/lib/utils/date";
import ReservationCalendar from "./Calendar/ReservationCalendar";
import ReservationSideModal from "./ReservationSidemdal";
import { Reservation } from "./types/reservation";

export default function ReservationStatusView({
  reservations,
  selectedTitle,
}: {
  reservations: Reservation[];
  selectedTitle: string | null;
}) {
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  // 클릭한 날짜 요소의 위치 정보를 저장할 상태
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const categoryFiltered = selectedTitle
    ? reservations.filter((r) => r.title === selectedTitle)
    : reservations;

  const dateFiltered = selectedDateKey
    ? categoryFiltered.filter((r) => {
        const key = toDateKey(new Date(r.date));
        return key === selectedDateKey;
      })
    : [];

  const handleSelectDate = (
    key: string,
    position: { top: number; left: number }
  ) => {
    if (selectedDateKey === key) {
      setSelectedDateKey(null);
      setModalPosition(null);
    } else {
      setSelectedDateKey(key);
      setModalPosition(position);
    }
  };

  return (
    <div className="relative w-full ">
      <div className="w-full">
        <ReservationCalendar
          reservations={categoryFiltered}
          selectedDateKey={selectedDateKey}
          onSelectDate={handleSelectDate}
        />
      </div>

      {selectedDateKey && modalPosition && (
        <div
          className="absolute z-50 shadow-2xl animate-in fade-in zoom-in duration-200"
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
            transform: "translate(-50%, 10px)",
          }}
        >
          <ReservationSideModal
            dateKey={selectedDateKey}
            reservations={dateFiltered}
            onClose={() => {
              setSelectedDateKey(null);
              setModalPosition(null);
            }}
            // 위치 좌표 전달
            position={modalPosition}
          />
        </div>
      )}
    </div>
  );
}
