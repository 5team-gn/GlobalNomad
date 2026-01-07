import { Reservation,ReservationStatusCode } from "./types/reservation";
import  ReservationItem  from "./ReservationItem";

interface Props {
  reservations: Reservation[];
  activeTab: ReservationStatusCode;
  onStatusChange: (
    id: string | number,
    status: ReservationStatusCode
  ) => void;
}

export default function ReservationList({
  reservations,
  activeTab,
  onStatusChange,
}: Props) {
  return (
    <div className="space-y-4 mt-7.5">
      <h3 className="text-18-b font-bold">예약 내역</h3>

      {reservations.length === 0 ? (
        <p className="py-10 text-center text-sm text-gray-400">
          내역이 없습니다.
        </p>
      ) : (
        <ul className="space-y-3">
          {reservations.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              activeTab={activeTab}
              onStatusChange={onStatusChange}
            />
          ))}
        </ul>
      )}
    </div>
  );
}