/**
 *
 *
 * @description 액티비티 상세 - 리뷰 (서버 컴포넌트)
 */

import ActivityReviewsClient from "./ActivityReviewsClient";
import { getActivityReviews } from "../api/getActivityDetail";

type ActivityReviewsProps = {
  activityId: number;
  className?: string;
};

const INITIAL_PAGE = 1;
const PAGE_SIZE = 1; // 끝나면 3으로

export default async function ActivityReviews({
  activityId,
  className,
}: ActivityReviewsProps) {
  const data = await getActivityReviews(activityId, INITIAL_PAGE, PAGE_SIZE);

  return (
    <ActivityReviewsClient
      activityId={activityId}
      className={className}
      initialData={data}
      initialPage={INITIAL_PAGE}
      pageSize={PAGE_SIZE}
    />
  );
}
