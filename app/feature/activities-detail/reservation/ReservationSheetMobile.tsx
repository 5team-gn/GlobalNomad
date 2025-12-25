"use client";

import SimpleCalendar from "./SimpleCalendar";
import type { ReservationStep, TimeSlot } from "@/types/reservation/types";

type Props = {
  open: boolean;
  step: ReservationStep;
  onClose: () => void;
  onBack: () => void;

  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;

  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (s: TimeSlot) => void;

  people: number;
  onInc: () => void;
  onDec: () => void;

  confirmDisabled: boolean;
  onConfirm: () => void;
};

export default function ReservationSheetMobile({
  open,
  step,
  onClose,
  onBack,
  selectedDate,
  onSelectDate,
  slots,
  selectedSlot,
  onSelectSlot,
  people,
  onInc,
  onDec,
  confirmDisabled,
  onConfirm,
}: Props) {
  if (!open) return null;

  const title =
    step === "date" ? "날짜" : step === "time" ? "예약 가능한 시간" : "인원";

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute left-0 right-0 bottom-0 rounded-t-2xl bg-white shadow-lg">
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {step === "people" && (
                <button
                  onClick={onBack}
                  className="rounded-md px-2 py-1 text-16-body-b text-gray-950"
                  aria-label="뒤로가기"
                >
                  ←
                </button>
              )}
              <p className="text-16-body-b text-gray-950">{title}</p>
            </div>

            <button
              onClick={onClose}
              className="px-2 py-1 text-14-m text-gray-700"
            >
              닫기
            </button>
          </div>

          <div className="mt-4 max-h-[70vh] overflow-auto pb-4">
            {step === "date" && (
              <>
                <SimpleCalendar value={selectedDate} onChange={onSelectDate} />
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
            onClick={onConfirm}
            disabled={confirmDisabled}
            className={[
              "mb-4 w-full rounded-xl py-4 text-16-body-b",
              confirmDisabled
                ? "bg-gray-100 text-gray-400"
                : "bg-primary-500 text-white",
            ].join(" ")}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
