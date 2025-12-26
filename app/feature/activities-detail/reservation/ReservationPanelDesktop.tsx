"use client";

import { useMemo } from "react";
import SimpleCalendar from "./SimpleCalendar";
import type { TimeSlot } from "@/types/reservation/types";
import { MOCK_AVAILABLE_SCHEDULE } from "@/app/mocks/availableSchedule.mock";
import Image from "next/image";
import clsx from "clsx";

type Props = {
  price: number;
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
  price,
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
  const enabledDateSet = useMemo(
    () => new Set(MOCK_AVAILABLE_SCHEDULE.map((x) => x.date)),
    []
  );
  const totalPrice = price * people;
  const formatKRW = (n: number) => `₩ ${n.toLocaleString("ko-KR")}`;
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-[30px]">
      <div className="mb-4 flex items-center">
        <p className="text-24-b text-gray-950 mr-[5px]">{formatKRW(price)}</p>
        <p className="text-20-m text-gray-79747E tracking-[1px]">/인</p>
      </div>
      <p className="text-16-b">날짜</p>
      <SimpleCalendar
        value={selectedDate}
        onChange={onSelectDate}
        enabledDateSet={enabledDateSet}
      />

      <div
        className={clsx(
          "flex justify-between items-center my-6",
          !selectedSlot && "opacity-40 pointer-events-none"
        )}
      >
        <p className="text-14-b text-gray-950">참여 인원 수</p>
        <div className="mt-3 flex items-center justify-between w-35 h-10 rounded-3xl bg-white px-4 py-3 border border-gray-200">
          <button
            type="button"
            onClick={onDec}
            className="h-10 w-10 rounded-lg flex items-center justify-center"
            aria-label="인원 감소"
          >
            <Image src="/icons/icon_minus.svg" alt="" width={20} height={20} />
          </button>
          <div className="text-14-b text-gray-950">{people}</div>
          <button
            type="button"
            onClick={onInc}
            className="h-10 w-10 rounded-lg flex items-center justify-center"
            aria-label="인원 증가"
          >
            <Image src="/icons/icon_plus.svg" alt="" width={20} height={20} />
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-8">
        <div>
          <p className="text-14-b text-gray-950">예약 가능한 시간</p>
          {!selectedDate ? (
            <p className="mt-2 text-14-m text-gray-500">날짜를 선택해주세요.</p>
          ) : (
            <div className="mt-[14px] space-y-4">
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

        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <p className="text-16-b text-gray-950">총 합계</p>
            <p className="text-20-b text-gray-950">{formatKRW(totalPrice)}</p>
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
    </div>
  );
}
