import type { Reservation } from "@/types/reservationview/reservationview.types";
import type { ReservationApi } from "@/types/reservationview/api/reservation.api.types";

export function mapReservationApiToView(item: ReservationApi): Reservation {
  return {
    id: item.id,
    title: item.activity.title,
    date: item.date,
    price: item.totalPrice,
    people: item.headCount,
    status: item.status,
    reviewWritten: item.reviewSubmitted,
  };
}
