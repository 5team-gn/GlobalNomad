type StarRatingProps = {
  rating: number; // 0~5
};

export function StarRating({ rating }: StarRatingProps) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="flex items-center gap-1" aria-label={`별점 ${r}점`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-14-m">
          {i < r ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}
