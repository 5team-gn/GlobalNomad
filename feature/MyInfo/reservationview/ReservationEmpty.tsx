"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ButtonLabel } from "@/components/button/Button";
import type { ReservationStatus } from "@/types/reservationview/reservationview.types";

/**
 * ReservationEmpty
 *
 * 필터별 예약 내역이 없을 때 보여주는 Empty UI
 */

const EMPTY_MESSAGE: Record<ReservationStatus, string> = {
  pending: "예약 신청 내역이 없어요",
  confirmed: "승인된 예약이 없어요",
  declined: "거절된 예약이 없어요",
  canceled: "취소된 예약이 없어요",
  completed: "완료된 체험이 없어요",
};

interface Props {
  status: ReservationStatus;
}

export function ReservationEmpty({ status }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Image
        src="/icon_earth.svg"
        alt="예약 내역 없음"
        width={182}
        height={182}
        className="p-[30px]"
      />

      <p className="mb-[30px] text-center text-[18px] text-gray-400">
        {EMPTY_MESSAGE[status]}
      </p>

      <ButtonLabel
        label="둘러보기"
        variant="primary"
        size="md"
        className="rounded-[16px] px-[40px] py-[14px]"
        onClick={() => router.push("/")}
      />
    </div>
  );
}
