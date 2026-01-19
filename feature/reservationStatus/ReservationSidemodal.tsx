import { ReservedScheduleResponse } from "@/lib/api/getReservedSchedule";
import ReservationDetailContent from "./ReservationDetailContent";

interface Props {
  activityId: number | null;
  dateKey: string;
  schedules: ReservedScheduleResponse[];
  isLoading?: boolean;
  onClose: () => void;
}

export default function ReservationSideModal({
  dateKey,
  schedules,
  isLoading,
  onClose,
  activityId,
}: Props) {
  return (
    <aside className="w-[360px] rounded-2xl border bg-white p-6 shadow-xl">
      {isLoading ? (
        <div className="flex h-40 items-center justify-center text-gray-400">
          로딩중
        </div>
      ) : (
        <ReservationDetailContent
          activityId={activityId}
          dateKey={dateKey}
          schedules={schedules}
          onClose={onClose}
        />
      )}
    </aside>
  );
}
