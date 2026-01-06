"use client";

import type { Reservation } from "@/types/reservationview.types";
import { ReservationCard } from "./ReservationCard";

type Props = {
  reservations: Reservation[];
  onCancel: (reservation: Reservation) => void;
  onReview: (reservation: Reservation) => void;
};

export function ReservationList({ reservations, onCancel, onReview }: Props) {
  return (
    <div className="space-y-[26px]">
      {reservations.map((item) => (
        <ReservationCard
          key={item.id}
          reservation={item}
          onCancel={onCancel}
          onReview={onReview}
        />
      ))}
    </div>
  );
}
