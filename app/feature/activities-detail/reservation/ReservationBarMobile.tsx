"use client";

import { formatDateKR } from "@/types/reservation/types";
import type { ReservationSelection } from "@/types/reservation/types";

type Props = {
  price: number;
  selection: ReservationSelection;
  canReserve: boolean;
  people: number;
  onOpen: () => void; // 날짜 선택하기
  onReserve: () => void; // 예약하기
};

export default function ReservationBarMobile({
  price,
  selection,
  canReserve,
  people,
  onOpen,
  onReserve,
}: Props) {
  const rightText =
    selection.date && selection.timeSlot
      ? `${formatDateKR(selection.date)} ${selection.timeSlot.label}`
      : "날짜 선택하기";

  const totalPrice = price * people;
  const formatKRW = (n: number) => `₩ ${n.toLocaleString("ko-KR")}`;

  return (
    <div className="fixed left-0 right-0 bottom-0 z-50 border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center justify-between">
            <p className="text-18-b text-gray-950 tracking-[-0.5px]">
              {formatKRW(totalPrice)}{" "}
            </p>
            <span className="text-16-m ml-[6px] text-gray-79747E">
              / {people}명
            </span>
          </div>

          <button
            onClick={onOpen}
            className="text-16-b text-primary-500 tracking-[-0.5px] decoration-2 underline underline-offset-4 cursor-pointer"
          >
            {rightText}
          </button>
        </div>

        <button
          onClick={onReserve}
          disabled={!canReserve}
          className={[
            "mt-[14px] w-full rounded-xl py-4 text-16-b",
            canReserve ? "bg-primary-500 text-white" : "bg-gray-200 text-gray-50",
          ].join(" ")}
        >
          예약하기
        </button>
      </div>
    </div>
  );
}
