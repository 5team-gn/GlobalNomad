"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  getActivityReservations, 
  ActivityReservation, 
  ReservedScheduleResponse, 
  updateReservationStatus 
} from "@/lib/api/getReservedSchedule"; 
import { ReservationStatusCode } from "@/feature/reservationStatus/types/reservation";
import toast from "react-hot-toast";

export default function useReservationDetail(
  activityId: number | null,
  schedules: ReservedScheduleResponse[]
) {
  const [activeTab, setActiveTab] = useState<ReservationStatusCode>("pending");
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    schedules.length > 0 ? schedules[0].scheduleId : null
  );
  const [reservations, setReservations] = useState<ActivityReservation[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const timeOptions = useMemo(() => {
    return schedules.map((s) => ({
      label: `${s.startTime} ~ ${s.endTime}`,
      value: s.scheduleId,
    }));
  }, [schedules]);

  useEffect(() => {
    if (!activityId || !selectedScheduleId) return;

    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getActivityReservations(activityId, selectedScheduleId, activeTab);
        setReservations(data.reservations);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error("명단 로드 실패:", error);
        toast.error("명단을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [activityId, selectedScheduleId, activeTab]);

  const handleStatusChange = async (reservationId: number, status: "confirmed" | "declined") => {
    if (!activityId) return;

    try {
      await updateReservationStatus(activityId, reservationId, status);
      toast.success(`${status === "confirmed" ? "승인" : "거절"} 처리가 완료되었습니다.`);
      
      if (selectedScheduleId) {
        const data = await getActivityReservations(activityId, selectedScheduleId, activeTab);
        setReservations(data.reservations);
        setTimeout(() => window.location.reload(), 1000); 
      }
    } catch (error) {
      toast.error("처리에 실패했습니다.");
    }
  };

  // --- 5. 수정된 getCount 함수 ---
  const getCount = (status: ReservationStatusCode) => {
    const currentSchedule = schedules.find(s => s.scheduleId === selectedScheduleId);
    if (!currentSchedule) return 0;

    // ReservationStatusCode가 API 응답 객체의 Key인지 확인하는 로직
    // status가 'pending', 'confirmed', 'declined' 중 하나인지 체크합니다.
    if (status === "pending" || status === "confirmed" || status === "declined") {
      return currentSchedule.count[status] ?? 0;
    }

    // 그 외의 상태(canceled 등)는 0으로 반환하여 에러 방지
    return 0;
  };

  return {
    activeTab,
    selectedTime: selectedScheduleId,
    setActiveTab,
    setSelectedTime: setSelectedScheduleId,
    filteredReservations: reservations,
    getCount,
    handleStatusChange,
    timeOptions,
    isLoading,
    totalCount
  };
}