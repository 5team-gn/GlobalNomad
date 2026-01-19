"use client";

import { useState, useEffect } from "react";
import MyExperienceCard from "./MyExperienceCard";
import type { MyActivity } from "@/types/MyExperienceTypes";

interface Props {
  experiences: MyActivity[];
}

export default function MyExperienceList({ experiences }: Props) {
  const [myactivities, setMyActivities] = useState<MyActivity[]>(experiences);

  useEffect(() => {
    setMyActivities(experiences);
  }, [experiences]);

  const handleDeleteSuccess = (deletedId: number) => {
    setMyActivities((prev) =>
      prev.filter((activity) => activity.id !== deletedId)
    );
  };

  if (myactivities.length === 0) {
    return (
      <div className="text-center text-gray-400 py-20 text-18-m">
        등록된 체험이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {myactivities.map((exp) => (
        <MyExperienceCard 
          key={exp.id} 
          experience={exp} 
          onDeleteSuccess={handleDeleteSuccess}
        />
      ))}
    </div>
  );
}