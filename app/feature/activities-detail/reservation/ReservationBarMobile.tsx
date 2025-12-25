"use client";

import { formatDateKR } from "@/types/reservation/types";
import type { ReservationSelection } from "@/types/reservation/types";

type Props = {
  priceLabel: string; // "₩1,000"
  selection: ReservationSelection;
  canReserve: boolean;

  onOpen: () => void; // 날짜 선택하기
  onReserve: () => void; // 예약하기
};

export default function ReservationBarMobile({
  priceLabel,
  selection,
  canReserve,
  onOpen,
  onReserve,
}: Props) {
  const rightText =
    selection.date && selection.timeSlot
      ? `${formatDateKR(selection.date)} ${selection.timeSlot.label}`
      : "날짜 선택하기";

  return (
    <div className="fixed left-0 right-0 bottom-0 z-50 border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-16-body-b text-gray-950">
              {priceLabel}{" "}
              <span className="text-14-m text-gray-500">/ 1명</span>
            </p>
          </div>

          <button
            onClick={onOpen}
            className="text-14-m text-primary-500 underline underline-offset-4"
          >
            {rightText}
          </button>
        </div>

        <button
          onClick={onReserve}
          disabled={!canReserve}
          className={[
            "mt-3 w-full rounded-xl py-4 text-16-body-b",
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
