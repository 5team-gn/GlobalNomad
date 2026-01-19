"use client";

import { useState } from "react";
import ReservationCategoryFilter from "../../components/dropdown/ReservationCategoryFilter";
import ReservationStatusView from "./ReservaionStatusView";

export default function ReservationStatusPage() {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);

  const handleFilterChange = (title: string | null, id: number | null) => {
    setSelectedTitle(title);
    setSelectedActivityId(id);
  };

  return (
    <section className="mb-28 mb: px-4">
      <header className="mb-7.5">
        <h1 className="text-18-b mb-2.5">예약현황</h1>
        <p className="text-14-m text-gray-500">
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </header>

      <div className="mb-7.5">
        <ReservationCategoryFilter
          selectedTitle={selectedTitle}
          onChange={handleFilterChange}
        />
      </div>

      <ReservationStatusView
        activityId={selectedActivityId}
        selectedTitle={selectedTitle}
      />
    </section>
  );
}