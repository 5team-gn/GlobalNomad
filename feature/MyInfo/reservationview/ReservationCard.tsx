"use client";

import Image from "next/image";
import { ButtonLabel } from "@/components/button/Button";
import type { Reservation } from "@/types/reservationview/reservationview.types";
import { STATUS_LABEL, STATUS_STYLE } from "./ReservationView.constants";
import toast from "react-hot-toast";

type Props = {
  reservation: Reservation;
  onCancel: (reservation: Reservation) => void;
  onReview: (reservation: Reservation) => void;
};

export function ReservationCard({ reservation, onCancel, onReview }: Props) {
  const { status } = reservation;

  return (
    <div className="relative h-[181px]">
      <div className="absolute right-[-10px] top-0 h-full w-[181px] bg-primary-100 rounded-r-[32px] overflow-hidden">
        <Image
          src="/Image/thumbnail.svg"
          alt={reservation.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute left-0 top-0 h-[181px] w-[485px] bg-white rounded-[32px] shadow-[0_-8px_20px_rgba(0,0,0,0.1)] px-[40px] py-[30px]">
        <span
          className={`inline-block px-3 py-2 rounded-full text-13-b ${STATUS_STYLE[status].badge}`}
        >
          {STATUS_LABEL[status]}
        </span>

        <h3 className="mt-[12px] text-18-b text-gray-950">
          {reservation.title}
        </h3>

        <p className="mt-[10px] text-16-m text-gray-500">{reservation.date}</p>

        <div className="mt-[10px] relative">
          <div className="flex items-center gap-1">
            <span className="text-18-b text-gray-950">
              ₩{reservation.price.toLocaleString()}
            </span>
            <span className="text-16-m text-gray-400">
              {reservation.people}명
            </span>
          </div>

          <div className="absolute right-0 top-[-3px] flex gap-2">
            {status === "pending" && (
              <>
                {/* ✅ 예약 변경 (비활성 + 안내 토스트) */}
                <div
                  onClick={() =>
                    toast(
                      "현재 예약 변경은 지원하지 않습니다.\n예약 취소 후 다시 예약해주세요."
                    )
                  }
                  className="inline-block"
                >
                  <ButtonLabel
                    label="예약 변경"
                    variant="secondary"
                    size="sm"
                    disabled
                    className="
                      w-[71px] h-[29px]
                      rounded-[8px]
                      border border-gray-200
                      bg-transparent
                      opacity-40
                      cursor-not-allowed

                      disabled:!bg-transparent
                      disabled:!shadow-none
                      disabled:!ring-0

                      [&>span]:text-gray-400
                      [&>span]:pointer-events-none
                    "
                  />
                </div>

                {/* 예약 취소 */}
                <ButtonLabel
                  onClick={() => onCancel(reservation)}
                  label="예약 취소"
                  variant="ghost"
                  size="sm"
                  className="
                    w-[71px] h-[29px]
                    bg-gray-50
                    text-14-m font-normal
                    rounded-[8px]
                    [&>span]:text-gray-600
                    hover:[&>span]:text-green-500
                    hover:bg-gray-100
                    active:bg-gray-50
                    transition-colors
                  "
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </>
            )}

            {status === "completed" && !reservation.reviewWritten && (
              <ButtonLabel
                onClick={() => onReview(reservation)}
                label="후기 작성"
                variant="primary"
                size="sm"
                className="w-[71px] h-[29px] text-white rounded-[8px]"
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
                onMouseDown={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
