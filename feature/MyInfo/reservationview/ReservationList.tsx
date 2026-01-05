"use client";

import type {
  Reservation,
  ReservationStatus,
} from "@/types/reservationview.types";
import { ReservationCard } from "./ReservationCard";
import { ReservationEmpty } from "./ReservationEmpty";

type Props = {
  reservations: Reservation[];
  filter: ReservationStatus;
  onCancel: (reservation: Reservation) => void;
  onReview: (reservation: Reservation) => void;
};

export function ReservationList({
  reservations,
  filter,
  onCancel,
  onReview,
}: Props) {
  if (reservations.length === 0) {
    return <ReservationEmpty type="all" />;
  }

  const filtered = reservations.filter((r) => r.status === filter);

  if (filtered.length === 0) {
    return <ReservationEmpty type="filtered" filter={filter} />;
  }

  return (
    <div className="space-y-[26px]">
      {filtered.map((item) => (
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
