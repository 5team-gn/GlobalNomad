'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import type { BasicModalProps } from '@/lib/utils/Modal.types';

/**
 * BasicModal 컴포넌트
 * 
 * 기본 텍스트와 확인 버튼이 있는 간단한 모달
 * @size Desktop: 400px × 170px, Mobile: 320px × 140px (반응형)
 */
export default function BasicModal({
  isOpen,
  onClose,
  text,
  buttonText = '확인',
  onConfirm,
}: BasicModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const modalContent = (
    <>
      {/* 오버레이 */}
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
      
      {/* 모달 */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '320px' : '400px',
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: isMobile ? '28px 20px 20px 20px' : '32px 24px 24px 24px',
          zIndex: 10000,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 텍스트 */}
        <div style={{ marginBottom: isMobile ? '28px' : '32px', textAlign: 'center' }}>
          <p className={isMobile ? 'text-14-m' : 'text-16-m'} style={{ color: '#323236' }}>
            {text}
          </p>
        </div>

        {/* 파란색 확인 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleConfirm}
            style={{
              width: isMobile ? '180px' : '200px',
              height: isMobile ? '41px' : '47px',
              backgroundColor: '#3d9ef2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2b8ed9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3d9ef2';
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}