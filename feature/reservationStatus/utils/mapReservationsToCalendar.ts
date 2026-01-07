import dayjs from "dayjs";
import { Reservation } from "../types/reservation";
import { ReservationBadge } from
  "@/feature/reservationStatus/types/reservationStatus";

export type ReservationMap = Record<string, ReservationBadge[]>;

export function mapReservationsToCalendar(
  reservations: Reservation[]
): ReservationMap {
  const map: ReservationMap = {};

  reservations.forEach((reservation) => {
    const dateKey = dayjs(reservation.date).format("YYYY-MM-DD");

    if (!map[dateKey]) {
      map[dateKey] = [];
    }

    const existing = map[dateKey].find(
      (badge) => badge.status === reservation.status
    );

    if (existing) {
      existing.count += 1;
    } else {
      map[dateKey].push({
        id: `${dateKey}-${reservation.status}`,
        status: reservation.status, 
        count: 1,
      });
    }
  });

  return map;
}
