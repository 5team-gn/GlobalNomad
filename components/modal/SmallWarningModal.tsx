'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import type { SmallWarningModalProps } from '@/lib/utils/Modal.types';

/**
 * SmallWarningModal 컴포넌트
 * 
 * 경고 모달의 작은 버전
 * @size 320px × 185px
 */
export default function SmallWarningModal({
  isOpen,
  onClose,
  text,
  cancelText = '아니오',
  confirmText = '확인하기',
  onCancel,
  onConfirm,
}: SmallWarningModalProps) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-[320px] h-[185px] bg-white rounded-xl p-5 flex flex-col items-center justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          {/* 경고 아이콘 - public/modalnotstar.png 사용 */}
          <Image src="/modalnotstar.png" alt="경고" width={40} height={40} />
          <p className="text-14-m text-gray-900 text-center">{text}</p>
        </div>

        <div className="w-full flex gap-2">
          <button
            onClick={handleCancel}
            className="flex-1 h-11 bg-white border border-gray-300 text-gray-700 text-14-m rounded-lg hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 h-11 bg-primary-500 text-white text-14-m rounded-lg hover:bg-primary-600 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}