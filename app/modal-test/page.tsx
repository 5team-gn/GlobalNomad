'use client';

import { useState } from 'react';
import {
  BasicModal,
  SmallModal,
  AlertModal,
  SmallWarningModal,
  ReviewModal,
  NotificationModal,
} from '@/components/modal';
import type { NotificationItem } from '@/lib/utils/Modal.types';

export default function ModalTestPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [smallOpen, setSmallOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // 더미 알림 데이터
  const dummyNotifications: NotificationItem[] = [
    {
      id: 1,
      title: '예약 승인',
      activityTitle: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023-01-14',
      time: '15:00~18:00',
      status: '승인',
      isRead: false,
    },
    {
      id: 2,
      title: '예약 거절',
      activityTitle: '함께하면 즐거운 스트릿 댄스',
      date: '2023-01-14',
      time: '15:00~18:00',
      status: '거절',
      isRead: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-32-b mb-4 text-gray-900">Modal 컴포넌트 테스트</h1>
        <p className="text-16-r text-gray-600 mb-8">
          각 버튼을 클릭해서 모달을 테스트해보세요
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* BasicModal */}
          <button
            onClick={() => setBasicOpen(true)}
            className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-lg transition-all"
          >
            <div className="text-20-b mb-2 text-gray-900">BasicModal</div>
            <div className="text-14-r text-gray-500 mb-3">400×170px</div>
            <div className="text-12-r text-gray-400">기본 텍스트 + 확인 버튼</div>
          </button>

          {/* SmallModal */}
          <button
            onClick={() => setSmallOpen(true)}
            className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-lg transition-all"
          >
            <div className="text-20-b mb-2 text-gray-900">SmallModal</div>
            <div className="text-14-r text-gray-500 mb-3">320×140px</div>
            <div className="text-12-r text-gray-400">작은 기본 모달</div>
          </button>

          {/* AlertModal */}
          <button
            onClick={() => setAlertOpen(true)}
            className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-lg transition-all"
          >
            <div className="text-20-b mb-2 text-gray-900">AlertModal</div>
            <div className="text-14-r text-gray-500 mb-3">400×242px</div>
            <div className="text-12-r text-gray-400">경고 아이콘 + 2개 버튼</div>
          </button>

          {/* SmallWarningModal */}
          <button
            onClick={() => setWarningOpen(true)}
            className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-lg transition-all"
          >
            <div className="text-20-b mb-2 text-gray-900">SmallWarningModal</div>
            <div className="text-14-r text-gray-500 mb-3">320×185px</div>
            <div className="text-12-r text-gray-400">작은 경고 모달</div>
          </button>

          {/* ReviewModal */}
          <button
            onClick={() => setReviewOpen(true)}
            className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-lg transition-all"
          >
            <div className="text-20-b mb-2 text-gray-900">ReviewModal</div>
            <div className="text-14-r text-gray-500 mb-3">321×493px</div>
            <div className="text-12-r text-gray-400">별점 + 리뷰 작성</div>
          </button>

          {/* NotificationModal */}
          <button
            onClick={() => setNotificationOpen(true)}
            className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-lg transition-all"
          >
            <div className="text-20-b mb-2 text-gray-900">NotificationModal</div>
            <div className="text-14-r text-gray-500 mb-3">231×326px</div>
            <div className="text-12-r text-gray-400">알림 목록</div>
          </button>
        </div>

        {/* 모달들 */}
        <BasicModal
          isOpen={basicOpen}
          onClose={() => setBasicOpen(false)}
          text="기본 모달 테스트입니다"
          buttonText="확인"
          onConfirm={() => {
            console.log('BasicModal 확인 클릭');
            setBasicOpen(false);
          }}
        />

        <SmallModal
          isOpen={smallOpen}
          onClose={() => setSmallOpen(false)}
          text="작은 모달입니다"
          buttonText="확인"
          onConfirm={() => {
            console.log('SmallModal 확인 클릭');
            setSmallOpen(false);
          }}
        />

        <AlertModal
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          text="정말 삭제하시겠습니까?"
          cancelText="아니오"
          confirmText="확인하기"
          onCancel={() => {
            console.log('AlertModal 취소 클릭');
            setAlertOpen(false);
          }}
          onConfirm={() => {
            console.log('AlertModal 확인 클릭');
            setAlertOpen(false);
          }}
        />

        <SmallWarningModal
          isOpen={warningOpen}
          onClose={() => setWarningOpen(false)}
          text="변경사항이 저장되지 않습니다"
          cancelText="취소"
          confirmText="확인"
          onCancel={() => {
            console.log('SmallWarningModal 취소 클릭');
            setWarningOpen(false);
          }}
          onConfirm={() => {
            console.log('SmallWarningModal 확인 클릭');
            setWarningOpen(false);
          }}
        />

        <ReviewModal
          isOpen={reviewOpen}
          onClose={() => setReviewOpen(false)}
          title="함께 배우면 즐거운 스트릿 댄스"
          subtitle="2023. 02. 14 / 11:00 - 12:30 (10명)"
          placeholder="체험이 어떠셨나요? 경험을 자유롭게 남겨주세요"
          buttonText="작성하기"
          maxLength={100}
          onSubmit={(rating: number, content: string) => {
            console.log('ReviewModal 제출:', { rating, content });
            setReviewOpen(false);
          }}
        />

        <NotificationModal
          isOpen={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          notifications={dummyNotifications}
          onNotificationClick={(id: number) => {
            console.log('알림 클릭:', id);
          }}
        />
      </div>
    </div>
  );
}