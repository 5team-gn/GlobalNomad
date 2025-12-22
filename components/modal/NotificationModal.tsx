'use client';

import { useEffect } from 'react';
import type { NotificationModalProps } from '@/lib/utils/Modal.types';

/**
 * NotificationModal 컴포넌트
 * 
 * 알림 목록을 표시하는 모달
 * @size 231px × 326px
 * 
 * @note API 연동 방법:
 * 1. 알림 데이터를 API에서 가져오기
 * 2. notifications prop에 데이터 전달
 * 3. onNotificationClick에서 읽음 처리 등 추가 로직 구현
 * 
 * @example
 * ```tsx
 * const { data: notifications } = useQuery({
 *   queryKey: ['notifications'],
 *   queryFn: fetchNotifications,
 * });
 * 
 * <NotificationModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   notifications={notifications || []}
 *   onNotificationClick={handleNotificationClick}
 * />
 * ```
 */
export default function NotificationModal({
  isOpen,
  onClose,
  notifications,
  onNotificationClick,
}: NotificationModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-[231px] h-[326px] bg-white rounded-xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-16-b text-gray-900">알림</span>
            {notifications.length > 0 && (
              <span className="text-12-r text-gray-500">{notifications.length}개</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 text-20-r"
          >
            ×
          </button>
        </div>

        {/* 알림 목록 */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-14-r text-gray-500">알림이 없습니다</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => onNotificationClick?.(notification.id)}
                className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-14-b text-gray-900">{notification.title}</h4>
                  <span className="text-10-r text-gray-500">
                    {notification.date.split('-')[1]}월 {notification.date.split('-')[2]}일
                  </span>
                </div>

                <p className="text-12-r text-gray-700 mb-1">{notification.activityTitle}</p>

                <p className="text-10-r text-gray-500 mb-1">
                  ({notification.date} {notification.time})
                </p>

                <p className="text-10-r">
                  예약이{' '}
                  <span
                    className={notification.status === '승인' ? 'text-primary-500' : 'text-red-500'}
                  >
                    {notification.status}
                  </span>
                  되었어요.
                </p>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}