"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ButtonLabel } from "@/components/button/Button";

/**
 * ReservationEmpty
 *
 * 전체 예약 내역이 하나도 없을 때 보여주는 Empty UI
 */
export function ReservationEmpty() {
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
        아직 예약한 체험이 없어요
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
