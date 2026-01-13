"use client";

import { useCallback, useState } from "react";
import { authAxios } from "@/lib/api/axios";

export type NotificationItem = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type MyNotificationsResponse = {
  cursorId: number | null;
  notifications: NotificationItem[];
  totalCount: number;
};

export function useNotifications(pageSize: number) {
  // 네트워크 상태
  const [loading, setLoading] = useState(false);

  // 서버가 내려주는 전체 알림 개수(표시용)
  const [totalCount, setTotalCount] = useState(0);

  // 화면에 렌더링할 알림 목록
  const [items, setItems] = useState<NotificationItem[]>([]);

  // 다음 페이지 조회를 위한 커서(null이면 더 이상 없음)
  const [cursorId, setCursorId] = useState<number | null>(null);

  // 알림이 없으면 벨 클릭 비활성화
  const hasNotifications = totalCount > 0 || items.length > 0;

  /**
   * 알림 조회
   * - replace: 첫 페이지 갱신(기존 목록 교체)
   * - append: 다음 페이지 로드(기존 목록 뒤에 붙임)
   */
  const fetchNotifications = useCallback(
    async (
      nextCursor?: number | null,
      mode: "replace" | "append" = "replace"
    ) => {
      if (loading) return;
      setLoading(true);

      try {
        const params: Record<string, any> = { size: pageSize };
        if (typeof nextCursor === "number") params.cursorId = nextCursor;

        // baseURL에 teamId 포함되어 있으므로 경로에는 teamId를 붙이지 않음
        const res = await authAxios.get<MyNotificationsResponse>(
          "/my-notifications",
          {
            params,
          }
        );

        // 상태 갱신
        setTotalCount(res.data.totalCount);
        setCursorId(res.data.cursorId);

        // 페이지 붙이기(append) vs 교체(replace)
        if (mode === "append" && typeof nextCursor === "number") {
          setItems((prev) => [...prev, ...res.data.notifications]);
        } else {
          setItems(res.data.notifications);
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, pageSize]
  );

  /**
   * 드롭다운을 열 때 사용
   * - 기존 데이터 초기화 후 첫 페이지를 다시 가져와 최신 상태로 맞춤
   */
  const resetAndRefetch = useCallback(async () => {
    setItems([]);
    setCursorId(null);
    await fetchNotifications(null, "replace");
  }, [fetchNotifications]);

  /**
   * 알림 삭제
   * - UX를 위해 낙관적 업데이트(먼저 화면에서 제거)
   * - 실패 시 롤백 후 재조회로 정합성 확보
   */
  const deleteNotification = useCallback(
    async (notificationId: number) => {
      const prev = items;

      // 낙관적 업데이트
      setItems((cur) => cur.filter((n) => n.id !== notificationId));
      setTotalCount((c) => Math.max(0, c - 1));

      // 실제 삭제 요청
      try {
        await authAxios.delete(`/my-notifications/${notificationId}`);
      } catch {
        setItems(prev);
        await fetchNotifications(null, "replace");
      }
    },
    [items, fetchNotifications]
  );

  return {
    loading,
    totalCount,
    items,
    cursorId,
    hasNotifications,
    fetchNotifications,
    resetAndRefetch,
    deleteNotification,
  };
}
