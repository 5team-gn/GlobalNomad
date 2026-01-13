"use client";

import { useState, useEffect } from "react";
import { toDateKey } from "@/lib/utils/date";
import ReservationCalendar from "./Calendar/ReservationCalendar";
import ReservationSideModal from "./ReservationSidemodal";
import ReservationBottomSheet from "./MobileBottomSheet";
import { useIsCompact } from "@/hooks/useIsCompact";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import {
  getReservedSchedule,
  ReservedScheduleResponse,
} from "@/lib/api/getReservedSchedule";

interface Props {
  activityId: number | null;
  selectedTitle: string | null;
}

export default function ReservationStatusView({
  activityId,
  selectedTitle,
}: Props) {
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [scheduleData, setScheduleData] = useState<ReservedScheduleResponse[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const isCompact = useIsCompact();
  useBodyScrollLock(!!selectedDateKey);

  useEffect(() => {
    if (activityId && selectedDateKey) {
      const fetchSchedule = async () => {
        try {
          setIsLoading(true);
          const data = await getReservedSchedule(activityId, selectedDateKey);
          setScheduleData(data);
        } catch (error) {
          console.error(error);
          setScheduleData([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSchedule();
    }
  }, [activityId, selectedDateKey]);

  const handleSelectDate = (
    key: string,
    position: { top: number; left: number }
  ) => {
    if (selectedDateKey === key) {
      setSelectedDateKey(null);
      setModalPosition(null);
      setScheduleData([]);
    } else {
      setSelectedDateKey(key);
      setModalPosition(position);
    }
  };

  return (
    <div className="relative w-full">
      <div className="w-full">
        <ReservationCalendar
          activityId={activityId}
          selectedDateKey={selectedDateKey}
          onSelectDate={handleSelectDate}
        />
      </div>

      {!isCompact && selectedDateKey && modalPosition && (
        <div
          className="absolute z-50 shadow-2xl animate-in fade-in zoom-in duration-200"
          style={{ top: modalPosition.top, left: modalPosition.left }}
        >
          <ReservationSideModal
            activityId={activityId}
            key={selectedDateKey}
            dateKey={selectedDateKey}
            schedules={scheduleData}
            isLoading={isLoading}
            onClose={() => {
              setSelectedDateKey(null);
              setModalPosition(null);
            }}
          />
        </div>
      )}

      {isCompact && selectedDateKey && (
        <ReservationBottomSheet
          activityId={activityId}
          dateKey={selectedDateKey}
          schedules={scheduleData}
          isLoading={isLoading}
          onClose={() => setSelectedDateKey(null)}
        />
      )}
    </div>
  );
}
