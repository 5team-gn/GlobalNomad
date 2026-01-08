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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      <div className="relative z-10 w-[385px] h-[549px] rounded-[24px] bg-white flex flex-col">
        <div className="h-[56px] flex items-center justify-end px-[24px]">
          <button onClick={handleClose}>
            <Image src="/icon_delete.svg" alt="닫기" width={24} height={24} />
          </button>
        </div>

        <div className="flex-1 px-[30px] pb-[30px] flex flex-col">
          <h3 className="text-[20px] font-bold text-center mb-[8px]">
            {reservation.title}
          </h3>

          <p className="text-[14px] text-center text-gray-500 mb-[14px]">
            {reservation.date.replace("·", "/")} ({reservation.people}명)
          </p>

          <div className="flex gap-[8px] justify-center mb-[30px]">
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
          <div className="text-18-b mb-[16px]">소중한 경험을 들려주세요</div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={100}
            placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
            className="flex-1 p-[16px] border rounded-[12px] resize-none"
          />

          <div className="text-right text-gray-500 mt-[8px] mb-[30px] text-14-m">
            {content.length}/100
          </div>

          <Button
            variant="primary"
            size="md"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "등록 중..." : "작성하기"}
          </Button>
        </div>
      </div>
    </div>
  );
}
