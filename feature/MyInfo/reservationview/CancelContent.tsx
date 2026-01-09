"use client";

import Image from "next/image";
import { Button } from "@/components/button/Button";

type CancelContentProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

/**
 * CancelContent
 *
 * 예약 취소 확인용 모달 콘텐츠
 */
export function CancelContent({
  isOpen,
  onClose,
  onConfirm,
}: CancelContentProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-start pt-[200px] md:items-center md:justify-center md:pt-0 md:pl-0 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 w-full max-w-[340px] rounded-[20px] bg-white p-[32px] flex flex-col items-center">
        <Image
          src="/icon_warning.svg"
          alt="경고 아이콘"
          width={88}
          height={88}
        />

        <h3 className="text-[20px] font-bold text-gray-900 mt-[20px] mb-[32px] text-center">
          예약을 취소하시겠어요?
        </h3>

        <div className="flex gap-[12px] w-full">
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            className="flex-1 h-[52px] rounded-[12px] transition-all hover:bg-gray-100 active:!bg-gray-100"
          >
            <span className="text-[16px] font-medium text-gray-700">
              아니오
            </span>
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={onConfirm}
            className="flex-1 h-[52px] rounded-[12px] transition-all hover:brightness-110 active:!brightness-100"
          >
            <span className="text-[16px] font-medium text-white">취소하기</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
