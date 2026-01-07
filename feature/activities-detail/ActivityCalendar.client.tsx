/**
 *
 * @description 액티비티 상세 - 예약 캘린더 클라이언트 컴포넌트
 *
 */

"use client";

import { mockActivityDetail } from "@/Mocks/detail/activityDetail.mock";
import ReservationUI from "./reservation/ReservationUI";
import { MOCK_AVAILABLE_SCHEDULE } from "@/Mocks/detail/availableSchedule.mock";
import { useReservationFlow } from "./reservation/useReservationFlow";
import { ReservationUIProps } from "@/types/reservation/ui";

export default function ActivityCalendarClient() {
  const activity = mockActivityDetail;

  // 예약 플로우 훅
  const flow = useReservationFlow(MOCK_AVAILABLE_SCHEDULE);

  // 최대 참여 인원 수
  const maxPeople = Math.max(
    1,
    Number(process.env.NEXT_PUBLIC_RESERVATION_MAX_PEOPLE ?? 20) || 20
  );

  // 예약하기
  const reserve = () => {
    alert("api호출");
  };

  const props: ReservationUIProps = {
    price: activity.price,
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
  };

  return <ReservationUI {...props} />;
}
