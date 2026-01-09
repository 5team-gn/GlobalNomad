"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/button/Button";
import type { Reservation } from "@/types/reservationview/reservationview.types";
import { toast } from "react-hot-toast";

type ReviewContentProps = {
  isOpen: boolean;
  reservation: Reservation | null;
  onClose: () => void;
  onSubmit: (rating: number, content: string) => Promise<void> | void;
};

/**
 * ReviewContent
 *
 * 후기 작성 모달 콘텐츠
 */
export function ReviewContent({
  isOpen,
  onClose,
  onSubmit,
  reservation,
}: ReviewContentProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !reservation) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("별점을 선택해주세요");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(rating, content);
      toast.success("후기가 등록되었습니다");
      setRating(0);
      setContent("");
      onClose();
    } catch {
      toast.error("후기 등록에 실패했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setContent("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-start pt-[72px] ml-[-4px] md:ml-0 md:pt-0 md:items-center md:justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-[350px] max-h-[90vh] overflow-y-auto rounded-[20px] bg-white">
        <div className="h-[60px] flex items-center justify-end px-[24px]">
          <button onClick={handleClose}>
            <Image src="/icon_delete.svg" alt="닫기" width={24} height={24} />
          </button>
        </div>

        <div className="px-[32px] pb-[32px]">
          <h3 className="text-[20px] font-bold text-center mb-[8px]">
            {reservation.title}
          </h3>

          <p className="text-[14px] text-center text-gray-500 mb-[24px]">
            {reservation.date} ({reservation.people}명)
          </p>

          <div className="flex gap-[8px] justify-center mb-[32px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)}>
                <Image
                  src={
                    star <= rating ? "/icon_star_on.svg" : "/icon_star_off.svg"
                  }
                  alt="별점"
                  width={42}
                  height={42}
                />
              </button>
            ))}
          </div>

          <div className="text-[18px] font-bold mb-[16px]">
            소중한 경험을 들려주세요
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={100}
            placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
            className="w-full h-[120px] md:h-[179px] p-[16px] border border-gray-300 rounded-[12px] resize-none text-[14px]"
          />

          <div className="text-right text-gray-500 mt-[8px] mb-[24px] text-[14px]">
            {content.length}/100
          </div>

          <Button
            variant="primary"
            size="md"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full h-[52px] rounded-[12px]"
          >
            {isSubmitting ? "등록 중..." : "작성하기"}
          </Button>
        </div>
      </div>
    </div>
  );
}
