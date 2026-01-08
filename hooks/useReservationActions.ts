"use client";

import type { Reservation } from "@/types/reservationview/reservationview.types";
import { cancelReservation, createReview } from "@/lib/api/reservationApi";
import { toast } from "react-hot-toast";

type Params = {
  selectedReservation: Reservation | null;
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  pushCanceledReservation: (reservation: Reservation) => void; // ⭐️ 추가
  closeModal: () => void;
};

export function useReservationActions({
  selectedReservation,
  setReservations,
  pushCanceledReservation,
  closeModal,
}: Params) {
  const handleCancelConfirm = async () => {
    if (!selectedReservation) return;

    try {
      await cancelReservation(selectedReservation.id);

      // 1️⃣ 현재 필터 리스트에서 제거
      setReservations((prev) =>
        prev.filter((r) => r.id !== selectedReservation.id)
      );

      // 2️⃣ canceled 임시 버퍼에 추가 (⭐️ 핵심)
      pushCanceledReservation({
        ...selectedReservation,
        status: "canceled",
      });

      closeModal();
    } catch (err) {
      toast.error("예약 취소에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleReviewSubmit = async (rating: number, content: string) => {
    if (!selectedReservation) return;

    try {
      await createReview(selectedReservation.id, { rating, content });

      setReservations((prev) =>
        prev.map((r) =>
          r.id === selectedReservation.id ? { ...r, reviewWritten: true } : r
        )
      );

      closeModal();
    } catch (err) {
      toast.error("예약 취소에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return {
    handleCancelConfirm,
    handleReviewSubmit,
  };
}
