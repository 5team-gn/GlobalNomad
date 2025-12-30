import { useScheduleManager } from "@/hooks/useScheduleManager";
import ScheduleRow from "./schedule/ScheduleRow";

export function ScheduleSection({
  manager,
}: {
  manager: ReturnType<typeof useScheduleManager>;
}) {
  const {
    date,
    startTime,
    endTime,
    schedules,
    setDate,
    setStartTime,
    setEndTime,
    isAddDisabled,
    addSchedule,
    removeSchedule,
  } = manager;

  return (
    <>
      <h2 className="text-16-b">예약 가능한 시간대</h2>
      <ScheduleRow
        date={date}
        startTime={startTime}
        endTime={endTime}
        actionType="add"
        addDisabled={isAddDisabled}
        onAction={addSchedule}
        onDateChange={setDate}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
      />
      <div className="h-px bg-gray-100 my-4" />

      {schedules.map((item, index) => (
        <ScheduleRow
          key={index}
          {...item}
          actionType="remove"
          onAction={() => removeSchedule(index)}
        />
      ))}
    </>
  );
}
