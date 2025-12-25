"use client";

import ReservationCalendar from "@/app/feature/activities-detail/ReservationCalendar"; // PC용 기존
import { useReservationFlow } from "./reservation/useReservationFlow";
import ReservationBarMobile from "./reservation/ReservationBarMobile";
import ReservationSheetMobile from "./reservation/ReservationSheetMobile";
import ReservationSheetTablet from "./reservation/ReservationSheetTablet";

export default function ActivityCalendarClient() {
  const flow = useReservationFlow();

  const priceLabel = "₩ 1,000";
  const maxPeople = 10;

  const openPicker = () => {
    // TB/MB 공통: 날짜 선택부터 시작
    flow.openFor("date");
  };

  const reserve = () => {
    alert("예약 API 호출 자리입니다.");
  };

  // TB는 한 화면에서 date/time/people 다 선택 -> confirm으로 완료 처리
  const tabletConfirmDisabled =
    !flow.selection.date ||
    !flow.selection.timeSlot ||
    flow.selection.people < 1;

  const onTabletConfirm = () => {
    if (tabletConfirmDisabled) return;
    // 완료 상태로 보고 하단바 요약/예약하기 활성화
    flow.close();
    // 가장 깔끔한 건 useReservationFlow에 finish() 추가인데,
    // 최소 수정으로는 step을 done으로 만드는 setter를 훅에 노출하는 게 정석입니다.
    // 여기서는 실무용으로 훅에 finish()를 추가하세요.
  };

  return (
    <>
      {/* ✅ PC(lg 이상): 기존 유지 */}
      <div className="hidden lg:block">
        <ReservationCalendar />
      </div>

      {/* ✅ TB/MB(lg 미만): 하단바 + sheet */}
      <div className="lg:hidden">
        <ReservationBarMobile
          priceLabel={priceLabel}
          selection={flow.selection}
          canReserve={flow.canReserve}
          onOpen={openPicker}
          onReserve={reserve}
        />

        {/* 하단바 가림 방지 */}
        <div className="h-[104px]" />

        {/* ✅ TB(md~lg-1): 아래에서 올라오는 sheet + 2컬럼 */}
        <ReservationSheetTablet
          open={flow.open}
          onClose={flow.close}
          selectedDate={flow.selection.date}
          onSelectDate={flow.setDate}
          slots={flow.availableSlots}
          selectedSlot={flow.selection.timeSlot}
          onSelectSlot={flow.setTimeSlot}
          people={flow.selection.people}
          onInc={() => flow.incPeople(maxPeople)}
          onDec={flow.decPeople}
          confirmDisabled={tabletConfirmDisabled}
          onConfirm={onTabletConfirm}
        />

        {/* ✅ MB(<md): 단계형 bottom sheet */}
        <div className="md:hidden">
          <ReservationSheetMobile
            open={flow.open}
            step={
              flow.step === "idle" || flow.step === "done" ? "date" : flow.step
            }
            onClose={flow.close}
            onBack={flow.goBack}
            selectedDate={flow.selection.date}
            onSelectDate={flow.setDate}
            slots={flow.availableSlots}
            selectedSlot={flow.selection.timeSlot}
            onSelectSlot={flow.setTimeSlot}
            people={flow.selection.people}
            onInc={() => flow.incPeople(maxPeople)}
            onDec={flow.decPeople}
            confirmDisabled={!flow.canConfirm}
            onConfirm={flow.goNext}
          />
        </div>
      </div>
    </>
  );
}
