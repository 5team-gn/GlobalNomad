"use client";

import { useEffect, useState } from "react";
import type {
  Reservation,
  ReservationStatus,
} from "@/types/reservationview.types";

import { fetchMyReservations } from "@/lib/api/reservationApi";
import axios from "axios";

export function useReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ReservationStatus>("pending");

  useEffect(() => {
    const loadReservations = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchMyReservations({ status: filter });
        setReservations(data);
      } catch (err: unknown) {
        console.error(err);

        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError("로그인이 필요합니다.");
          return;
        }

        setError("예약 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, [filter]);

  return {
    reservations,
    setReservations,
    filter,
    setFilter,
    loading,
    error,
  };
}
