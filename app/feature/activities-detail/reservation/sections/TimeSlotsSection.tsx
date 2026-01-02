"use client";

import type { TimeSlot } from "@/types/reservation/types";

type Props = {
  selectedDate: Date | null;

  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (s: TimeSlot) => void;

  // ✅ ReservationSheet에서 쓰는 이름 그대로 받기
  labelText: string;
  emptyText: string;

  labelClassName: string;
  emptyClassName: string;
  listClassName: string;
  buttonClassName: string;
};

export default function TimeSlotsSection({
  selectedDate,
  slots,
  selectedSlot,
  onSelectSlot,
  labelText,
  emptyText,
  labelClassName,
  emptyClassName,
  listClassName,
  buttonClassName,
}: Props) {
  return (
    <div>
      <p className={labelClassName}>{labelText}</p>

      {!selectedDate ? (
        <p className={emptyClassName}>{emptyText}</p>
      ) : (
        <div className={listClassName}>
          {slots.map((s) => {
            const active = selectedSlot?.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectSlot(s)}
                className={[
                  "w-full rounded-xl",
                  buttonClassName,
                  active
                    ? "ring-2 ring-primary-500 bg-primary-100 text-primary-500 "
                    : "ring-1 ring-gray-200 bg-white text-gray-950",
                ].join(" ")}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
