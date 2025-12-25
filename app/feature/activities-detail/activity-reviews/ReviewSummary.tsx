import { getSatisfactionLabel } from "@/utils/detail-utils";
import Image from "next/image";

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
    <div className="flex flex-col items-center pb-[30]">
      <p className="text-24-b lg:text-32-b leading-[32px] lg:leading-[48px] text-gray-950">
        {averageRating.toFixed(1)}
      </p>
      <p className="text-14-b leading-[24px] text-gray-950 mt-[2] lg:text-16-b">
        {label}
      </p>

      <div className="flex items-center gap-1 mt-[6] text-14-m">
        <Image
          src={"/icons/star.svg"}
          alt="별점"
          width={14}
          height={14}
          priority={false}
        />
        <span className="text-gray-79747E">
          {totalCount.toLocaleString()}개 후기
        </span>
      </div>
    </div>
  );
}
