"use client";

import { ReservationCard } from "./ReservationCard";
import type { Reservation } from "@/types/reservationview/reservationview.types";

type Props = {
  reservations: Reservation[];
  onCancel: (reservation: Reservation) => void;
  onReview: (reservation: Reservation) => void;
};

export function ReservationList({ reservations, onCancel, onReview }: Props) {
  return (
    <div className="flex flex-col gap-6 transition-opacity duration-150 ease-out">
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          onCancel={onCancel}
          onReview={onReview}
        />
      ))}
    </div>
  );
}
