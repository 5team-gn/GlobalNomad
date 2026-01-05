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
  const mock = mockActivityDetail;
  const flow = useReservationFlow(MOCK_AVAILABLE_SCHEDULE);
  const maxPeople = 10;

  const reserve = () => {
    alert("api호출");
  };

  const props: ReservationUIProps = {
    price: mock.price,
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
    clearTimeSlot: flow.clearTimeSlot,
  };

  return <ReservationUI {...props} />;
}
