/**
 *
 *
 * @description 액티비티 상세 - 별점
 */
import Image from "next/image";

type StarRatingProps = {
  rating: number; // 0~5
  size?: number;
};

export function StarRating({ rating, size = 14 }: StarRatingProps) {
  // 반올림한 별점 값, 0~5 범위로 제한
  const filledStarCount = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`별점 ${filledStarCount}점`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Image
          key={i}
          src={
            i < filledStarCount ? "/icons/star.svg" : "/icons/star_empty.svg"
          }
          alt={i < filledStarCount ? "별점" : "빈 별"}
          width={size}
          height={size}
          priority={false}
        />
      ))}
    </div>
  );
}
