"use client";

import SimpleCalendar from "./SimpleCalendar";
import type { TimeSlot } from "@/types/reservation/types";

type Props = {
  priceLabel: string;
  maxPeople: number;

  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;

  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (s: TimeSlot) => void;

  people: number;
  onInc: () => void;
  onDec: () => void;

  canReserve: boolean;
  onReserve: () => void;
};

export default function ReservationPanelDesktop({
  priceLabel,
  selectedDate,
  onSelectDate,
  slots,
  selectedSlot,
  onSelectSlot,
  people,
  onInc,
  onDec,
  canReserve,
  onReserve,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="mb-4">
        <p className="text-20-b text-gray-950">{priceLabel}</p>
        <p className="text-14-m text-gray-500">/ 1인</p>
      </div>

      <SimpleCalendar value={selectedDate} onChange={onSelectDate} />

      <div className="mt-6 space-y-6">
        <div>
          <p className="text-14-b text-gray-950">예약 가능한 시간</p>
          {!selectedDate ? (
            <p className="mt-2 text-14-m text-gray-500">날짜를 선택해주세요.</p>
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

        <div className={!selectedSlot ? "opacity-40 pointer-events-none" : ""}>
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

        <button
          onClick={onReserve}
          disabled={!canReserve}
          className={[
            "w-full rounded-xl py-4 text-16-body-b",
            canReserve
              ? "bg-primary-500 text-white"
              : "bg-gray-100 text-gray-400",
          ].join(" ")}
        >
          예약하기
        </button>
      </div>
    </div>
  );
}
