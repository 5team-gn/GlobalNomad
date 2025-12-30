"use client";

import ReservationStatusView from "./ReservaionStatusView";
import { mockReservations } from "@/Mocks/reservationStatus.mock"; 

export default function ReservationStatusPage() {
  return (
    <section>
      {/* 헤더 */}
      <header className="mb-7.5">
        <h1 className="text-18-b mb-2.5">예약현황</h1>
        <p className="text-14-m text-gray-500">
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </header>

      {/* 드롭다운 영역 */}
      <div className="mb-7.5">
        드롭다운 자리
      </div>

      {/* 핵심 기능 */}
      
      <ReservationStatusView reservations={mockReservations} />
    </section>
  );
}
