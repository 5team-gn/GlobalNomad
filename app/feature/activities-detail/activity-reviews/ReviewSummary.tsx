import { getSatisfactionLabel } from "@/lib/utils";

type ReviewSummaryProps = {
  averageRating: number;
  totalCount: number;
};

export function ReviewSummary({
  averageRating,
  totalCount,
}: ReviewSummaryProps) {
  const label = getSatisfactionLabel(averageRating);

  return (
    <div className="flex flex-col items-center py-10 border-b border-gray-100">
      <p className="text-32-b text-gray-950">{averageRating.toFixed(1)}</p>
      <p className="text-14-m text-gray-700 mt-1">{label}</p>

      <div className="flex items-center gap-1 mt-2 text-14-m text-gray-600">
        <span>⭐</span>
        <span>{totalCount.toLocaleString()}개 후기</span>
      </div>
    </div>
  );
}
