import { Reservation } from "./types/reservation";
import ReservationDetailContent from "./ReservationDetailContent";

interface Props {
  dateKey: string;
  reservations: Reservation[];
  onClose: () => void;
}

export default function ReservationSideModal({
  dateKey,
  reservations,
  onClose,
}: Props) {
  return (
    <aside className="w-[360px] rounded-2xl border bg-white p-6 shadow-xl">
      <ReservationDetailContent
        dateKey={dateKey}
        reservations={reservations}
        onClose={onClose}
      />
    </aside>
  );
}
