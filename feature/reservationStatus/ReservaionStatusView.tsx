"use client";

import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
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
  const [scheduleData, setScheduleData] =
    useState<ReservedScheduleResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const adjustedRef = useRef(false);

  const isCompact = useIsCompact();
  useBodyScrollLock(isCompact &&!!selectedDateKey);

  useEffect(() => {
    if (!activityId || !selectedDateKey) return;

    const fetchSchedule = async () => {
      try {
        setIsLoading(true);
        adjustedRef.current = false;
        const data = await getReservedSchedule(
          activityId,
          selectedDateKey
        );
        setScheduleData(data);
      } catch {
        setScheduleData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [activityId, selectedDateKey]);

  const handleSelectDate = (
    key: string,
    position: { top: number; left: number }
  ) => {
    if (selectedDateKey === key) {
      setSelectedDateKey(null);
      setModalPosition(null);
      setScheduleData([]);
      adjustedRef.current = false;
    } else {
      setSelectedDateKey(key);
      setModalPosition(position);
      adjustedRef.current = false;
    }
  };

  useLayoutEffect(() => {
    if (
      !modalRef.current ||
      !modalPosition ||
      adjustedRef.current
    )
      return;

    const modalRect = modalRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const overflowBottom = modalRect.bottom - viewportHeight;

    if (overflowBottom > 0) {
      adjustedRef.current = true;

      setModalPosition((prev) =>
        prev
          ? {
              ...prev,
              top: Math.max(8, prev.top - overflowBottom - 8),
            }
          : prev
      );
    }
  }, [modalPosition, isLoading]);

  return (
    <div className="relative w-full">
      <ReservationCalendar
        activityId={activityId}
        selectedDateKey={selectedDateKey}
        onSelectDate={handleSelectDate}
      />

      {!isCompact && selectedDateKey && modalPosition && (
        <div
          ref={modalRef}
          className="absolute z-50 shadow-2xl animate-in fade-in zoom-in duration-200"
          style={{
            top: modalPosition.top,
            left: modalPosition.left,
          }}
        >
          <ReservationSideModal
            activityId={activityId}
            dateKey={selectedDateKey}
            schedules={scheduleData}
            isLoading={isLoading}
            onClose={() => {
              setSelectedDateKey(null);
              setModalPosition(null);
              adjustedRef.current = false;
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
