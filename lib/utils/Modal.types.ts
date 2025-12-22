import { ReactNode } from 'react';

/**
 * 모달 베이스 Props
 */
export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 기본 모달 Props (400×170)
 */
export interface BasicModalProps extends BaseModalProps {
  text: string;
  buttonText?: string;
  onConfirm?: () => void;
}

/**
 * 작은 모달 Props (320×140)
 */
export interface SmallModalProps extends BaseModalProps {
  text: string;
  buttonText?: string;
  onConfirm?: () => void;
}

/**
 * 경고 모달 Props (400×242)
 */
export interface AlertModalProps extends BaseModalProps {
  text: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

/**
 * 작은 경고 모달 Props (320×185)
 */
export interface SmallWarningModalProps extends BaseModalProps {
  text: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

/**
 * 리뷰 모달 Props (321×493)
 */
export interface ReviewModalProps extends BaseModalProps {
  title: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  maxLength?: number;
  onSubmit?: (rating: number, content: string) => void;
}

/**
 * 알림 아이템
 */
export interface NotificationItem {
  id: number;
  title: string;
  activityTitle: string;
  date: string;
  time: string;
  status: '승인' | '거절';
  isRead?: boolean;
}

/**
 * 알림 모달 Props (231×326)
 */
export interface NotificationModalProps extends BaseModalProps {
  notifications: NotificationItem[];
  onNotificationClick?: (id: number) => void;
}