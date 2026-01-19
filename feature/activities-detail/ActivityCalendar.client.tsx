/**
 *
 * @description 액티비티 상세 - 예약 캘린더 클라이언트 컴포넌트
 *
 */

"use client";

import { mockActivityDetail } from "@/Mocks/detail/activityDetail.mock";
import { MOCK_AVAILABLE_SCHEDULE } from "@/Mocks/detail/availableSchedule.mock";
import ReservationUI from "./reservation/ReservationUI";
import { useReservationFlow } from "./reservation/useReservationFlow";
import { ReservationUIProps } from "@/types/reservation/ui";
import { getAvailableSchedule } from "./api/getAvailableSchedule";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createReservation } from "./api/createReservation";
import toast from "react-hot-toast";
import axios from "axios";
import { AlertModal, BasicModal } from "@/components/modal";

type Props = {
  activityId: number;
  price: number;
  activityUserId: number;
};

export default function ActivityCalendarClient({
  activityId,
  price,
  activityUserId,
}: Props) {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorText, setErrorText] = useState("예약에 실패했습니다.");

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successText, setSuccessText] = useState("예약이 완료되었습니다.");

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1); // 이번 달 1일
  });

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth() + 1;

  const {
    data: schedule,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["availableSchedule", activityId, year, month],
    queryFn: () => getAvailableSchedule(activityId, year, month),
    staleTime: 30_000,
    placeholderData: keepPreviousData, // 이전 데이터 유지
  });

  // 현재 로그인한 유저 아이디
  const userId =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") ?? "null")?.id ?? null
      : null;

  // 현재 유저가 작성자와 동일한지 여부
  const isOwner = userId === activityUserId;

  // 예약 플로우 훅
  const flow = useReservationFlow(schedule ?? []);

  const handleMonthNavigate = (nextMonth: Date) => {
    //  query 파라미터 갱신
    setViewMonth(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1));

    // UX 정책: 월 바뀌면 선택 초기화 (기존 resetSelection 그대로 활용)
    flow.resetSelection();
  };

  // 최대 참여 인원 수
  const maxPeople = Math.max(
    1,
    Number(process.env.NEXT_PUBLIC_RESERVATION_MAX_PEOPLE ?? 20) || 20
  );

  const reservationMutation = useMutation({
    mutationFn: (payload: { scheduleId: number; headCount: number }) =>
      createReservation(activityId, payload),
    onSuccess: () => {
      // toast.success("예약이 완료되었습니다.");
      setSuccessText("예약이 완료되었습니다.");
      setIsSuccessModalOpen(true);
      flow.resetSelection();
      flow.close(); // 모바일 시트 닫기
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        // 서버가 { message: string } 형태로 주면 그대로 사용
        const message = (e.response?.data as { message?: string })?.message;

        setErrorText(message ?? "예약에 실패했습니다. 다시 시도해주세요.");
        setIsErrorModalOpen(true);
        return;
      }

      setErrorText("예약에 실패했습니다. 다시 시도해주세요.");
      setIsErrorModalOpen(true);
      // console.error(err);
      // toast.error("예약에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // 실제 예약 실행
  const doReserve = () => {
    const slot = flow.selection.timeSlot;
    const headCount = flow.selection.people;

    if (!slot) return;
    if (headCount < 1) return;

    reservationMutation.mutate({
      scheduleId: slot.id,
      headCount,
    });
  };

  // 예약 확인 모달 열기
  const reserve = () => {
    setIsConfirmModalOpen(true);
  };

  // 예약 확인 모달에서 "확인" 눌렀을 때 실제 예약 실행
  const onConfirmReserve = () => {
    if (reservationMutation.isPending) return;
    setIsConfirmModalOpen(false);
    doReserve();
  };

  if (isLoading && !schedule)
    return <div className="h-[320px] rounded-xl bg-gray-50" />;
  if (isError || !schedule) return <div>일정 로드 실패</div>;

  const props: ReservationUIProps = {
    price: price,
    maxPeople,
    open: flow.open,
    step: flow.step === "idle" || flow.step === "done" ? "date" : flow.step,
    selection: flow.selection,
    slots: flow.availableSlots,
    openPicker: () => flow.openFor("date"),
    close: flow.close,
    setDate: flow.setDate,
    setTimeSlot: flow.setTimeSlot,
    incPeople: () => flow.incPeople(maxPeople),
    decPeople: flow.decPeople,
    goNext: flow.goNext,
    goBack: flow.goBack,
    goPeople: flow.goPeople,
    goBackMobile: flow.goBackMobile,
    canReserve: flow.canReserve,
    canConfirm: flow.canConfirm,
    onReserve: reserve,
    enabledDateSet: flow.enabledDateSet,
    resetSelection: flow.resetSelection,
    onMonthNavigate: handleMonthNavigate,
    isReserving: reservationMutation.isPending,
  };

  if (isOwner) return null;

  return (
    <>
      {/* 에러용 모달 */}
      <BasicModal
        isOpen={isErrorModalOpen}
        text={errorText}
        buttonText="확인"
        onClose={() => setIsErrorModalOpen(false)}
      />

      {/* 성공용 모달 */}
      <BasicModal
        isOpen={isSuccessModalOpen}
        text={successText}
        buttonText="확인"
        onClose={() => setIsSuccessModalOpen(false)}
      />

      {/* 예약 확인 모달 */}
      <AlertModal
        isOpen={isConfirmModalOpen}
        text="예약을 진행하시겠습니까?"
        cancelText="아니오"
        confirmText="네"
        onClose={() => setIsConfirmModalOpen(false)}
        onCancel={() => setIsConfirmModalOpen(false)}
        onConfirm={onConfirmReserve}
      />

      <ReservationUI {...props} />
    </>
  );
}
