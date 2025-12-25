import ActivityReviews from "@/app/feature/activities-detail/activity-reviews/ActivityReviews";
import ActivityCalendarClient from "@/app/feature/activities-detail/ActivityCalendar.client";
import ActivityHeader from "@/app/feature/activities-detail/ActivityHeader";
import KakaoMapByAddress from "@/app/feature/activities-detail/KakaoMapByAddress";
import { mockActivityDetail } from "@/app/mocks/activityDetail.mock";
import Image from "next/image";

const Activities = () => {
  const mock = mockActivityDetail;

  return (
    <main className="max-w-[1200] mx-auto font-pretendard mt-22 mb-45 text-gray-950">
      <div className="detail_wrap px-[3.3333vw]">
        <div className="grid lg:grid-cols-[1fr_410px] lg:grid-rows-[auto_auto_auto_auto] lg:gap-x-10 lg:items-start">
          {/* 상세헤더 (row1) */}
          <ActivityHeader />

          {/* 캘린더 */}
          <div className="order-3 lg:col-start-2 lg:row-start-2 lg:row-end-5 lg:self-start">
            <ActivityCalendarClient />
          </div>

          {/* 체험 설명 (PC: 왼쪽 row2) */}
          <div className="order-4 lg:col-start-1 lg:row-start-2 pb-10 mt-10 border-b border-gray-100 border-t lg:border-t-0">
            <div className="detail_description">
              <p className="text-18-b text-gray-950 pt-[40] mb-2">체험 설명</p>
              <p className="text-16-body-m text-gray-950">{mock.description}</p>
            </div>
          </div>

          {/* 상세지도 (PC: 왼쪽 row3) */}
          <div className="order-5 lg:col-start-1 lg:row-start-3">
            <KakaoMapByAddress
              address={mock.address}
              level={3}
              markerText={mock.title}
            />
          </div>

          {/* 리뷰 (PC: 왼쪽 row4) */}
          <div className="order-6 lg:col-start-1 lg:row-start-4 pb-[96] lg:pb-0 mt-10 border-t border-gray-100 pt-5 md:pt-[30] lg:pt-10">
            <ActivityReviews activityId={mock.id} />
          </div>

          {/* tb 이하 fixed 달력 가림 방지 */}
          <div className="order-6 lg:hidden h-[96]" />
        </div>
      </div>
    </main>
  );
};

export default Activities;
