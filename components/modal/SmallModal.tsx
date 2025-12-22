'use client';

import { useEffect } from 'react';
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-[320px] h-[140px] bg-white rounded-xl p-5 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 flex items-center justify-center">
          <p className="text-14-m text-gray-900 text-center">{text}</p>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full h-11 bg-primary-500 text-white text-14-m rounded-lg hover:bg-primary-600 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}