/**
 *
 *
 * @description 액티비티 상세 - 리뷰 React Query 래퍼 (클라이언트 컴포넌트)
 */
"use client";

import ReactQueryProvider from "@/components/ReactQueryProvider";
import ActivityReviewsClient from "./ActivityReviewsClient";
import { HydrationBoundary, type DehydratedState } from "@tanstack/react-query";

type Props = {
  activityId: number;
  className?: string;
  dehydratedState: DehydratedState;
  initialPage: number;
  pageSize: number;
};

export default function ActivityReviewsRQWrap({
  activityId,
  className,
  dehydratedState,
  initialPage,
  pageSize,
}: Props) {
  return (
    <ReactQueryProvider>
      {/* 서버에서 가져온 쿼리 캐시를 클라이언트에 복원 */}
      <HydrationBoundary state={dehydratedState}>
        <ActivityReviewsClient
          activityId={activityId}
          className={className}
          initialPage={initialPage}
          pageSize={pageSize}
        />
      </HydrationBoundary>
    </ReactQueryProvider>
  );
}
