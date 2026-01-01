"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/button/Button";
import ButtonLabel from "@/components/button/Button.Label";

type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

type Reservation = {
  id: number;
  title: string;
  date: string;
  price: number;
  people: number;
  status: ReservationStatus;
};

const STATUS_LABEL: Record<ReservationStatus, string> = {
  pending: "예약 완료",
  confirmed: "예약 승인",
  canceled: "예약 취소",
  declined: "예약 거절",
  completed: "체험 완료",
};

// empty state 테스트 하는법
// const reservations: Reservation[] = [];
// 밑에 목데이터들을 주석처리하고 위의 빈 배열을 사용하세요.

// TODO: API 연동 필요
// 연동시 목데이터 삭제 필요

const reservations: Reservation[] = [
  {
    id: 1,
    title: "함께 배우는 플로잉 댄스",
    date: "2023.02.14 · 11:00 - 12:30",
    price: 10000,
    people: 1,
    status: "pending",
  },
  {
    id: 2,
    title: "내 강아지 인생 사진 찍어주기",
    date: "2023.02.11 · 13:00 - 14:00",
    price: 35000,
    people: 1,
    status: "canceled",
  },
  {
    id: 3,
    title: "이색 액티비티 체험",
    date: "2023.01.10 · 10:00 - 12:00",
    price: 60000,
    people: 3,
    status: "declined",
  },
  {
    id: 4,
    title: "별과 함께하는 북촌 체험",
    date: "2023.01.14 · 15:00 - 16:00",
    price: 40000,
    people: 2,
    status: "completed",
  },
  {
    id: 5,
    title: "요리 클래스 체험",
    date: "2023.09.20 · 09:00 - 10:30",
    price: 25000,
    people: 1,
    status: "completed",
  },
  {
    id: 6,
    title: "여행 클래스 체험",
    date: "2023.11.20 · 09:00 - 10:30",
    price: 37000,
    people: 1,
    status: "confirmed",
  },
];

const STATUS_STYLE: Record<
  ReservationStatus,
  { badge: string; button: string }
> = {
  pending: {
    badge: "bg-[var(--color-green-100)] text-[var(--color-green-500)]",
    button: "bg-[var(--color-green-100)] text-[var(--color-green-500)]",
  },
  confirmed: {
    badge: "bg-[var(--color-primary-100)] text-[var(--color-primary-500)]",
    button: "bg-[var(--color-primary-100)] text-[var(--color-primary-500)]",
  },
  canceled: {
    badge: "bg-[var(--color-gray-100)] text-[var(--color-gray-600)]",
    button: "bg-[var(--color-gray-100)] text-[var(--color-gray-600)]",
  },
  declined: {
    badge: "bg-[#FCECEA] text-[#F96767]",
    button: "bg-[#FCECEA] text-[#F96767]",
  },
  completed: {
    badge: "bg-[var(--color-primary-100)] text-[var(--color-primary-500)]",
    button: "bg-[var(--color-primary-100)] text-[var(--color-primary-500)]",
  },
};
// TODO: 공통 모달 컴포넌트로 교체 필요
// 취소 모달
function CancelModal({
  isOpen,
  onClose,
  onConfirm,
  reservationTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  reservationTitle: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 w-[400px] rounded-[24px] bg-white p-[32px] flex flex-col items-center">
        {/* 아이콘 */}
        <Image
          src="/icon_warning.svg"
          alt="경고 아이콘"
          width={80}
          height={80}
        />

        <h3 className="text-[20px] font-bold text-[var(--color-gray-950)] mb-[24px] text-center">
          예약을 취소하시겠어요?
        </h3>

        <div className="flex gap-[12px]">
          <Button
            onClick={onClose}
            className="px-[40px] py-[14px] rounded-[12px] border border-[#E5E7EB] bg-white"
          >
            <ButtonLabel className="text-[16px] font-medium text-[var(--color-gray-700)]">
              아니오
            </ButtonLabel>
          </Button>

          <Button
            onClick={onConfirm}
            className="px-[40px] py-[14px] rounded-[12px] bg-[var(--color-primary-500)]"
          >
            <ButtonLabel className="text-[16px] font-medium text-white">
              취소하기
            </ButtonLabel>
          </Button>
        </div>
      </div>
    </div>
  );
}
// TODO: 공통 모달 컴포넌트로 교체 필요
// 후기 작성 모달
function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  reservation,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, content: string) => void;
  reservation: Reservation | null;
}) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  if (!isOpen || !reservation) return null;

  const handleSubmit = () => {
    if (rating === 0) {
      alert("별점을 선택해주세요");
      return;
    }
    onSubmit(rating, content);
    setRating(0);
    setContent("");
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
        {/* 닫기 버튼 영역 */}
        <div className="h-[56px] flex items-center justify-end px-[24px] flex-shrink-0">
          <button onClick={handleClose}>
            <Image src="/icon_delete.svg" alt="닫기" width={24} height={24} />
          </button>
        </div>

        {/* 내용 영역 */}
        <div className="flex-1 px-[30px] pb-[30px] flex flex-col">
          {/* 체험 정보 */}
          <h3 className="text-[20px] font-bold text-[var(--color-gray-950)] text-center mb-[8px]">
            {reservation.title}
          </h3>
          <p className="text-[14px] text-[var(--color-gray-500)] text-center mb-[30px]">
            {reservation.date.replace("·", "/")} ({reservation.people}명)
          </p>

          {/* 별점 */}
          <div className="flex gap-[8px] justify-center mb-[30px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="w-[56px] h-[56px]"
              >
                <Image
                  src={
                    star <= rating ? "/icon_star_on.svg" : "/icon_star_off.svg"
                  }
                  alt={star <= rating ? "선택된 별" : "비활성 별"}
                  width={56}
                  height={56}
                />
              </button>
            ))}
          </div>

          {/* 후기 입력 */}
          <div className="flex-1 flex flex-col">
            <label className="block text-[18px] font-bold text-[var(--color-gray-950)] mb-[16px]">
              소중한 경험을 들려주세요
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
              maxLength={100}
              className="w-full flex-1 p-[16px] border border-[var(--color-gray-300)] rounded-[12px] text-[16px] resize-none focus:outline-none focus:border-[var(--color-primary-500)] placeholder:text-[var(--color-gray-400)]"
            />
            <div className="text-right text-[14px] text-[var(--color-gray-500)] mt-[8px] mb-[16px]">
              {content.length}/100
            </div>
          </div>

          {/* 작성하기 버튼 */}
          <Button
            onClick={handleSubmit}
            className="w-full h-[48px] rounded-[12px] bg-[var(--color-primary-500)]"
          >
            <ButtonLabel className="text-[16px] font-medium text-white">
              작성하기
            </ButtonLabel>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ReservationView() {
  const [filter, setFilter] = useState<ReservationStatus>("pending");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const filteredList = reservations.filter((r) => r.status === filter);

  const handleCancelClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsCancelModalOpen(true);
  };

  const handleReviewClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsReviewModalOpen(true);
  };

  const handleConfirmCancel = () => {
    console.log("예약 취소:", selectedReservation?.id);
    setIsCancelModalOpen(false);
    setSelectedReservation(null);
  };

  const handleSubmitReview = (rating: number, content: string) => {
    console.log("후기 작성:", {
      reservationId: selectedReservation?.id,
      rating,
      content,
    });
    setIsReviewModalOpen(false);
    setSelectedReservation(null);
  };

  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
    setSelectedReservation(null);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedReservation(null);
  };

  return (
    <div className="flex justify-center font-pretendard min-h-screen pt-[10px] pb-8 pl-[50px]">
      <div className="w-[640px]">
        {/* 제목 */}
        <div className="mb-6">
          <h2 className="text-[18px] text-[var(--color-gray-950)] font-bold mb-2.5">
            예약내역
          </h2>
          <p className="text-[14px] text-[var(--color-gray-500)]">
            예약내역 변경 및 취소할 수 있습니다.
          </p>
        </div>

        {/* 필터 - 데이터가 있을 때만 표시 */}
        {reservations.length > 0 && (
          <div className="flex gap-2 mb-6">
            {Object.entries({
              pending: "예약 신청",
              canceled: "예약 취소",
              confirmed: "예약 승인",
              declined: "예약 거절",
              completed: "체험 완료",
            }).map(([key, label]) => (
              <Button
                key={key}
                onClick={() => setFilter(key as ReservationStatus)}
                className={`px-4 py-2 rounded-full text-[14px] font-medium ${
                  filter === key
                    ? STATUS_STYLE[key as ReservationStatus].badge
                    : "bg-white text-[var(--color-gray-600)] border border-[var(--color-gray-300)]"
                }`}
              >
                <ButtonLabel>{label}</ButtonLabel>
              </Button>
            ))}
          </div>
        )}

        {/* 카드 리스트 */}
        {reservations.length === 0 ? (
          // 전체 예약이 없을 때
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-0">
              <Image
                src="/icon_earth.svg"
                alt="예약 내역 없음"
                width={182}
                height={182}
                className="p-[30px]"
              />
            </div>
            <p className="text-[18px] text-[var(--color-gray-400)] text-center mb-[30px] mt-0">
              아직 예약한 체험이 없어요
            </p>
            <Button className="px-[40px] py-[14px] bg-[var(--color-primary-500)] text-white text-[16px] font-medium rounded-[16px] cursor-pointer">
              <ButtonLabel>둘러보기</ButtonLabel>
            </Button>
          </div>
        ) : filteredList.length === 0 ? (
          // 특정 필터의 예약만 없을 때
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-0">
              <Image
                src="/icon_earth.svg"
                alt="예약 내역 없음"
                width={182}
                height={182}
                className="p-[30px]"
              />
            </div>
            <p className="text-[18px] text-[var(--color-gray-400)] text-center mt-0">
              아직{" "}
              {
                {
                  pending: "예약 신청",
                  canceled: "예약 취소",
                  confirmed: "예약 승인",
                  declined: "예약 거절",
                  completed: "체험 완료",
                }[filter]
              }{" "}
              내역이 없어요
            </p>
          </div>
        ) : (
          // 예약 카드 리스트
          <div className="space-y-[26px]">
            {filteredList.map((item) => (
              <div key={item.id} className="relative h-[181px]">
                {/* 오른쪽 컬러 영역 */}
                <div className="absolute right-0 top-0 h-full w-[181px] bg-[var(--color-primary-100)] rounded-r-[32px]" />

                {/* 왼쪽 카드 */}
                <div className="absolute left-0 top-0 h-[181px] w-[485px] bg-white rounded-[32px] shadow-[0_-8px_20px_rgba(0,0,0,0.1)] px-[40px] py-[30px]">
                  <span
                    className={`inline-block px-2 py-[2px] rounded-full text-[13px] font-bold ${
                      STATUS_STYLE[item.status].badge
                    }`}
                  >
                    {STATUS_LABEL[item.status]}
                  </span>

                  <h3 className="mt-1 text-[18px] font-bold text-[var(--color-gray-950)]">
                    {item.title}
                  </h3>

                  <p className="text-[16px] text-[var(--color-gray-500)]">
                    {item.date}
                  </p>

                  <div className="mt-2 relative">
                    <div className="flex items-center gap-1">
                      <span className="text-[18px] font-bold text-[var(--color-gray-950)]">
                        ₩{item.price.toLocaleString()}
                      </span>
                      <span className="text-[16px] text-[var(--color-gray-400)]">
                        {item.people}명
                      </span>
                    </div>

                    <div className="absolute right-0 top-0 flex gap-2">
                      {item.status === "pending" && (
                        <>
                          {/* 예약 변경 */}
                          <Button className="w-[75.45px] h-[33px] rounded-[8px] border border-[#EDEEF2] bg-white flex items-center justify-center">
                            <ButtonLabel className="text-[14px] tracking-[-0.35px] text-[var(--color-gray-600)]">
                              예약 변경
                            </ButtonLabel>
                          </Button>

                          {/* 예약 취소 */}
                          <Button
                            onClick={() => handleCancelClick(item)}
                            className="w-[75.45px] h-[33px] rounded-[8px] bg-[var(--color-gray-50)] flex items-center justify-center"
                          >
                            <ButtonLabel className="text-[14px] tracking-[-0.35px] text-[var(--color-gray-600)]">
                              예약 취소
                            </ButtonLabel>
                          </Button>
                        </>
                      )}

                      {item.status === "completed" && (
                        <Button
                          onClick={() => handleReviewClick(item)}
                          className="w-[75.45px] h-[33px] rounded-[8px] bg-[var(--color-primary-500)] flex items-center justify-center"
                        >
                          <ButtonLabel className="text-[14px] text-white">
                            후기 작성
                          </ButtonLabel>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 취소 확인 모달 */}
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={handleCloseCancelModal}
        onConfirm={handleConfirmCancel}
        reservationTitle={selectedReservation?.title || ""}
      />

      {/* 후기 작성 모달 */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        onSubmit={handleSubmitReview}
        reservation={selectedReservation}
      />
    </div>
  );
}
