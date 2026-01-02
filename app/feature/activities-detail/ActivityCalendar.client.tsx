"use client";

import { mockActivityDetail } from "@/app/mocks/activityDetail.mock";
import ReservationUI from "./reservation/ReservationUI";
import { useReservationFlow } from "./reservation/useReservationFlow";

export default function ActivityCalendarClient() {
  const mock = mockActivityDetail;
  const flow = useReservationFlow();
  const maxPeople = 10;

  const reserve = () => {
    alert("예약 API 호출 자리");
  };

  const props = {
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
  } as const;

  return <ReservationUI {...props} />;
}
