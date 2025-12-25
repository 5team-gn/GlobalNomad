"use client";

import ReservationCalendar from "@/app/feature/activities-detail/ReservationCalendar";
import { useReservationFlow } from "./reservation/useReservationFlow";
import ReservationBarMobile from "./reservation/ReservationBarMobile";
import ReservationSheet from "./reservation/ReservationSheet";

export default function ActivityCalendarClient() {
  const flow = useReservationFlow();

  const priceLabel = "₩ 1,000";
  const maxPeople = 10;

  const openPicker = () => flow.openFor("date");

  const reserve = () => {
    alert("예약 API 호출 자리");
  };

  const tabletConfirmDisabled =
    !flow.selection.date ||
    !flow.selection.timeSlot ||
    flow.selection.people < 1;

  const mobileConfirmDisabled = !flow.canConfirm;

  const onTabletConfirm = () => {
    if (tabletConfirmDisabled) return;
    // ✅ 완료 처리 (useReservationFlow에 finish() 만들어 쓰는 게 정석)
    flow.finish?.(); // finish를 추가해두면 이걸로
  };

  return (
    <>
      {/* PC */}
      <div className="hidden lg:block">
        <ReservationCalendar />
      </div>

      {/* TB/MB */}
      <div className="lg:hidden">
        <ReservationBarMobile
          priceLabel={priceLabel}
          selection={flow.selection}
          canReserve={flow.canReserve}
          onOpen={openPicker}
          onReserve={reserve}
        />

        <div className="h-[104px]" />

        <ReservationSheet
          open={flow.open}
          onClose={flow.close}
          step={
            flow.step === "idle" || flow.step === "done" ? "date" : flow.step
          }
          onBack={flow.goBack}
          onNext={flow.goNext}
          selectedDate={flow.selection.date}
          onSelectDate={flow.setDate}
          slots={flow.availableSlots}
          selectedSlot={flow.selection.timeSlot}
          onSelectSlot={flow.setTimeSlot}
          people={flow.selection.people}
          onInc={() => flow.incPeople(maxPeople)}
          onDec={flow.decPeople}
          tabletConfirmDisabled={tabletConfirmDisabled}
          onTabletConfirm={onTabletConfirm}
          mobileConfirmDisabled={mobileConfirmDisabled}
        />
      </div>
    </>
  );
}
