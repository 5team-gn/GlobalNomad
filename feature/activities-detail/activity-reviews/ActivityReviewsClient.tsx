/**
 *
 *
 * @description 액티비티 상세 - 리뷰 (클라이언트 컴포넌트)
 */
"use client";

import { useEffect, useMemo, useState } from "react";
import { ReviewSummary } from "./ReviewSummary";
import { ReviewList } from "./ReviewList";
import ReviewsPagination from "./ReviewsPagination";
import { Review, ReviewResponse } from "@/types/reviews/review.types";

type Props = {
  activityId: number;
  className?: string;
  initialData: {
    averageRating: number;
    totalCount: number;
    reviews: Review[];
  };
  initialPage?: number;
  pageSize?: number;
};

export default function ActivityReviewsClient({
  activityId,
  className,
  initialData,
  initialPage = 1,
  pageSize: pageSizeProp = 3,
}: Props) {
  const [page, setPage] = useState<number>(initialPage ?? 1);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  // 페이지 크기
  const pageSize = pageSizeProp;

  // 총 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(initialData.totalCount / pageSize));
  }, [initialData.totalCount, pageSize]);

  // 현재 페이지에 해당하는 리뷰 목록
  // const reviews = initialData.reviews;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchReviews() {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/activities/${activityId}/reviews?page=${page}&size=${pageSize}`,
          { cache: "no-store", signal: controller.signal }
        );

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          console.error("reviews fetch failed", res.status, text);
          throw new Error(`Failed to fetch reviews: ${res.status}`);
        }

        const json: ReviewResponse = await res.json();
        setData(json);
      } catch (e: any) {
        // Abort는 정상 취소로 보고 조용히 무시
        if (e?.name === "AbortError") return;
        throw e;
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
    return () => controller.abort();
  }, [activityId, page, pageSize]);

  return (
    <section className={className ?? ""}>
      <h2 className="text-16-b text-gray-950 mb-2 lg:text-18-b ">
        체험 후기{" "}
        <span className="text-gray-500 text-14-sb lg:text-16-b ">
          {initialData.totalCount.toLocaleString()}개
        </span>
      </h2>

      <ReviewSummary
        averageRating={initialData.averageRating}
        totalCount={initialData.totalCount}
      />

      {loading ? (
        <div className="mt-4">불러오는 중…</div>
      ) : (
        <ReviewList reviews={data.reviews} />
      )}

      <div className="mt-8">
        <ReviewsPagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </div>
    </section>
  );
}
