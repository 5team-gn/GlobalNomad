"use client";

import { ReservedScheduleResponse } from "@/lib/api/getReservedSchedule";
import ReservationDetailContent from "./ReservationDetailContent";

interface Props {
  activityId: number | null; // 추가
  dateKey: string;
  schedules: ReservedScheduleResponse[]; // reservations에서 변경
  isLoading?: boolean; // 로딩 상태 추가 (선택사항)
  onClose: () => void;
}

export default function ReservationBottomSheet({
  activityId,
  dateKey,
  schedules,
  isLoading,
  onClose,
}: Props) {
  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white p-6 shadow-xl">
        {/* 드래그 핸들 */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />
        {isLoading ? (
          <div className="flex h-40 items-center justify-center text-gray-400">
            로딩 중...
          </div>
        ) : (
          <ReservationDetailContent
            activityId={activityId} // activityId 전달
            dateKey={dateKey}
            schedules={schedules} // schedules 전달
            onClose={onClose}
          />
        )}
      </div>
    </>
  );
}
