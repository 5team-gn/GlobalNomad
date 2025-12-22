'use client';

import { useEffect, useState } from 'react';
import type { ReviewModalProps } from '@/lib/utils/Modal.types';

/**
 * ReviewModal 컴포넌트
 * 
 * 별점과 리뷰 내용을 입력할 수 있는 모달
 * @size 321px × 493px
 */
export default function ReviewModal({
  isOpen,
  onClose,
  title,
  subtitle,
  placeholder = '체험이 어떠셨나요? 경험을 자유롭게 남겨주세요',
  buttonText = '작성하기',
  maxLength = 100,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');

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

  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setHoverRating(0);
      setContent('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating === 0) {
      alert('별점을 선택해주세요');
      return;
    }
    onSubmit?.(rating, content);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-[321px] h-[493px] bg-white rounded-xl p-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="self-end w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 text-24-r"
        >
          ×
        </button>

        <h3 className="text-18-b text-gray-900 mb-2">{title}</h3>
        {subtitle && <p className="text-14-r text-gray-500 mb-4">{subtitle}</p>}

        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="w-10 h-10 flex items-center justify-center"
            >
              <span
                className={`text-32-r ${
                  star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            </button>
          ))}
        </div>

        <div className="flex-1 mb-4">
          <p className="text-16-m text-gray-900 mb-2">소중한 경험을 들려주세요</p>
          <textarea
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setContent(e.target.value);
              }
            }}
            placeholder={placeholder}
            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none text-14-r focus:outline-none focus:border-primary-500"
          />
          <div className="text-12-r text-gray-500 text-right mt-1">
            {content.length}/{maxLength}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full h-12 bg-primary-500 text-white text-16-m rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={rating === 0}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}