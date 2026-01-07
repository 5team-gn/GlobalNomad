/**
 *
 *
 * @description 액티비티 상세 - 리뷰 (클라이언트 컴포넌트)
 */
"use client";

import {
  DehydratedState,
  HydrationBoundary,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { getActivityReviews } from "@/feature/activities-detail/api/getActivityReviews";
import { ReviewSummary } from "./ReviewSummary";
import { ReviewList } from "./ReviewList";
import ReviewsPagination from "./ReviewsPagination";
import { SkeletonReviews } from "./SkeletonReviews";

type Props = {
  activityId: number;
  className?: string;
  initialPage: number;
  pageSize: number;
  dehydratedState: DehydratedState;
};

function ReviewsInner({
  activityId,
  className,
  initialPage,
  pageSize,
}: Omit<Props, "dehydratedState">) {
  const [page, setPage] = useState(initialPage);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["activityReviews", activityId, page, pageSize],
    queryFn: () => getActivityReviews(activityId, page, pageSize),
    staleTime: 30000,
  });

  if (isLoading) return <SkeletonReviews />;
  if (isError || !data) return <div className={className}>에러</div>;

  return (
    <section className={className ?? ""}>
      <h2 className="text-16-b text-gray-950 mb-2 lg:text-18-b">
        체험 후기{" "}
        <span className="text-gray-500 text-14-sb lg:text-16-b">
          {data.totalCount.toLocaleString()}개
        </span>
      </h2>

      <ReviewSummary
        averageRating={data.averageRating}
        totalCount={data.totalCount}
      />
      <ReviewList reviews={data.reviews} />

      <div className="mt-8">
        <ReviewsPagination
          page={page}
          totalPages={Math.max(1, Math.ceil(data.totalCount / pageSize))}
          onChange={setPage}
        />
      </div>
    </section>
  );
}

export default function ActivityReviewsClient(props: Props) {
  const { dehydratedState, ...rest } = props;

  return (
    <HydrationBoundary state={dehydratedState}>
      <ReviewsInner {...rest} />
    </HydrationBoundary>
  );
}
