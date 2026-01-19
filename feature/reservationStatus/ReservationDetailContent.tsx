import { ReservedScheduleResponse } from "@/lib/api/getReservedSchedule";
import useReservationDetail from "@/hooks/useReservationDetail";
import ReservationHeader from "./ReservationHeader";
import ReservationTabs from "./ReservationTabs";
import ReservationTimeFilter from "./ReservationTimeFilter";
import ReservationList from "./ReservationList";

interface Props {
  activityId: number | null;
  dateKey: string;
  schedules: ReservedScheduleResponse[];
  onClose: () => void;
}

export default function ReservationDetailContent({ 
  activityId, 
  dateKey, 
  schedules, 
  onClose 
}: Props) {
  
  // 훅에 activityId와 schedules를 모두 넘겨줍니다.
  const {
    activeTab,
    selectedTime, // 이는 선택된 scheduleId 값입니다.
    setActiveTab,
    setSelectedTime,
    filteredReservations,
    getCount,
    handleStatusChange,
    timeOptions,
    isLoading // 로딩 상태를 추가로 활용하면 좋습니다.
  } = useReservationDetail(activityId, schedules);

  return (
    <>
      <ReservationHeader dateKey={dateKey} onClose={onClose} />
      
      <ReservationTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        getCount={getCount}
      />

      <ReservationTimeFilter 
        value={selectedTime} 
        onChange={setSelectedTime} 
        options={timeOptions} 
      />

      {isLoading ? (
        <div className="py-10 text-center text-gray-400">데이터를 불러오는 중입니다...</div>
      ) : (
        <ReservationList
          reservations={filteredReservations}
          activeTab={activeTab}
          onStatusChange={handleStatusChange}
        />
      )}
    </>
  );
}
