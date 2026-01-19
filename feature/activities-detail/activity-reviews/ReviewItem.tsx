/**
 *
 *
 * @description 액티비티 상세 - 리뷰 아이템
 */

import { Review } from "@/types/reviews/review.types";
import { StarRating } from "./StarRating";
import { formatKoreanDate } from "@/utils/detail-utils";

type ReviewItemProps = {
  review: Review;
};

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <li className="bg-white rounded-2xl p-5 shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]">
      <div className="flex items-center mb-2">
        <p className="text-16-b text-gray-950 mr-2">{review.user.nickname}</p>
        <p className="text-14-m text-gray-a4a1aa">
          {formatKoreanDate(review.createdAt)}
        </p>
      </div>

      <div className="mb-3">
        <StarRating rating={review.rating} />
      </div>

      <div className="max-h-[6.5em] overflow-y-auto pr-1">
        <p className="text-16-body-m text-gray-950 leading-relaxed whitespace-pre-line">
          {review.content}
        </p>
      </div>
    </li>
  );
}
