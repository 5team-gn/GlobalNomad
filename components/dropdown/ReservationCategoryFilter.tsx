"use client";
import { useEffect, useState } from "react";
import CategorySelect from "./CategorySelect";
import { getMyActivities } from "@/feature/activities-detail/api/getMyActivities";

interface Activity {
  id: number;
  title: string;
}

interface Props {
  selectedTitle: string | null;
  onChange: (title: string | null, activityId: number | null) => void;
}

export default function ReservationCategoryFilter({
  selectedTitle,
  onChange,
}: Props) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getMyActivities({ size: 100 });
        setActivities(data.activities || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivities();
  }, []);

  const titles = activities.map((a) => a.title);

  const handleSelectChange = (value: string) => {
    if (value === "") {
      onChange(null, null);
    } else {
      const selected = activities.find((a) => a.title === value);
      onChange(value, selected?.id ?? null);
    }
  };

  return (
    <CategorySelect
      options={titles}
      value={selectedTitle ?? ""}
      placeholder="체험을 선택해 주세요"
      onChange={handleSelectChange}
    />
  );
}
