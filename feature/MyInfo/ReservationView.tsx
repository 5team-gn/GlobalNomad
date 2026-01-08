"use client";

/**
 * ReservationView
 *
 * UI 구조 리팩토링을 위한 컴포넌트
 * 데이터 로딩 / 액션 로직은 hook으로 분리되어 있음
 */

import { useState } from "react";
import type { ReservationStatus } from "@/types/reservationview/reservationview.types";

import { useReservationModal } from "@/hooks/useReservationModal";
import { useReservationInfinite } from "@/hooks/useReservationInfinite";
import { useReservationActions } from "@/hooks/useReservationActions";

import { ReservationFilter } from "./reservationview/ReservationFilter";
import { ReservationList } from "./reservationview/ReservationList";
import { ReservationEmpty } from "./reservationview/ReservationEmpty";
import { CancelContent } from "./reservationview/CancelContent";
import { ReviewContent } from "./reservationview/ReviewContent";

export default function ReservationView() {
  const [filter, setFilter] = useState<ReservationStatus>("pending");

  const {
    reservations,
    setReservations,
    pushCanceledReservation, // ⭐️ 추가
    loadMoreRef,
    loading,
    error,
    isFilterChanging,
  } = useReservationInfinite({
    status: filter,
    size: 10,
  });

  const {
    modalType,
    selectedReservation,
    openCancelModal,
    openReviewModal,
    closeModal,
  } = useReservationModal();

  const { handleCancelConfirm, handleReviewSubmit } = useReservationActions({
    selectedReservation,
    setReservations,
    pushCanceledReservation, // ⭐️ 전달
    closeModal,
  });

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center font-pretendard min-h-screen pt-[10px] pb-8">
      <div className="w-[640px]">
        <div className="mb-6">
          <h2 className="text-[18px] font-bold mb-2.5">예약내역</h2>
          <p className="text-[14px] text-gray-500">
            예약내역 변경 및 취소할 수 있습니다.
          </p>
        </div>

        <ReservationFilter value={filter} onChange={setFilter} />

        {isFilterChanging && (
          <p className="text-center text-gray-400 mt-6">불러오는 중...</p>
        )}

        {!isFilterChanging && reservations.length === 0 && (
          <ReservationEmpty type="filtered" filter={filter} />
        )}

        {reservations.length > 0 && (
          <ReservationList
            reservations={reservations}
            onCancel={openCancelModal}
            onReview={openReviewModal}
          />
        )}

        <div ref={loadMoreRef} />

        {loading && reservations.length > 0 && (
          <p className="text-center text-gray-400 mt-4">불러오는 중...</p>
        )}
      </div>

      <CancelContent
        isOpen={modalType === "cancel"}
        onClose={closeModal}
        onConfirm={handleCancelConfirm}
      />

      <ReviewContent
        isOpen={modalType === "review"}
        reservation={selectedReservation}
        onClose={closeModal}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}
