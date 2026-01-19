"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [canceledBuffer, setCanceledBuffer] = useState<Reservation[]>([]);
  const [cursorId, setCursorId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterChanging, setIsFilterChanging] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const stateRef = useRef({
    loading: false,
    cursorId: undefined as number | undefined,
    hasNext: true,
    status,
    isFilterChanging: false,
    size,
  });

  useEffect(() => {
    stateRef.current = {
      ...stateRef.current,
      loading,
      cursorId,
      hasNext,
      status,
      size,
    };
  }, [loading, cursorId, hasNext, status, size]);

  const abortControllerRef = useRef<AbortController | null>(null);

  const pushCanceledReservation = useCallback((reservation: Reservation) => {
    setCanceledBuffer((prev) => {
      const exists = prev.some((r) => r.id === reservation.id);
      if (exists) return prev;
      return [reservation, ...prev];
    });
  }, []);

  const fetchMore = useMemo(
    () =>
      async (isFirstPage = false) => {
        const state = stateRef.current;

        if (state.loading) return;
        if (!isFirstPage && !state.hasNext) return;
        if (!isFirstPage && state.isFilterChanging) return;

        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        try {
          stateRef.current.loading = true;
          setLoading(true);
          setError(null);

          const data = await fetchMyReservations({
            status: state.status,
            size: state.size,
            cursorId: isFirstPage ? undefined : state.cursorId,
          });

          if (abortControllerRef.current.signal.aborted) return;

          setReservations((prev) => {
            if (isFirstPage) return data;

            const newData = data.filter(
              (newItem) =>
                !prev.some((existingItem) => existingItem.id === newItem.id)
            );
            return [...prev, ...newData];
          });

          if (data.length < state.size) {
            setHasNext(false);
          } else {
            setCursorId(data[data.length - 1]?.id);
          }
        } catch (err) {
          if (abortControllerRef.current?.signal.aborted) return;
          setError("예약 목록을 불러오는데 실패했습니다.");
        } finally {
          stateRef.current.isFilterChanging = false;
          setIsFilterChanging(false);
          stateRef.current.loading = false;
          setLoading(false);
        }
      },
    []
  );

  useEffect(() => {
    stateRef.current.isFilterChanging = true;
    setIsFilterChanging(true);

    setReservations([]);
    setCursorId(undefined);
    setHasNext(true);

    fetchMore(true);
  }, [status, fetchMore]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const state = stateRef.current;
        if (state.loading || !state.hasNext || state.isFilterChanging) return;

        fetchMore();
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.observe(target);
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
