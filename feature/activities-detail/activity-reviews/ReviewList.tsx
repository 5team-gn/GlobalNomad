/**
 *
 *
 * @description 액티비티 상세 - 리뷰 리스트
 */

import { Review } from "@/types/reviews/review.types";
import { ReviewItem } from "./ReviewItem";

type ReviewListProps = {
  reviews: Review[];
};

export function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews?.length) {
    return (
      <div className="py-10 text-center text-14-m text-gray-500">
        아직 작성된 후기가 없습니다.
      </div>
    );
  }

  return (
    <ul className="space-y-10 lg:space-y-5 mt-6">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}
