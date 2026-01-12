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
    <div className="max-md:mb-[44px]">
      <p className="hidden max-md:block mb-[12px] text-16-b text-gray-800">
        {reservation.date}
      </p>

      <div className="relative h-[181px] max-md:h-[140px]">
        <div
          className="
            absolute right-[-10px] top-0 
            h-full w-[181px]
            bg-primary-100 rounded-r-[32px] 
            overflow-hidden

            max-lg:right-0 max-lg:w-[35%]
            max-lg:rounded-r-[24px]

            max-md:w-[35%]
            max-md:rounded-r-[20px]
          "
        >
          <Image
            src="/Image/thumbnail.svg"
            alt={reservation.title}
            fill
            className="object-cover"
            style={{ objectPosition: "center" }}
          />
        </div>

        <div
          className="
            absolute left-0 top-0 
            h-[181px] w-[485px] 
            bg-white rounded-[32px] 
            shadow-[0_-8px_20px_rgba(0,0,0,0.1)] 
            px-[40px] py-[30px]
            
            max-md:w-[72%]
            max-md:h-[140px]
            max-md:rounded-[20px]
            max-md:px-[16px] max-md:py-[14px]
            max-md:shadow-[0_2px_8px_rgba(0,0,0,0.08)]
          "
        >
          <span
            className={`
              inline-block px-3 py-2 
              rounded-full text-13-b 
              ${STATUS_STYLE[status].badge}
              
              max-md:px-[8px] max-md:py-[4px]
              max-md:text-13-b max-md:leading-[14px]
            `}
          >
            {STATUS_LABEL[status]}
          </span>

          <h3
            className="
              mt-[12px] text-18-b text-gray-950
              line-clamp-1
              max-md:mt-[6px] max-md:text-14-b max-md:font-semibold max-md:leading-[18px]
            "
          >
            {reservation.title}
          </h3>

          <p className="hidden max-md:block mt-[4px] text-13-m text-gray-500">
            {reservation.startTime} - {reservation.endTime}
          </p>

          <p className="mt-[10px] text-16-m text-gray-500 max-md:hidden">
            {reservation.date} · {reservation.startTime} - {reservation.endTime}
          </p>

          <div className="mt-[10px] relative max-md:mt-[6px]">
            <div className="flex items-center gap-1">
              <span className="text-18-b text-gray-950 max-md:text-16-b max-md:font-semibold max-md:leading-[18px]">
                ₩{reservation.price.toLocaleString()}
              </span>
              <span className="text-16-m text-gray-400 max-md:text-14-m max-md:leading-[14px]">
                {reservation.people}명
              </span>
            </div>

            <div
              className="
                absolute right-0 top-[-3px] 
                flex gap-2
                max-md:hidden
              "
            >
              {status === "pending" && (
                <>
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
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden max-md:flex max-md:gap-[8px] max-md:mt-[8px]">
        {status === "pending" && (
          <>
            <div
              onClick={() =>
                toast(
                  "현재 예약 변경은 지원하지 않습니다.\n예약 취소 후 다시 예약해주세요."
                )
              }
              className="flex-1"
            >
              <ButtonLabel
                label="예약 변경"
                variant="secondary"
                size="sm"
                disabled
                className="
                  w-full h-[36px]
                  rounded-[8px]
                  border border-gray-200
                  bg-gray-50
                  opacity-40
                  cursor-not-allowed
                  [&>span]:text-gray-400
                  [&>span]:text-[13px]
                "
              />
            </div>

            <ButtonLabel
              onClick={() => onCancel(reservation)}
              label="예약 취소"
              variant="ghost"
              size="sm"
              className="
                flex-1
                w-full h-[36px]
                bg-gray-50
                text-[13px] font-normal
                rounded-[8px]
                [&>span]:text-gray-600
              "
            />
          </>
        )}

        {status === "completed" && !reservation.reviewWritten && (
          <ButtonLabel
            onClick={() => onReview(reservation)}
            label="후기 작성"
            variant="primary"
            size="sm"
            className="w-full h-[36px] text-white rounded-[8px]"
          />
        )}
      </div>
    </div>
  );
}
