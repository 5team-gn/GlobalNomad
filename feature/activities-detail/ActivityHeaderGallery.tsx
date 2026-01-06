/**
 *
 *
 * @description 액티비티 상세 - 헤더 갤러리 컴포넌트
 */

import { Activity } from "@/types/activities/activity.types";
import Image from "next/image";

type Props = { activity: Activity };

export default function ActivityHeaderGallery({ activity }: Props) {
  const count = activity.subImages?.length ?? 0;

  //모바일 일떄 1~2개 일때.
  const mobileSubH =
    count === 1 ? "h-[180px]" : count === 2 ? "h-[160px]" : "h-[120px]";

  return (
    <div className="overflow-hidden rounded-[30px]">
      <div className="flex flex-col md:flex-row gap-[8px] min-w-0">
        {/* 메인 배너이미지 */}
        <div className="relative w-full md:flex-1 min-w-0 h-[260px] md:h-[400px]">
          <Image
            src={activity.bannerImageUrl}
            alt={activity.title}
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 60vw, 790px"
          />
        </div>

        {/* 서브 이미지 1~4장*/}
        <div
          className={[
            "w-full md:w-[329px] md:flex-none",
            "grid gap-[8px]",
            //모바일 2열(1개면 1열)
            count === 1 ? "grid-cols-1" : "grid-cols-2",
            // 테블릿 이상 1개면 1행, 2개면 2행, 3~4개면 2x2
            count === 1
              ? "md:grid-cols-1 md:grid-rows-1 md:h-[400px]"
              : count === 2
              ? "md:grid-cols-1 md:grid-rows-2 md:h-[400px]"
              : "md:grid-cols-2 md:grid-rows-2",
          ].join(" ")}
        >
          {activity.subImages?.slice(0, 4).map((img, i: number) => (
            <div
              key={img.id}
              className={[
                "relative",
                // 테블릿 이상 1개면 세로 꽉채우기
                count === 1 ? "md:h-full" : "md:h-[196px]",
                // 모바일일때 세로 높이 크게(1~2개)
                mobileSubH,
              ].join(" ")}
            >
              <Image
                src={img.imageUrl}
                alt={`${activity.title}-${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 767px) 50vw, 165px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
