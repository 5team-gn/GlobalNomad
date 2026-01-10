"use client";

import { Button } from "@/components/button/Button"
import { useEffect, useState } from "react";
import MyExperienceList from "./MyExperienceList";
import type { MyActivity } from "@/types/MyExperienceTypes";
{
  /**mock데이터 사용중 추후 변경예정 */
}
import { myActivitiesMock } from "@/Mocks/myActivities.mock";
import Link from "next/link";

// type Props = {
//   mode?: "view" | "edit";
//   onEdit?: () => void;
//   onCancel?: () => void;
// };

export default function MyExperinenceView() {
  const [activities] = useState<MyActivity[]>(myActivitiesMock.activities);
  const [loading] = useState(false);

  // useEffect(() => {
  //   const fetchActivities = async () => {
  //     try {
  //       const data = await getMyActivities("teamId");
  //       setActivities(data.activities);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchActivities();
  // }, []);

  return (
    <main className="max-w-160 max-h-300 flex flex-col mx-auto">
      {/*제목,설명,버튼 영역*/}
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-18-b">내체험 관리</h1>
          <span className="text-14-m text-gray-500">
            체험을 등록하거나 수정및 삭제가 가능합니다.
          </span>
        </div>
        <Link href="/myinfo/experiences/new">
          <Button
            variant="primary"
            size="md"
            className="px-[26.5px] py-3.5 rounded-2xl"
          >
            체험 등록하기
          </Button>
        </Link>
      </div>
      <div className="flex-col gap-6 mt-5">
        {/** 데이터를 받았을때 들어올 카드 */}
        {loading ? (
          <div>로딩중...</div>
        ) : (
          <MyExperienceList experiences={activities} />
        )}
      </div>
    </main>
  );
}
