"use client";

/**
 * ReservationView
 *
 * UI 구조 리팩토링을 위한 컴포넌트
 * 데이터 로딩 / 액션 로직은 hook으로 분리되어 있음
 * 실제 API 연동은 feat/reservation-api 브랜치에서 진행
 */

import { useReservationModal } from "@/hooks/useReservationModal";
import { useReservationList } from "@/hooks/useReservationList";
import { useReservationActions } from "@/hooks/useReservationActions";

import { ReservationFilter } from "./reservationview/ReservationFilter";
import { ReservationList } from "./reservationview/ReservationList";
import { ReservationEmpty } from "./reservationview/ReservationEmpty";
import { CancelContent } from "./reservationview/CancelContent";
import { ReviewContent } from "./reservationview/ReviewContent";

export default function ReservationView() {
  const {
    reservations,
    setReservations,
    filter,
    setFilter,
    filteredList,
    loading,
    error,
  } = useReservationList();

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
    closeModal,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

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

        {reservations.length > 0 && (
          <ReservationFilter value={filter} onChange={setFilter} />
        )}

        {reservations.length === 0 ? (
          <ReservationEmpty type="all" />
        ) : filteredList.length === 0 ? (
          <ReservationEmpty type="filtered" filter={filter} />
        ) : (
          <ReservationList
            reservations={filteredList}
            onCancel={openCancelModal}
            onReview={openReviewModal}
          />
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
