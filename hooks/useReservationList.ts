"use client";

import { useEffect, useState } from "react";
import type {
  Reservation,
  ReservationStatus,
} from "@/types/reservationview.types";

import { RESERVATION_MOCK_LIST } from "@/Mocks/ReservationView.mock";

// TODO: API 연동 브랜치에서 활성화
// import { fetchMyReservations } from "@/lib/api/reservationApi";

export function useReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ReservationStatus>("pending");

  const filteredList = reservations.filter((r) => r.status === filter);

  useEffect(() => {
    try {
      setLoading(true);

      // TODO: API 연동 브랜치에서 교체
      // const data = await fetchMyReservations();
      // setReservations(data);

      setReservations(RESERVATION_MOCK_LIST);
    } catch (err) {
      console.error(err);
      setError("예약 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    reservations,
    setReservations, // 액션 훅에서 사용
    filter,
    setFilter,
    filteredList,
    loading,
    error,
  };
}
