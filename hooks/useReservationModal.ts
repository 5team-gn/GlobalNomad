import { useState } from "react";
import type { Reservation } from "@/types/reservationview.types";

type ModalType = "cancel" | "review" | null;

export function useReservationModal() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const openCancelModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setModalType("cancel");
  };

  const openReviewModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setModalType("review");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedReservation(null);
  };

  return {
    modalType,
    selectedReservation,
    openCancelModal,
    openReviewModal,
    closeModal,
  };
}
