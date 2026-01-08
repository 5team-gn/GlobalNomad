/**
 *
 *
 * @description 액티비티 리뷰 로딩 스켈레톤 컴포넌트
 */

"use client";

function SkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div
      className={["animate-pulse rounded-xl bg-gray-100", className].join(" ")}
    />
  );
}
function SkeletonLine({ w = "w-full", h = "h-4" }: { w?: string; h?: string }) {
  return <SkeletonBox className={`${h} ${w} rounded-md`} />;
}

export function SkeletonReviews() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <SkeletonLine h="h-5" w="w-28" />
        <SkeletonBox className="h-9 w-24 rounded-xl" />
      </div>

      <div className="mt-6 space-y-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3">
              <SkeletonBox className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <SkeletonLine w="w-40" />
                <SkeletonLine w="w-24" h="h-3" />
              </div>
              <SkeletonBox className="h-4 w-16 rounded-md" />
            </div>
            <div className="mt-4 space-y-2">
              <SkeletonLine />
              <SkeletonLine />
              <SkeletonLine w="w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
