/**
 *
 *
 * @description 액티비티 상세 - 예약 UI
 */

"use client";

import type {
  ReservationSelection,
  ReservationStep,
  TimeSlot,
} from "@/types/reservation/types";

import ReservationPanelDesktop from "./ReservationPanelDesktop";
import ReservationBarMobile from "./ReservationBarMobile";
import ReservationSheet from "./ReservationSheet";

type Props = {
  price: number;
  maxPeople: number;
  open: boolean;
  step: ReservationStep;
  selection: ReservationSelection;
  slots: TimeSlot[];
  openPicker: () => void;
  close: () => void;
  setDate: (d: Date) => void;
  setTimeSlot: (s: TimeSlot) => void;
  incPeople: () => void;
  decPeople: () => void;
  goNext: () => void;
  goBack: () => void;
  goPeople: () => void;
  goBackMobile: () => void;
  canReserve: boolean;
  canConfirm: boolean;
  onReserve: () => void;
};

export default function ReservationUI(props: Props) {
  const tabletConfirmDisabled =
    !props.selection.date ||
    !props.selection.timeSlot ||
    props.selection.people < 1;

  const mobileConfirmDisabled = !props.canConfirm;

  return (
    <div className="shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]">
      {/* PC */}
      <div className="hidden lg:block">
        <ReservationPanelDesktop
          price={props.price}
          maxPeople={props.maxPeople}
          selectedDate={props.selection.date}
          onSelectDate={props.setDate}
          slots={props.slots}
          selectedSlot={props.selection.timeSlot}
          onSelectSlot={props.setTimeSlot}
          people={props.selection.people}
          onInc={props.incPeople}
          onDec={props.decPeople}
          canReserve={props.canReserve}
          onReserve={props.onReserve}
        />
      </div>

      {/* 테블릿 / 모바일 */}
      <div className="lg:hidden">
        <ReservationBarMobile
          price={props.price}
          people={props.selection.people}
          selection={props.selection}
          canReserve={props.canReserve}
          onOpen={props.openPicker}
          onReserve={props.onReserve}
        />

        {/* 바텀시트 */}
        <ReservationSheet
          open={props.open}
          onClose={props.close}
          step={props.step}
          onBack={props.goBack}
          onNext={props.goNext}
          selectedDate={props.selection.date}
          onSelectDate={props.setDate}
          slots={props.slots}
          selectedSlot={props.selection.timeSlot}
          onSelectSlot={props.setTimeSlot}
          people={props.selection.people}
          onInc={props.incPeople}
          onDec={props.decPeople}
          tabletConfirmDisabled={tabletConfirmDisabled}
          onTabletConfirm={props.close}
          mobileConfirmDisabled={mobileConfirmDisabled}
          onGoPeople={props.goPeople}
          onGoBackMobile={props.goBackMobile}
        />
      </div>
    </div>
  );
}
