// app/activities/[id]/loading.tsx
export default function Loading() {
  return (
    <main className="max-w-[1200px] mx-auto font-pretendard mt-[34px] lg:mt-22 mb-45 text-gray-950">
      <div className="detail_wrap px-6 md:px-[30px] lg:px-[3.3333vw]">
        {/* 모바일/태블릿 */}
        <div className="lg:hidden">
          <SkeletonGalleryMobile />
          <div className="mt-6">
            <SkeletonHeaderInfo />
          </div>
          <div className="mt-6">
            <SkeletonCalendarMobile />
          </div>

          {/* 체험 설명 */}
          <div className="pb-10 mt-10 border-b border-gray-100 border-t">
            <div className="pt-[40px]">
              <SkeletonLine w="w-24" h="h-5" />
              <div className="mt-4 space-y-2">
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonLine w="w-2/3" />
              </div>
            </div>
          </div>

          {/* 지도 */}
          <div className="mt-10">
            <SkeletonMap />
          </div>

          {/* 리뷰 */}
          <div className="pb-[96px] mt-10 border-t border-gray-100 pt-5 md:pt-[30px]">
            <SkeletonReviews />
          </div>

          {/* 하단 fixed UI 가림 방지 */}
          <div className="h-[96px]" />
        </div>

        {/* 데스크탑 */}
        <div className="hidden lg:flex lg:gap-x-10 lg:items-start">
          {/* 왼쪽 */}
          <div className="flex-1 min-w-0">
            <SkeletonGalleryDesktop />

            <div className="pb-10 mt-10 border-b border-gray-100 border-t lg:border-t-0">
              <div className="pt-[40px]">
                <SkeletonLine w="w-24" h="h-5" />
                <div className="mt-4 space-y-2">
                  <SkeletonLine />
                  <SkeletonLine />
                  <SkeletonLine />
                  <SkeletonLine w="w-1/2" />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <SkeletonMap />
            </div>

            <div className="mt-10 border-t border-gray-100 pt-10">
              <SkeletonReviews />
            </div>
          </div>

          {/* 오른쪽 */}
          <aside className="w-[410px] self-start">
            <SkeletonHeaderInfo />
            <div className="mt-6 sticky top-10">
              <SkeletonCalendarDesktop />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/** ====== 공용 Skeleton Primitives ====== */

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

/** ====== 섹션별 Skeleton ====== */

function SkeletonGalleryMobile() {
  // 모바일 상단 갤러리(큰 이미지 + 썸네일 느낌)
  return (
    <div>
      <SkeletonBox className="h-[240px] w-full rounded-2xl" />
      <div className="mt-3 flex gap-2">
        <SkeletonBox className="h-16 w-16 rounded-xl" />
        <SkeletonBox className="h-16 w-16 rounded-xl" />
        <SkeletonBox className="h-16 w-16 rounded-xl" />
        <SkeletonBox className="h-16 w-16 rounded-xl" />
      </div>
    </div>
  );
}

function SkeletonGalleryDesktop() {
  // 데스크탑 갤러리(큰 메인 + 우측/하단 서브를 떠올리는 형태)
  return (
    <div className="grid grid-cols-3 gap-3">
      <SkeletonBox className="col-span-2 h-[360px] rounded-2xl" />
      <div className="flex flex-col gap-3">
        <SkeletonBox className="h-[174px] rounded-2xl" />
        <SkeletonBox className="h-[174px] rounded-2xl" />
      </div>
    </div>
  );
}

function SkeletonHeaderInfo() {
  // 제목/태그/별점/가격 등 묶음
  return (
    <div className="space-y-3">
      <SkeletonLine h="h-6" w="w-2/3" />
      <div className="flex gap-2">
        <SkeletonBox className="h-6 w-16 rounded-full" />
        <SkeletonBox className="h-6 w-20 rounded-full" />
        <SkeletonBox className="h-6 w-14 rounded-full" />
      </div>
      <div className="flex items-center gap-3">
        <SkeletonBox className="h-4 w-20 rounded-md" />
        <SkeletonBox className="h-4 w-16 rounded-md" />
      </div>
      <SkeletonLine h="h-5" w="w-40" />
      <SkeletonLine h="h-4" w="w-1/2" />
    </div>
  );
}

function SkeletonCalendarMobile() {
  // 모바일 예약/달력 카드 느낌
  return (
    <div className="rounded-2xl border border-gray-100 p-4">
      <SkeletonLine h="h-5" w="w-32" />
      <div className="mt-4 grid grid-cols-7 gap-2">
        {Array.from({ length: 14 }).map((_, i) => (
          <SkeletonBox key={i} className="h-9 rounded-lg" />
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <SkeletonBox className="h-12 flex-1 rounded-xl" />
        <SkeletonBox className="h-12 flex-1 rounded-xl" />
      </div>
    </div>
  );
}

function SkeletonCalendarDesktop() {
  // 데스크탑 우측 sticky 예약 카드 크게
  return (
    <div className="rounded-2xl border border-gray-100 p-5">
      <SkeletonLine h="h-5" w="w-40" />
      <div className="mt-4 grid grid-cols-7 gap-2">
        {Array.from({ length: 21 }).map((_, i) => (
          <SkeletonBox key={i} className="h-10 rounded-lg" />
        ))}
      </div>
      <div className="mt-5 space-y-3">
        <SkeletonBox className="h-11 w-full rounded-xl" />
        <SkeletonBox className="h-11 w-full rounded-xl" />
        <SkeletonBox className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}

function SkeletonMap() {
  return (
    <div>
      <SkeletonLine h="h-5" w="w-24" />
      <SkeletonBox className="mt-4 h-[260px] w-full rounded-2xl" />
      <div className="mt-3 space-y-2">
        <SkeletonLine w="w-3/4" />
        <SkeletonLine w="w-1/2" />
      </div>
    </div>
  );
}

function SkeletonReviews() {
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
