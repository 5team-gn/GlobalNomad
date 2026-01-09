import dayjs from "dayjs";
import { Reservation, ReservationStatusCode } from "../types/reservation";
import { ReservationBadge } from "@/feature/reservationStatus/types/reservationStatus";

export type ReservationMap = Record<string, ReservationBadge[]>;

export function mapReservationsToCalendar(
  reservations: Reservation[]
): ReservationMap {
  const map: ReservationMap = {};
  const now = dayjs();

  reservations.forEach((r) => {
    const dateKey = dayjs(r.date).format("YYYY-MM-DD");
    if (!map[dateKey]) map[dateKey] = [];

    let effectiveStatus: ReservationStatusCode = r.status;
    
    if (
      r.status === "confirmed" &&
      dayjs(`${r.date} ${r.time}`).isBefore(now)
    ) {
      effectiveStatus = "completed";
    }

    const existingBadge = map[dateKey].find(
      (b) => b.status === effectiveStatus
    );

    if (!existingBadge) {
      map[dateKey].push({
        id: `${dateKey}-${effectiveStatus}`,
        status: effectiveStatus, 
        count: 1,
        times: [r.time],
      });
    } else {
      if (!existingBadge.times.includes(r.time)) {
        existingBadge.count += 1;
        existingBadge.times.push(r.time);
      }
    }
  });
  return map;
}