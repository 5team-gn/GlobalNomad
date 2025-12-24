import { ReviewSummary } from "./ReviewSummary";
import { ReviewList } from "./ReviewList";
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
    <section className={className ?? ""}>
      <h2 className="text-18-b text-gray-950 mb-6">
        체험 후기{" "}
        <span className="text-gray-500 text-16-m">
          {data.totalCount.toLocaleString()}개
        </span>
      </h2>

      <ReviewSummary
        averageRating={data.averageRating}
        totalCount={data.totalCount}
      />
      <ReviewList reviews={data.reviews} />
    </section>
  );
}
