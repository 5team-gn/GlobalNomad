"use client";

import clsx from "clsx";
import CalendarSection from "./sections/CalendarSection";
import TimeSlotsSection from "./sections/TimeSlotsSection";
import PeopleSection from "./sections/PeopleSection";
import { useReservation } from "./reservation-context";

export default function ReservationPanelDesktop() {
  const {
    price,
    selection,
    setDate,
    slots,
    setTimeSlot,
    incPeople,
    decPeople,
    canReserve,
    onReserve,
    enabledDateSet,
    resetSelection,
    onMonthNavigate,
    isReserving,
  } = useReservation();

  const selectedDate = selection.date;
  const selectedSlot = selection.timeSlot;
  const people = selection.people;

  const totalPrice = price * people;
  const formatKRW = (n: number) => `₩ ${n.toLocaleString("ko-KR")}`;

  return (
    <div className="rounded-2xl box-border shadow-[inset_0_0_0_1px_theme(colors.gray.100)] bg-white p-[30px]">
      <div className="mb-8 flex items-center">
        <p className="text-24-b text-gray-950 mr-[5px]">{formatKRW(price)}</p>
        <p className="text-20-m text-gray-79747E tracking-[1px]">/인</p>
      </div>

      <CalendarSection
        label="날짜"
        labelClassName="text-16-b"
        value={selectedDate}
        onChange={setDate}
        enabledDateSet={enabledDateSet}
        onMonthNavigate={onMonthNavigate}
      />

      <div
        className={clsx(
          "flex justify-between items-center my-6",
          !selectedSlot && "opacity-40 pointer-events-none"
        )}
      >
        <PeopleSection
          labelText="참여 인원 수"
          labelClassName="text-14-b text-gray-950"
          people={people}
          onInc={incPeople}
          onDec={decPeople}
          wrapperClassName="mt-3 flex items-center justify-between w-35 h-10 rounded-3xl bg-white px-4 py-3 border border-gray-200"
        />
      </div>

      <div className="mt-6 space-y-10">
        <TimeSlotsSection
          labelText="예약 가능한 시간"
          labelClassName="text-14-b text-gray-950"
          selectedDate={selectedDate}
          emptyText="날짜를 선택해주세요."
          emptyClassName="mt-2 text-14-m text-gray-500"
          listClassName="mt-[14px] space-y-3"
          buttonClassName="px-4 py-[16px] text-16-m cursor-pointer"
          slots={slots}
          selectedSlot={selectedSlot}
          onSelectSlot={setTimeSlot}
        />

        <div className="flex items-center justify-between pt-5 border-t border-gray-100 ">
          <div className="flex items-center">
            <p className="text-20-m text-gray-79747E">총 합계</p>
            <p className="text-20-b text-gray-950 ml-[6px]">
              {formatKRW(totalPrice)}
            </p>
          </div>

          <button
            onClick={onReserve}
            disabled={!canReserve || !!isReserving}
            className={[
              "rounded-xl py-[15px] px-10 text-16-b h-[50px]",
              canReserve
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-gray-400",
            ].join(" ")}
          >
            {isReserving ? "예약 중..." : "예약하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
