import Image from "next/image";

type StarRatingProps = {
  rating: number; // 0~5
  size?: number; // 기본 14(px)
};

export function StarRating({ rating, size = 14 }: StarRatingProps) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="flex items-center gap-1" aria-label={`별점 ${r}점`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Image
          key={i}
          src={i < r ? "/icons/star.svg" : "/icons/star_empty.svg"}
          alt={i < r ? "별점" : "빈 별"}
          width={size}
          height={size}
          priority={false}
        />
      ))}
    </div>
  );
}
