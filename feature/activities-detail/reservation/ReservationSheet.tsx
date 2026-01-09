/**
 *
 *
 * @description 액티비티 상세 - 예약 시트
 */

"use client";

import Image from "next/image";
import type { ReservationSheetProps } from "@/types/reservation/ui";
import CalendarSection from "./sections/CalendarSection";
import TimeSlotsSection from "./sections/TimeSlotsSection";
import PeopleSection from "./sections/PeopleSection";

export default function ReservationSheet({
  open,
  onClose,
  step,
  onBack,
  onNext,
  selectedDate,
  onSelectDate,
  slots,
  selectedSlot,
  onSelectSlot,
  people,
  onInc,
  onDec,
  tabletConfirmDisabled,
  onTabletConfirm,
  mobileConfirmDisabled,
  onGoPeople,
  onGoBackMobile,
  enabledDateSet,
  resetSelection,
  onMonthNavigate,
}: ReservationSheetProps) {
  const mobileTitle =
    step === "date" ? "날짜" : step === "time" ? "예약 가능한 시간" : "인원";

  return (
    <div
      className={[
        "fixed inset-0 z-[60] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 bg-black/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      <div
        className={[
          "absolute left-0 right-0 bottom-0 rounded-t-2xl bg-white shadow-lg",
          "transform transition-transform duration-300 ease-out will-change-transform",
          open ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="mx-auto w-full max-w-[920px] px-4 pt-6 md:px-6 md:pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {step === "people" && (
                <button
                  onClick={onGoBackMobile}
                  className="md:hidden rounded-md text-16-body-b text-gray-950"
                  aria-label="뒤로가기"
                >
                  <Image
                    src="/icons/icon_back.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </button>
              )}

              {/* 예약 단계 상단 타이틀 */}
              <p className="text-18-b md:text-20-b text-gray-950">
                <span className="hidden md:inline">날짜</span>
                <span className="md:hidden text-18-b ml-1">{mobileTitle}</span>
              </p>
            </div>
          </div>

          {/* 테블릿 */}
          <div className="hidden md:block mt-6">
            <div className="grid gap-6 md:grid-cols-[1fr_320px]">
              <section>
                <CalendarSection
                  value={selectedDate}
                  onChange={onSelectDate}
                  enabledDateSet={enabledDateSet}
                  onMonthNavigate={onMonthNavigate}
                />
              </section>

              <aside className="rounded-2xl bg-white p-6 pt-[30px] shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]">
                <div className="space-y-9">
                  <TimeSlotsSection
                    selectedDate={selectedDate}
                    slots={slots}
                    selectedSlot={selectedSlot}
                    onSelectSlot={onSelectSlot}
                    labelText="예약 가능한 시간"
                    emptyText="날짜를 선택해주세요."
                    labelClassName="text-16-b text-gray-950"
                    emptyClassName="mt-[14px] text-16-m text-gray-4b4b4b text-center"
                    listClassName="mt-[14px] space-y-3"
                    buttonClassName="px-4 py-[16px] text-16-m cursor-pointer"
                  />

                  {selectedDate && (
                    <div
                      className={
                        !selectedSlot ? "opacity-40 pointer-events-none" : ""
                      }
                    >
                      <PeopleSection
                        people={people}
                        onInc={onInc}
                        onDec={onDec}
                        disabled={!selectedSlot}
                        labelText="참여 인원 수"
                        labelClassName="text-14-b text-gray-950"
                        wrapperClassName="mt-5 flex items-center justify-between w-full rounded-xl bg-white px-4 py-[5px] border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              </aside>
            </div>

            <button
              onClick={onTabletConfirm}
              disabled={tabletConfirmDisabled}
              className={[
                "mt-6 mb-6 w-full rounded-xl py-4 text-16-body-b",
                tabletConfirmDisabled
                  ? "bg-gray-200 text-gray-50"
                  : "bg-primary-500 text-white",
              ].join(" ")}
            >
              확인
            </button>
          </div>

          {/* 모바일 */}
          <div className="md:hidden mt-2">
            <div className="max-h-[70vh] overflow-auto pb-[30px]">
              {step === "date" && (
                <>
                  <CalendarSection
                    value={selectedDate}
                    onChange={onSelectDate}
                    enabledDateSet={enabledDateSet}
                    onMonthNavigate={onMonthNavigate}
                  />

                  <div className="mt-8">
                    <TimeSlotsSection
                      selectedDate={selectedDate}
                      slots={slots}
                      selectedSlot={selectedSlot}
                      onSelectSlot={onSelectSlot}
                      labelText="예약 가능한 시간"
                      emptyText="날짜를 선택해주세요."
                      labelClassName="text-14-b text-gray-950"
                      emptyClassName="mt-2 text-14-m text-gray-500"
                      listClassName="px-[1px] mt-[14px] space-y-3 px-[2px]"
                      buttonClassName="px-14 py-[19px] text-14-m cursor-pointer"
                    />
                  </div>
                </>
              )}

              {step === "people" && (
                <div className="">
                  <p>예약할 인원을 선택해주세요.</p>
                  <div className="flex items-center justify-between mt-5">
                    <p className="text-16-b text-gray-950">참여 인원 수</p>
                    <PeopleSection
                      people={people}
                      onInc={onInc}
                      onDec={onDec}
                      wrapperClassName="flex items-center justify-between w-38 h-12 rounded-xl bg-white px-4 py-3 border border-gray-200"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                if (step === "date") {
                  onGoPeople();
                  return;
                }
                if (step === "people") onNext();
              }}
              disabled={
                step === "date"
                  ? !(selectedDate && selectedSlot)
                  : mobileConfirmDisabled
              }
              className={[
                "mb-[18px] w-full rounded-xl py-4 text-16-b h-[50px]",
                (
                  step === "date"
                    ? !(selectedDate && selectedSlot)
                    : mobileConfirmDisabled
                )
                  ? "bg-gray-200 text-gray-50"
                  : "bg-primary-500 text-white",
              ].join(" ")}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
