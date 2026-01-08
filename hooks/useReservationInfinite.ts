"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  Reservation,
  ReservationStatus,
} from "@/types/reservationview/reservationview.types";
import { fetchMyReservations } from "@/lib/api/reservationApi";

type Params = {
  status: ReservationStatus;
  size?: number;
};

export function useReservationInfinite({ status, size = 10 }: Params) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [canceledBuffer, setCanceledBuffer] = useState<Reservation[]>([]); // ⭐️ 추가
  const [cursorId, setCursorId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterChanging, setIsFilterChanging] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const pushCanceledReservation = useCallback((reservation: Reservation) => {
    setCanceledBuffer((prev) => {
      const exists = prev.some((r) => r.id === reservation.id);
      if (exists) return prev;
      return [reservation, ...prev];
    });
  }, []);

  const fetchMore = useCallback(
    async (isFirstPage = false) => {
      if (loading || (!hasNext && !isFirstPage)) return;

      try {
        setLoading(true);

        const data = await fetchMyReservations({
          status,
          size,
          cursorId: isFirstPage ? undefined : cursorId,
        });

        setReservations((prev) => (isFirstPage ? data : [...prev, ...data]));

        if (data.length < size) {
          setHasNext(false);
        } else {
          setCursorId(data[data.length - 1]?.id);
        }
      } catch {
        setError("예약 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
        setIsFilterChanging(false);
      }
    },
    [status, size, cursorId, loading, hasNext]
  );

  useEffect(() => {
    setIsFilterChanging(true);
    setCursorId(undefined);
    setHasNext(true);
    fetchMore(true);
  }, [status]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchMore();
      }
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchMore]);

  const mergedReservations =
    status === "canceled"
      ? Array.from(
          new Map(
            [...canceledBuffer, ...reservations].map((r) => [r.id, r])
          ).values()
        )
      : reservations;
  return {
    reservations: mergedReservations,
    setReservations,
    pushCanceledReservation,
    loadMoreRef,
    loading,
    error,
    isFilterChanging,
  };
}
