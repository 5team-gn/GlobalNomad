"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function ReservationCalendarCard() {
  return (
    <div className="w-full lg:w-[410px]">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        {/* 1) 가격 */}
        <div className="mb-4">
          <div className="text-2xl font-bold">₩ 1,000</div>
          <div className="text-sm text-gray-500">/ 인</div>
        </div>

        {/* 2) 달력 */}
        <div className="mb-4">
          <DayPicker mode="single" />
        </div>

        {/* 3) 인원 수 */}
        <div className="mb-4">
          <div className="text-sm font-semibold mb-2">참여 인원 수</div>
          <div className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2">
            <button className="h-8 w-8 rounded-lg border">-</button>
            <div className="text-sm font-semibold">10</div>
            <button className="h-8 w-8 rounded-lg border">+</button>
          </div>
        </div>

        {/* 4) 예약 가능 시간 */}
        <div className="mb-5">
          <div className="text-sm font-semibold mb-2">예약 가능한 시간</div>
          <div className="grid gap-2">
            <button className="w-full rounded-xl border px-3 py-2 text-sm">
              14:00~15:00
            </button>
            <button className="w-full rounded-xl border px-3 py-2 text-sm">
              15:00~16:00
            </button>
          </div>
        </div>

        {/* 5) 합계 + 예약 */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="text-sm">
            총 합계 <span className="font-bold">₩ 10,000</span>
          </div>
          <button className="rounded-xl bg-blue-600 px-4 py-2 text-white text-sm">
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
}
