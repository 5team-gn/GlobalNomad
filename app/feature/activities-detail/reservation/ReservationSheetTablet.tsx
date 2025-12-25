"use client";

import { TimeSlot } from "@/types/reservation/types";
import SimpleCalendar from "./SimpleCalendar";

type Props = {
  open: boolean;
  onClose: () => void;

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

export default function ReservationSheetTablet({
  open,
  onClose,
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

  return (
    <div className="fixed inset-0 z-[60] hidden md:block lg:hidden">
      {/* dim */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* ✅ 아래에서 올라오는 sheet */}
      <div className="absolute left-0 right-0 bottom-0 rounded-t-2xl bg-white shadow-lg">
        <div className="mx-auto w-full max-w-[920px] px-6 pt-5">
          {/* 헤더 */}
          <div className="flex items-center justify-between">
            <p className="text-16-body-b text-gray-950">날짜 선택</p>
            <button
              onClick={onClose}
              className="px-2 py-1 text-14-m text-gray-700"
            >
              닫기
            </button>
          </div>

          {/* ✅ TB: 시트 내부 2컬럼 */}
          <div className="mt-4 grid gap-6 md:grid-cols-[1fr_320px]">
            {/* 좌: 달력 */}
            <section>
              <SimpleCalendar value={selectedDate} onChange={onSelectDate} />
            </section>

            {/* 우: 시간 + 인원 */}
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

          {/* 하단 확인 버튼(전체폭) */}
          <button
            onClick={onConfirm}
            disabled={confirmDisabled}
            className={[
              "mt-6 mb-6 w-full rounded-xl py-4 text-16-body-b",
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
