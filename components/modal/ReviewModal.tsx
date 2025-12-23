'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ReviewModalProps } from '@/lib/utils/Modal.types';

/**
 * ReviewModal 컴포넌트
 * 
 * 별점과 리뷰 내용을 입력할 수 있는 모달
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
          width: '510px',
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '28px 24px 24px 24px',
          zIndex: 10000,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* X 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '24px',
            height: '24px',
            border: 'none',
            background: 'none',
            fontSize: '24px',
            color: '#707177',
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* 제목 */}
        <h3 className="text-18-b" style={{ color: '#323236', marginBottom: '8px' }}>{title}</h3>
        {subtitle && (
          <p className="text-14-m" style={{ color: '#84858c', marginBottom: '20px' }}>
            {subtitle}
          </p>
        )}

        {/* 별점 */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              style={{
                width: '48px',
                height: '48px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: '40px',
                lineHeight: 1,
                color: star <= (hoverRating || rating) ? '#FFC700' : '#e0e0e5',
                transition: 'color 0.2s',
              }}
            >
              ★
            </button>
          ))}
        </div>

        {/* 텍스트 */}
        <p className="text-16-m" style={{ color: '#323236', marginBottom: '12px' }}>
          소중한 경험을 들려주세요
        </p>

        {/* Textarea */}
        <textarea
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              setContent(e.target.value);
            }
          }}
          placeholder={placeholder}
          style={{
            width: '100%',
            height: '160px',
            padding: '16px',
            border: '1px solid #c6c8cf',
            borderRadius: '8px',
            resize: 'none',
            fontSize: '14px',
            fontWeight: '500',
            color: '#323236',
            marginBottom: '8px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3d9ef2';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#c6c8cf';
          }}
        />
        
        {/* 글자 수 */}
        <div className="text-12-m" style={{ color: '#84858c', textAlign: 'right', marginBottom: '20px' }}>
          {content.length}/{maxLength}
        </div>

        {/* 작성하기 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          style={{
            width: '100%',
            height: '48px',
            backgroundColor: rating === 0 ? '#e0e0e5' : '#3d9ef2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: rating === 0 ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            if (rating !== 0) {
              e.currentTarget.style.backgroundColor = '#2b8ed9';
            }
          }}
          onMouseLeave={(e) => {
            if (rating !== 0) {
              e.currentTarget.style.backgroundColor = '#3d9ef2';
            }
          }}
        >
          {buttonText}
        </button>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}