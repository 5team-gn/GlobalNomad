/**
 *
 *
 * @description 액티비티 상세 - 시간대 선택 섹션
 */

"use client";

import { TimeSlotsSectionProps } from "@/types/reservation/ui";

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
}: TimeSlotsSectionProps) {
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
