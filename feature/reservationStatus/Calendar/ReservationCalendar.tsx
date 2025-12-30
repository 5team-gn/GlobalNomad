interface Reservation {
  status: "예약" | "승인" | "완료";
  count: number;
}

interface Props {
  reservations: Record<number, Reservation[]>;
  year: number;
  month: number;
}
export default function ReservationCalendar({
  reservations,
  year,
  month,
}: Props) {
  return (
    <div className="border rounded-3xl p-8">
      {/* CalendarHeader */}
      {/* CalendarWeekdays */}
      {/* CalendarGrid */}
    </div>
  );
}
