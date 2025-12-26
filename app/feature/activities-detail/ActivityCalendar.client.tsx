"use client";

import { useReservationFlow } from "./reservation/useReservationFlow";
import ReservationBarMobile from "./reservation/ReservationBarMobile";
import ReservationSheet from "./reservation/ReservationSheet";
import ReservationPanelDesktop from "./reservation/ReservationPanelDesktop";
import { mockActivityDetail } from "@/app/mocks/activityDetail.mock";

export default function ActivityCalendarClient() {
  const mock = mockActivityDetail;

  const flow = useReservationFlow();

  const priceLabel = "1000";
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
    flow.finish?.();
  };

  return (
    <div className="shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]">
      {/* ✅ PC도 flow 기반 (기능 동일) */}
      <div className="hidden lg:block">
        <ReservationPanelDesktop
          price={mock.price}
          maxPeople={maxPeople}
          selectedDate={flow.selection.date}
          onSelectDate={flow.setDate}
          slots={flow.availableSlots}
          selectedSlot={flow.selection.timeSlot}
          onSelectSlot={flow.setTimeSlot}
          people={flow.selection.people}
          onInc={() => flow.incPeople(maxPeople)}
          onDec={flow.decPeople}
          canReserve={flow.canReserve}
          onReserve={reserve}
        />
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

        {/* <div className="h-[104px]" /> */}

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
    </div>
  );
}
