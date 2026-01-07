/**
 * @description 액티비티 상세 - 리뷰 (서버 컴포넌트)
 */

import { QueryClient, dehydrate } from "@tanstack/react-query";
import ActivityReviewsRQWrap from "./ActivityReviewsRQWrap";
import { getActivityReviews } from "@/feature/activities-detail/api/getActivityReviews"; // 경로 정리 추천

type ActivityReviewsProps = {
  activityId: number;
  className?: string;
};

const INITIAL_PAGE = 1;
const PAGE_SIZE = 1; //테스트 이후 3으로 수정 필요

export default async function ActivityReviews({
  activityId,
  className,
}: ActivityReviewsProps) {
  const qc = new QueryClient();

  // 서버에서 미리 쿼리 데이터를 가져와서 캐시에 저장
  await qc.prefetchQuery({
    queryKey: ["activityReviews", activityId, INITIAL_PAGE, PAGE_SIZE],
    queryFn: () => getActivityReviews(activityId, INITIAL_PAGE, PAGE_SIZE),
  });

  return (
    <ActivityReviewsRQWrap
      activityId={activityId}
      className={className}
      dehydratedState={dehydrate(qc)}
      initialPage={INITIAL_PAGE}
      pageSize={PAGE_SIZE}
    />
  );
}
