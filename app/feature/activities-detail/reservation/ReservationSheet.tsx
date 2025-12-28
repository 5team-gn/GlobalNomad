"use client";

import { useMemo } from "react";
import SimpleCalendar from "./SimpleCalendar";
import type { ReservationStep, TimeSlot } from "@/types/reservation/types";
import { MOCK_AVAILABLE_SCHEDULE } from "@/app/mocks/availableSchedule.mock";

type Props = {
  open: boolean;
  onClose: () => void;

  step: ReservationStep;
  onBack: () => void;
  onNext: () => void;

  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;

  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (s: TimeSlot) => void;

  people: number;
  onInc: () => void;
  onDec: () => void;

  tabletConfirmDisabled: boolean;
  onTabletConfirm: () => void;

  mobileConfirmDisabled: boolean;
};

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
}: Props) {
  const enabledDateSet = useMemo(
    () => new Set(MOCK_AVAILABLE_SCHEDULE.map((x) => x.date)),
    []
  );

  const mobileTitle =
    step === "date" ? "날짜" : step === "time" ? "예약 가능한 시간" : "인원";

  return (
    <div
      className={[
        "fixed inset-0 z-[60] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      {/* 오버레이 */}
      <div
        className={[
          "absolute inset-0 bg-black/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      {/* 시트 */}
      <div
        className={[
          "absolute left-0 right-0 bottom-0 rounded-t-2xl bg-white shadow-lg",
          "transform transition-transform duration-300 ease-out will-change-transform",
          open ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="mx-auto w-full max-w-[920px] px-4 md:px-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="md:hidden rounded-md px-2 py-1 text-16-body-b text-gray-950"
                aria-label="뒤로가기"
                style={{ visibility: step === "people" ? "visible" : "hidden" }}
              >
                ←
              </button>

              <p className="text-16-body-b text-gray-950">
                <span className="hidden md:inline">날짜 선택</span>
                <span className="md:hidden">{mobileTitle}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-2 py-1 text-14-m text-gray-700"
            >
              닫기
            </button>
          </div>

          {/* ===================== */}
          {/* ✅ TB Content (md~lg-1): 2컬럼 */}
          {/* ===================== */}
          <div className="hidden md:block mt-4">
            <div className="grid gap-6 md:grid-cols-[1fr_320px]">
              <section>
                <SimpleCalendar
                  value={selectedDate}
                  onChange={onSelectDate}
                  enabledDateSet={enabledDateSet}
                />
              </section>

              <aside className="rounded-2xl bg-gray-25 p-4">
                <div className="space-y-6">
                  <div>
                    <p className="text-14-b text-gray-950">예약 가능한 시간</p>
                    {!selectedDate ? (
                      <p className="mt-2 text-14-m text-gray-500">
                        날짜를 선택해주세요.
                      </p>
                    ) : (
                      <div className="mt-3 space-y-2">
                        {slots.map((s) => {
                          const active = selectedSlot?.id === s.id;
                          return (
                            <button
                              key={s.id}
                              onClick={() => onSelectSlot(s)}
                              className={[
                                "w-full rounded-xl border px-4 py-3 text-14-m",
                                active
                                  ? "border-primary-500 bg-primary-50 text-primary-500"
                                  : "border-gray-200 bg-white text-gray-900",
                              ].join(" ")}
                            >
                              {s.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div
                    className={
                      !selectedSlot ? "opacity-40 pointer-events-none" : ""
                    }
                  >
                    <p className="text-14-b text-gray-950">참여 인원 수</p>
                    <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-4 py-3 border border-gray-200">
                      <button
                        onClick={onDec}
                        className="h-9 w-9 rounded-lg border border-gray-200 text-16-body-b"
                      >
                        –
                      </button>
                      <div className="text-14-b text-gray-950">{people}</div>
                      <button
                        onClick={onInc}
                        className="h-9 w-9 rounded-lg border border-gray-200 text-16-body-b"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <button
              onClick={onTabletConfirm}
              disabled={tabletConfirmDisabled}
              className={[
                "mt-6 mb-6 w-full rounded-xl py-4 text-16-body-b",
                tabletConfirmDisabled
                  ? "bg-gray-100 text-gray-400"
                  : "bg-primary-500 text-white",
              ].join(" ")}
            >
              확인
            </button>
          </div>

          {/* ===================== */}
          {/* ✅ MB Content (<md): 단계형 */}
          {/* ===================== */}
          <div className="md:hidden mt-4">
            <div className="max-h-[70vh] overflow-auto pb-4">
              {step === "date" && (
                <>
                  <SimpleCalendar
                    value={selectedDate}
                    onChange={onSelectDate}
                    enabledDateSet={enabledDateSet}
                  />
                  <div className="mt-6">
                    <p className="text-14-b text-gray-950">예약 가능한 시간</p>
                    <p className="mt-2 text-14-m text-gray-500">
                      날짜를 선택해주세요.
                    </p>
                  </div>
                </>
              )}

              {step === "time" && (
                <div>
                  <p className="text-14-b text-gray-950">예약 가능한 시간</p>
                  <div className="mt-3 space-y-2">
                    {slots.map((s) => {
                      const active = selectedSlot?.id === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => onSelectSlot(s)}
                          className={[
                            "w-full rounded-xl border px-4 py-3 text-14-m",
                            active
                              ? "border-primary-500 bg-primary-50 text-primary-500"
                              : "border-gray-200 bg-white text-gray-900",
                          ].join(" ")}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === "people" && (
                <div>
                  <p className="text-14-b text-gray-950">참여 인원 수</p>
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-4 py-3 border border-gray-200">
                    <button
                      onClick={onDec}
                      className="h-10 w-10 rounded-lg border border-gray-200 text-16-body-b"
                    >
                      –
                    </button>
                    <div className="text-14-b text-gray-950">{people}</div>
                    <button
                      onClick={onInc}
                      className="h-10 w-10 rounded-lg border border-gray-200 text-16-body-b"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onNext}
              disabled={mobileConfirmDisabled}
              className={[
                "mb-4 w-full rounded-xl py-4 text-16-body-b",
                mobileConfirmDisabled
                  ? "bg-gray-100 text-gray-400"
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
