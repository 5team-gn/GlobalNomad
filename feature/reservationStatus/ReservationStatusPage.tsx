"use client";

import { useState } from "react";
import ReservationCategoryFilter from "../../components/dropdown/ReservationCategoryFilter";
import ReservationStatusView from "./ReservaionStatusView";
import { mockReservations } from "@/Mocks/reservationStatus.mock";

export default function ReservationStatusPage() {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  return (
    <section>
      {/* 헤더 */}
      <header className="mb-7.5">
        <h1 className="text-18-b mb-2.5">예약현황</h1>
        <p className="text-14-m text-gray-500">
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </header>

      {/* 카테고리 */}
      <div className="mb-7.5">
        <ReservationCategoryFilter
          reservations={mockReservations}
          selectedTitle={selectedTitle}
          onChange={setSelectedTitle}
        />
      </div>

      {/* 달력 */}
      <ReservationStatusView
        reservations={mockReservations}
        selectedTitle={selectedTitle}
      />
    </section>
  );
}
