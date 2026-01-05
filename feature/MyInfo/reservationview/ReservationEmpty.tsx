"use client";

import Image from "next/image";
import { ButtonLabel } from "@/components/button/Button";
import type { ReservationStatus } from "@/types/reservationview.types";

type Props = { type: "all" } | { type: "filtered"; filter: ReservationStatus };

export function ReservationEmpty(props: Props) {
  const message =
    props.type === "all"
      ? "아직 예약한 체험이 없어요"
      : `아직 ${
          {
            pending: "예약 신청",
            canceled: "예약 취소",
            confirmed: "예약 승인",
            declined: "예약 거절",
            completed: "체험 완료",
          }[props.filter]
        } 내역이 없어요`;

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Image
        src="/icon_earth.svg"
        alt="예약 내역 없음"
        width={182}
        height={182}
        className="p-[30px]"
      />
      <p className="text-[18px] text-[var(--color-gray-400)] text-center mb-[30px]">
        {message}
      </p>
      {props.type === "all" && (
        <ButtonLabel
          label="둘러보기"
          variant="primary"
          size="md"
          className="px-[40px] py-[14px] rounded-[16px]"
        />
      )}
    </div>
  );
}
