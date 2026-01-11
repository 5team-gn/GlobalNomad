import type {
  Reservation,
  ReservationApi,
} from "@/types/reservationview/reservationview.types";

export function mapReservationApiToView(item: ReservationApi): Reservation {
  return {
    id: item.id,
    title: item.activity.title,

    date: item.date.includes("T") ? item.date.split("T")[0] : item.date,

    startTime: item.startTime.slice(0, 5),
    endTime: item.endTime.slice(0, 5),

    price: item.totalPrice,
    people: item.headCount,
    status: item.status,
    reviewWritten: item.reviewSubmitted,
  };
}
