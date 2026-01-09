import { useState, useMemo } from "react";
import {
  Reservation,
  ReservationStatusCode,
} from "@/feature/reservationStatus/types/reservation";

const PAGE_SIZE = 10;

export default function useReservationDetail(
  initialReservations: Reservation[]
) {
  const [localReservations, setLocalReservations] =
    useState<Reservation[]>(initialReservations);
  const [activeTab, setActiveTab] = useState<ReservationStatusCode>("pending");
  const [selectedTime, setSelectedTime] = useState("전체");

  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE);

  const handleTabChange = (status: ReservationStatusCode) => {
    setActiveTab(status);
    setDisplayLimit(PAGE_SIZE);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    setDisplayLimit(PAGE_SIZE);
  };

 const allFilteredReservations = useMemo(() => {
  return [...localReservations] 
    .filter((r) => {
      if (r.status !== activeTab) return false;
      if (selectedTime === "전체") return true;
      return r.time === selectedTime; 
    })
    .sort((a, b) => {
      const getTime = (r: Reservation) => {
        const dateTimeStr = r.createdAt || `${r.date}T${r.time}:00`; 
        const parsed = Date.parse(dateTimeStr);
        return isNaN(parsed) ? 0 : parsed;
      };

      const timeA = getTime(a);
      const timeB = getTime(b);

      if (timeB !== timeA) {
        return timeB - timeA;
      }

      const idA = String(a.id);
      const idB = String(b.id);
      return idB.localeCompare(idA, undefined, { numeric: true });
    });
}, [localReservations, activeTab, selectedTime]);

  const pagedReservations = allFilteredReservations.slice(0, displayLimit);

  const hasMore = displayLimit < allFilteredReservations.length;

  const loadMore = () => {
    if (hasMore) setDisplayLimit((prev) => prev + PAGE_SIZE);
  };

  const handleStatusChange = (
    id: string | number,
    status: ReservationStatusCode
  ) => {
    if (status === "confirmed") {
      const target = localReservations.find((r) => r.id === id);
      if (!target) return;

      setLocalReservations((prev) =>
        prev.map((r) => {
          if (r.time === target.time && r.id !== id && r.status === "pending") {
            return { ...r, status: "declined" as ReservationStatusCode };
          }
          if (r.id === id) return { ...r, status: "confirmed" };
          return r;
        })
      );
    } else {
      setLocalReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    }
  };

  const getCount = (status: ReservationStatusCode) =>
    localReservations.filter((r) => r.status === status).length;

  return {
    activeTab,
    selectedTime,
    setActiveTab: handleTabChange,
    setSelectedTime: handleTimeChange,
    filteredReservations: pagedReservations,
    getCount,
    handleStatusChange,
    loadMore,
    hasMore,
  };
}
