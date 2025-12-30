"use client";

import { useState } from "react";
import { toDateKey } from "@/lib/utils/date";
import ReservationCalendar from "./Calendar/ReservationCalendar";
import ReservationSideModal from "./ReservationSidemdal";
import { Reservation } from "./types/reservation";

export default function ReservationStatusView({
  reservations,
}: {
  reservations: Reservation[];
}) {
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  // 클릭한 날짜 요소의 위치 정보를 저장할 상태
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);

  const filtered = selectedDateKey
    ? reservations.filter((r) => {
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
    <div className="relative flex gap-6">
      <div className="flex-1">
        <ReservationCalendar
          reservations={reservations}
          selectedDateKey={selectedDateKey}
          // Calendar 내부의 날짜 버튼 클릭 시 event를 넘겨주도록 수정 필요
          onSelectDate={handleSelectDate} 
        />
      </div>

      {selectedDateKey && modalPosition && (
        <ReservationSideModal
          dateKey={selectedDateKey}
          reservations={filtered}
          onClose={() => {
            setSelectedDateKey(null);
            setModalPosition(null);
          }}
          // 위치 좌표 전달
          position={modalPosition}
        />
      )}
    </div>
  );
}