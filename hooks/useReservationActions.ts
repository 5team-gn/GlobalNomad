"use client";

import type { Reservation } from "@/types/reservationview.types";

// TODO: API 연동 브랜치에서 활성화
// import {
//   cancelReservation,
//   createReview,
// } from "@/lib/api/reservationApi";

type Params = {
  selectedReservation: Reservation | null;
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  closeModal: () => void;
};

export function useReservationActions({
  selectedReservation,
  setReservations,
  closeModal,
}: Params) {
  const handleCancelConfirm = async () => {
    if (!selectedReservation) return;

    try {
      // TODO: API 연동 브랜치에서 활성화
      // await cancelReservation(selectedReservation.id);

      setReservations((prev) =>
        prev.map((r) =>
          r.id === selectedReservation.id ? { ...r, status: "canceled" } : r
        )
      );

      closeModal();
    } catch (err) {
      console.error("예약 취소 실패:", err);
    }
  };

  const handleReviewSubmit = async (rating: number, content: string) => {
    if (!selectedReservation) return;

    try {
      // TODO: API 연동 브랜치에서 활성화
      // await createReview(selectedReservation.id, { rating, content });

      setReservations((prev) =>
        prev.map((r) =>
          r.id === selectedReservation.id ? { ...r, reviewWritten: true } : r
        )
      );

      closeModal();
    } catch (err) {
      console.error("후기 작성 실패:", err);
    }
  };

  return {
    handleCancelConfirm,
    handleReviewSubmit,
  };
}
