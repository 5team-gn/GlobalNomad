import ActivityReviews from "@/app/feature/activities-detail/activity-reviews/ActivityReviews";
import ActivityCalendarClient from "@/app/feature/activities-detail/ActivityCalendar.client";
import KakaoMapByAddress from "@/app/feature/activities-detail/KakaoMapByAddress";
import ActivityHeaderGallery from "@/app/feature/activities-detail/reservation/ActivityHeaderGallery";
import ActivityHeaderInfo from "@/app/feature/activities-detail/reservation/ActivityHeaderInfo";
import { mockActivityDetail } from "@/app/mocks/activityDetail.mock";

export default function Page() {
  const mock = mockActivityDetail;

  return (
    <main className="max-w-[1200px] mx-auto font-pretendard mt-22 mb-45 text-gray-950">
      <div className="detail_wrap px-[3.3333vw]">
        {/* ======================
           TB/MB (< lg): 세로 스택
           ====================== */}
        <div className="lg:hidden">
          <ActivityHeaderGallery mock={mock} />
          <div className="mt-6 ">
            <ActivityHeaderInfo mock={mock} />
          </div>
          <div className="mt-6 ">
            <ActivityCalendarClient />
          </div>

          {/* 체험 설명 */}
          <div className="pb-10 mt-10 border-b border-gray-100 border-t">
            <div className="detail_description">
              <p className="text-18-b text-gray-950 pt-[40] mb-2">체험 설명</p>
              <p className="text-16-body-m text-gray-950">{mock.description}</p>
            </div>
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
          <div className="pb-[96] mt-10 border-t border-gray-100 pt-5 md:pt-[30]">
            <ActivityReviews activityId={mock.id} />
          </div>

          {/* tb 이하 fixed 달력/바 가림 방지(기존 쓰던 값 유지) */}
          <div className="h-[96]" />
        </div>

        {/* ======================
           PC (lg+): 2컬럼 flex
           ====================== */}
        <div className="hidden lg:flex lg:gap-x-10 lg:items-start">
          {/* LEFT: 이미지 + 본문 */}
          <div className="flex-1 min-w-0">
            <ActivityHeaderGallery mock={mock} />

            {/* 체험 설명 */}
            <div className="pb-10 mt-10 border-b border-gray-100 border-t lg:border-t-0">
              <div className="detail_description">
                <p className="text-18-b text-gray-950 pt-[40] mb-2">
                  체험 설명
                </p>
                <p className="text-16-body-m text-gray-950">
                  {mock.description}
                </p>
              </div>
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
              <ActivityReviews activityId={mock.id} />
            </div>
          </div>

          {/* RIGHT: 상세헤더 + 달력 */}
          <aside className="w-[410px] self-start">
            <ActivityHeaderInfo mock={mock} />
            <div className="mt-6 sticky top-10">
              <ActivityCalendarClient />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
