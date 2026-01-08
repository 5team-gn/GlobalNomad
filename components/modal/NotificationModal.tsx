'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import type { NotificationModalProps } from '@/lib/utils/Modal.types';

/**
 * NotificationModal 컴포넌트
 * 
 * 알림 목록을 표시하는 모달
 * @size 231px × 326px
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

  const modalContent = (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        }}
        onClick={onClose}
      />
      
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '231px',
          height: '326px',
          backgroundColor: 'white',
          borderRadius: '16px',
          zIndex: 10000,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid #edeef2',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="text-14-b" style={{ color: '#323236' }}>알림</span>
            {notifications.length > 0 && (
              <span className="text-11-m" style={{ color: '#84858c' }}>
                {notifications.length}개
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              width: '20px',
              height: '20px',
              border: 'none',
              background: 'none',
              fontSize: '20px',
              color: '#707177',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* 목록 */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p className="text-12-m" style={{ color: '#84858c' }}>알림이 없습니다</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => onNotificationClick?.(notification.id)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  textAlign: 'left',
                  borderBottom: '1px solid #f8f8f8',
                  backgroundColor: !notification.isRead ? '#e5f3ff' : 'white',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (notification.isRead) {
                    e.currentTarget.style.backgroundColor = '#f8f8f8';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = !notification.isRead
                    ? '#e5f3ff'
                    : 'white';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                  }}
                >
                  <h4 className="text-12-b" style={{ color: '#323236' }}>
                    {notification.title}
                  </h4>
                  <span className="text-11-m" style={{ color: '#84858c' }}>
                    {notification.date.split('-')[1]}월 {notification.date.split('-')[2]}일
                  </span>
                </div>

                <p className="text-11-m" style={{ color: '#49494c', marginBottom: '2px' }}>
                  {notification.activityTitle}
                </p>

                <p className="text-11-m" style={{ color: '#84858c', marginBottom: '2px' }}>
                  ({notification.date} {notification.time})
                </p>

                <p className="text-11-m" style={{ color: '#49494c' }}>
                  예약이{' '}
                  <span
                    style={{
                      color: notification.status === '승인' ? '#3d9ef2' : '#ff2727',
                      fontWeight: '700',
                    }}
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
    </>
  );

  return createPortal(modalContent, document.body);
}