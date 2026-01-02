"use client";

import ReservationDetailContent from "./ReservationDetailContent";
import { Reservation } from "./types/reservation";

interface Props {
  dateKey: string;
  reservations: Reservation[];
  onClose: () => void;
}

export default function ReservationBottomSheet({
  dateKey,
  reservations,
  onClose,
}: Props) {
  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white p-6 shadow-xl">
        {/* 드래그 핸들 */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />

        <ReservationDetailContent
          dateKey={dateKey}
          reservations={reservations}
          onClose={onClose}
        />
      </div>
    </>
  );
}
