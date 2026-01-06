/**
 *
 *
 * @description 액티비티 상세 - 예약 UI
 */

"use client";

import ReservationPanelDesktop from "./ReservationPanelDesktop";
import ReservationBarMobile from "./ReservationBarMobile";
import ReservationSheet from "./ReservationSheet";
import { ReservationUIProps } from "@/types/reservation/ui";

export default function ReservationUI(props: ReservationUIProps) {
  // 데스크탑 예약 패널용 확인 버튼 활성화 여부
  const tabletConfirmDisabled =
    !props.selection.date ||
    !props.selection.timeSlot ||
    props.selection.people < 1;
  // 모바일 예약 시트용 확인 버튼 활성화 여부
  const mobileConfirmDisabled = !props.canConfirm;

  const { date, timeSlot, people } = props.selection;

  return (
    <div className="shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]">
      {/* PC */}
      <div className="hidden lg:block">
        <ReservationPanelDesktop
          price={props.price}
          maxPeople={props.maxPeople}
          selectedDate={date}
          setDate={props.setDate}
          slots={props.slots}
          selectedSlot={timeSlot}
          setTimeSlot={props.setTimeSlot}
          people={people}
          incPeople={props.incPeople}
          decPeople={props.decPeople}
          canReserve={props.canReserve}
          onReserve={props.onReserve}
          enabledDateSet={props.enabledDateSet}
          resetSelection={props.resetSelection}
        />
      </div>

      {/* 테블릿 / 모바일 */}
      <div className="lg:hidden">
        <ReservationBarMobile
          price={props.price}
          selection={props.selection}
          canReserve={props.canReserve}
          openPicker={props.openPicker}
          onReserve={props.onReserve}
        />

        {/* 바텀시트 */}
        <ReservationSheet
          open={props.open}
          onClose={props.close}
          step={props.step}
          onBack={props.goBack}
          onNext={props.goNext}
          selectedDate={date}
          onSelectDate={props.setDate}
          slots={props.slots}
          selectedSlot={timeSlot}
          onSelectSlot={props.setTimeSlot}
          people={people}
          onInc={props.incPeople}
          onDec={props.decPeople}
          tabletConfirmDisabled={tabletConfirmDisabled}
          onTabletConfirm={props.close}
          mobileConfirmDisabled={mobileConfirmDisabled}
          onGoPeople={props.goPeople}
          onGoBackMobile={props.goBackMobile}
          enabledDateSet={props.enabledDateSet}
          resetSelection={props.resetSelection}
        />
      </div>
    </div>
  );
}
