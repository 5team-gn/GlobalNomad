import { Review } from "@/types/reviews/review.types";
import { StarRating } from "./StarRating";
import { formatKoreanDate } from "@/lib/utils";

type ReviewItemProps = {
  review: Review;
};

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <li className="bg-white rounded-2xl shadow-sm px-6 py-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-14-b text-gray-950">{review.user.nickname}</p>
        <p className="text-12-m text-gray-400">
          {formatKoreanDate(review.createdAt)}
        </p>
      </div>

      <div className="mb-3">
        <StarRating rating={review.rating} />
      </div>

      <p className="text-14-m text-gray-700 leading-relaxed whitespace-pre-line">
        {review.content}
      </p>
    </li>
  );
}
