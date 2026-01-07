import { ReservationStatusCode } from "../types/reservation"; 
import { ReservationStatusLabel } from "../types/reservationStatus";

export const STATUS_TO_CALENDAR: Record<
  ReservationStatusCode,
  ReservationStatusLabel | null
> = {
  pending: "예약",
  confirmed: "승인",
  completed: "완료",
  declined: null, 
  canceled: null,
};
