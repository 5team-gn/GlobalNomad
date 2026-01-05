/**
 *
 *
 * @description 액티비티 상세 - 리뷰 (클라이언트 컴포넌트)
 */
"use client";

import { useState } from "react";
import { ReviewSummary } from "./ReviewSummary";
import { ReviewList } from "./ReviewList";
import ReviewsPagination from "./ReviewsPagination";
import { Review } from "@/types/reviews/review.types";

type InitialData = {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
  page?: number;
  pageSize?: number;
  totalPages?: number;
};

type Props = {
  activityId: number;
  className?: string;
  initialData: InitialData;
};

export default function ActivityReviewsClient({
  activityId,
  className,
  initialData,
}: Props) {
  const [page, setPage] = useState<number>(initialData.page ?? 1);

  const pageSize = initialData.pageSize ?? 5;

  const totalPages =
    initialData.totalPages ??
    Math.max(1, Math.ceil(initialData.totalCount / pageSize));

  const reviews = initialData.reviews;

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

      <ReviewList reviews={reviews} />

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
