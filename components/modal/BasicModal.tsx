'use client';

import { useEffect } from 'react';
import type { BasicModalProps } from '@/lib/utils/Modal.types';

/**
 * BasicModal 컴포넌트
 * 
 * 기본 텍스트와 확인 버튼이 있는 간단한 모달
 * @size 400px × 170px
 */
export default function BasicModal({
  isOpen,
  onClose,
  text,
  buttonText = '확인',
  onConfirm,
}: BasicModalProps) {
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
        className="w-[400px] h-[170px] bg-white rounded-xl p-6 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 flex items-center justify-center">
          <p className="text-16-m text-gray-900 text-center">{text}</p>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full h-12 bg-primary-500 text-white text-16-m rounded-lg hover:bg-primary-600 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}