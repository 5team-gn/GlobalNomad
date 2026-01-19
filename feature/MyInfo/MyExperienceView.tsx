"use client";

import { Button } from "@/components/button/Button";
import { useEffect, useState } from "react";
import MyExperienceList from "./MyExperienceList";
import type { MyActivity } from "@/types/MyExperienceTypes";
import Link from "next/link";
import { getMyActivities } from "../activities-detail/api/getMyActivities"; 

export default function MyExperinenceView() {
  const [activities, setActivities] = useState<MyActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        // 명세서에 따른 호출 (teamId는 환경 변수나 설정된 값을 사용)
        const data = await getMyActivities({ size: 20 });
        setActivities(data.activities);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <main className="max-w-160 flex flex-col mx-auto mb-20 mb: px-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-18-b">내 체험 관리</h1>
          <span className="text-14-m text-gray-500">
            체험을 등록하거나 수정 및 삭제가 가능합니다.
          </span>
        </div>
        <Link href="/myactivities/register">
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
        {loading ? (
          <div className="py-10 text-center">로딩 중...</div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">{error}</div>
        ) : activities.length === 0 ? (
          <div className="py-10 text-center text-gray-500">등록된 체험이 없습니다.</div>
        ) : (
          <MyExperienceList experiences={activities} />
        )}
      </div>
    </main>
  );
}