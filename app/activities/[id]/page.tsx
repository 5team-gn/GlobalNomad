import ActivityReviews from "@/feature/activities-detail/activity-reviews/ActivityReviews";
import ActivityCalendarClient from "@/feature/activities-detail/ActivityCalendar.client";
import KakaoMapByAddress from "@/feature/activities-detail/KakaoMapByAddress";
import ActivityHeaderInfo from "@/feature/activities-detail/ActivityHeaderInfo";
import { mockActivityDetail } from "@/Mocks/detail/activityDetail.mock";
import ActivityHeaderGallery from "@/feature/activities-detail/ActivityHeaderGallery";
import { notFound } from "next/navigation";
import { getActivityDetail } from "@/feature/activities-detail/api/getActivityDetail";
import { ApiError } from "@/lib/api/apiFetch";

export default async function Page({ params }: { params: { id: string } }) {
  const mock = mockActivityDetail;

  // Next.js 경고 때문에 params를 await로 풀어쓴다면 이렇게.
  const { id } = await params;
  const activityId = Number(id);
  if (!Number.isFinite(activityId)) notFound();

  try {
    await getActivityDetail(activityId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <main className="max-w-[1200px] mx-auto font-pretendard mt-[34px] lg:mt-22 mb-45 text-gray-950">
      <div className="detail_wrap px-6 md:px-[30px] lg:px-[3.3333vw]">
        {/*  데스크탑: 그리드 레이아웃 */}
        <div className="grid gap-y-10 lg:grid-cols-[1fr_410px] lg:gap-x-10 lg:items-start">
          {/* 갤러리 */}
          <section className="lg:col-start-1 lg:row-start-1">
            <ActivityHeaderGallery mock={mock} />
          </section>

          {/* 헤더 + 달력*/}
          <aside className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start">
            <ActivityHeaderInfo mock={mock} />
            <div className="mt-6 lg:sticky lg:top-10">
              <ActivityCalendarClient />
            </div>
          </aside>

          {/* 체험 설명 */}
          <section className="lg:col-start-1 lg:row-start-2">
            <div className="pb-10 border-b border-gray-100 border-t lg:border-t-0">
              <p className="text-18-b text-gray-950 pt-[40px] mb-2">
                체험 설명
              </p>
              <p className="text-16-body-m text-gray-950">{mock.description}</p>
            </div>

            {/* 지도 */}
            <div className="mt-10">
              <KakaoMapByAddress
                address={mock.address}
                level={3}
                markerText={mock.title}
              />
            </div>

            {/* 리뷰 */}
            <div className="mt-10 border-t border-gray-100 pt-10">
              <ActivityReviews activityId={activityId} />
            </div>

            <div className="lg:hidden h-[96px]" />
          </section>
        </div>
      </div>
    </main>
  );
}
