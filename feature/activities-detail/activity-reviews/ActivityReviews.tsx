/**
 *
 *
 * @description 액티비티 상세 - 리뷰 (서버 컴포넌트)
 */

import ActivityReviewsClient from "./ActivityReviewsClient";
import { getActivityReviews } from "@/lib/reviews/reviews.api";

type ActivityReviewsProps = {
  activityId: number;
  className?: string;
};

export default async function ActivityReviews({
  activityId,
  className,
}: ActivityReviewsProps) {
  const data = await getActivityReviews(activityId);

  return (
    <ActivityReviewsClient
      activityId={activityId}
      className={className}
      initialData={{
        ...data,
        page: 1,
        pageSize: 5,
      }}
    />
  );
}
