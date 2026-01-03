import ActivityReviews from "@/feature/activities-detail/activity-reviews/ActivityReviews";
import ActivityCalendarClient from "@/feature/activities-detail/ActivityCalendar.client";
import KakaoMapByAddress from "@/feature/activities-detail/KakaoMapByAddress";
import ActivityHeaderInfo from "@/feature/activities-detail/ActivityHeaderInfo";
import { mockActivityDetail } from "@/Mocks/detail/activityDetail.mock";
import ActivityHeaderGallery from "@/feature/activities-detail/ActivityHeaderGallery";

export default function Page() {
  const mock = mockActivityDetail;

  return (
    <main className="max-w-[1200px] mx-auto font-pretendard mt-[34px] lg:mt-22 mb-45 text-gray-950">
      <div className="detail_wrap px-6 md:px-[30px] lg:px-[3.3333vw]">
        {/* 태블릿,모바일 */}
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
              <p className="text-18-b text-gray-950 pt-[40px] mb-2">
                체험 설명
              </p>
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
          <div className="pb-[96px] mt-10 border-t border-gray-100 pt-5 md:pt-[30px]">
            <ActivityReviews activityId={mock.id} />
          </div>

          {/* tb 이하 fixed 달력/바 가림 방지 */}
          <div className="h-[96px]" />
        </div>

        {/* 데스크탑 */}
        <div className="hidden lg:flex lg:gap-x-10 lg:items-start">
          {/*왼쪽 + 본문 */}
          <div className="flex-1 min-w-0">
            <ActivityHeaderGallery mock={mock} />

            {/* 체험 설명 */}
            <div className="pb-10 mt-10 border-b border-gray-100 border-t lg:border-t-0">
              <div className="detail_description">
                <p className="text-18-b text-gray-950 pt-[40px] mb-2">
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

          {/*오른쪽 + 달력 */}
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
