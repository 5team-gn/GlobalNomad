import ActivityHeader from "@/app/feature/activities-detail/ActivityHeader";
import { mockActivityDetail } from "@/app/mocks/activityDetail.mock";
import Image from "next/image";

const Activities = () => {
  const mock = mockActivityDetail;

  return (
    <main className="max-w-[1200] mx-auto font-pretendard mt-22 mb-45 text-gray-950">
      <ActivityHeader />
    </main>
  );
};

export default Activities;
