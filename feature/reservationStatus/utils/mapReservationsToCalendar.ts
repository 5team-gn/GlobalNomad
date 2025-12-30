// mapReservationsToCalendar.ts
import { Reservation } from "../types/reservation";
import {
  ReservationBadge,
  ReservationStatusLabel,
} from "@/feature/reservationStatus/types/reservationStatus";
import { STATUS_TO_CALENDAR } from "../constants/statusMap";
import { toDateKey } from "@/lib/utils/date";

export type ReservationMap = Record<string, ReservationBadge[]>;

export function mapReservationsToCalendar(
  reservations: Reservation[]
): ReservationMap {
  const map: ReservationMap = {};

  reservations.forEach((reservation) => {
    const calendarStatus = STATUS_TO_CALENDAR[reservation.status];
    if (!calendarStatus) return;

    /** ✅ 안전한 날짜 키 생성 */
    const key = toDateKey(new Date(reservation.date));

    if (!map[key]) {
      map[key] = [];
    }

    const existing = map[key].find(
      (item) => item.status === calendarStatus
    );

    if (existing) {
      existing.count += reservation.people;
    } else {
      map[key].push({
        status: calendarStatus as ReservationStatusLabel,
        count: reservation.people,
      });
    }
  });

  return map;
}
