'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { SmallModalProps } from '@/lib/utils/Modal.types';

/**
 * SmallModal 컴포넌트
 * 
 * 기본 모달의 작은 버전
 * @size 320px × 140px
 */
export default function SmallModal({
  isOpen,
  onClose,
  text,
  buttonText = '확인',
  onConfirm,
}: SmallModalProps) {
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
          width: '320px',
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '28px 20px 20px 20px',
          zIndex: 10000,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
          <p className="text-14-m" style={{ color: '#323236' }}>{text}</p>
        </div>

        {/* 중앙 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleConfirm}
            style={{
              width: '180px',
              height: '41px',
              backgroundColor: '#3d9ef2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
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