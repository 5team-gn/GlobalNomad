"use client";

import type { Reservation } from "@/types/reservationview/reservationview.types";
import { cancelReservation, createReview } from "@/lib/api/reservationApi";
import { toast } from "react-hot-toast";

type Params = {
  selectedReservation: Reservation | null;
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  pushCanceledReservation: (reservation: Reservation) => void;
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

      setReservations((prev) =>
        prev.filter((r) => r.id !== selectedReservation.id)
      );

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
      toast.error("후기 작성에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return {
    handleCancelConfirm,
    handleReviewSubmit,
  };
}
