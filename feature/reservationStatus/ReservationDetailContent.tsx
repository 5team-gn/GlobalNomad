import { Reservation } from "./types/reservation";
import useReservationDetail from "@/hooks/useReservationDetail";
import ReservationHeader from "./ReservationHeader";
import ReservationTabs from "./ReservationTabs";
import ReservationTimeFilter from "./ReservationTimeFilter";
import ReservationList from "./ReservationList";

interface Props {
  dateKey: string;
  reservations: Reservation[];
  onClose: () => void;
}

export default function ReservationDetailContent(props: Props) {
  const {
    activeTab,
    selectedTime,
    setActiveTab,
    setSelectedTime,
    filteredReservations,
    getCount,
    handleStatusChange,
    loadMore,
    hasMore,
  } = useReservationDetail(props.reservations);

  return (
    <>
      <ReservationHeader dateKey={props.dateKey} onClose={props.onClose} />
      <ReservationTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        getCount={getCount}
      />
      <ReservationTimeFilter value={selectedTime} onChange={setSelectedTime} />
      <ReservationList
        reservations={filteredReservations}
        activeTab={activeTab}
        onStatusChange={handleStatusChange}
        loadMore={loadMore}
        hasMore={hasMore}
      />
    </>
  );
}
