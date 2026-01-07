import { useState } from "react";
import {
  Reservation,
  ReservationStatusCode,
} from "@/feature/reservationStatus/types/reservation";

export default function useReservationDetail(
  reservations: Reservation[]
) {
  const [localReservations, setLocalReservations] =
    useState<Reservation[]>(reservations);

  const [activeTab, setActiveTab] =
    useState<ReservationStatusCode>("pending");

  const [selectedTime, setSelectedTime] = useState("전체");

  const handleStatusChange = (
    id: string | number,
    status: ReservationStatusCode
  ) => {
    setLocalReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const filteredReservations = localReservations.filter((r) => {
    if (r.status !== activeTab) return false;
    if (selectedTime === "전체") return true;

    const hour = new Date(r.date).getHours();
    return hour === Number(selectedTime.split(":")[0]);
  });

  const getCount = (status: ReservationStatusCode) =>
    localReservations.filter((r) => r.status === status).length;

  return {
    activeTab,
    selectedTime,
    setActiveTab,
    setSelectedTime,
    filteredReservations,
    getCount,
    handleStatusChange,
  };
}
