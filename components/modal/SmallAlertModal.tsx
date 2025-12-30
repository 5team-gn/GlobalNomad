'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import type { SmallAlertModalProps } from '@/lib/utils/Modal.types';

/**
 * SmallAlertModal 컴포넌트
 * 
 * 경고 모달의 작은 버전
 * @size 320px × 185px
 */
export default function SmallAlertModal({
  isOpen,
  onClose,
  text,
  cancelText = '아니오',
  confirmText = '취소하기',
  onCancel,
  onConfirm,
}: SmallAlertModalProps) {
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

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

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
          <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
            <Image src="/modalimage.png" alt="경고" width={40} height={40} />
          </div>
          <p className="text-14-m" style={{ color: '#323236' }}>{text}</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button
            onClick={handleCancel}
            style={{
              width: '113px',
              height: '41px',
              backgroundColor: 'white',
              color: '#707177',
              border: '1px solid #c6c8cf',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f8f8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            style={{
              width: '113px',
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
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}