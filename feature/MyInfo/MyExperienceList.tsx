import MyExperienceCard from "./MyExperienceCard";
import type { MyActivity } from "@/types/MyExperienceTypes";

interface Props {
  experiences: MyActivity[];
}

export default function MyExperienceList({ experiences }: Props) {
  if (experiences.length === 0) {
    return (
      <div className="text-center text-gray-400 py-20">
        등록된 체험이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {experiences.map((exp) => (
        <MyExperienceCard key={exp.id} experience={exp} />
      ))}
    </div>
  );
}
