import { useState } from "react";
import { Reservation, ReservationStatusCode } from "./types/reservation";
import DeleteIcon from "@/public/icon_delete.svg";

interface Props {
  dateKey: string;
  reservations: Reservation[];
  onClose: () => void;
}

const TIME_SLOTS = [
  "전체",
  ...Array.from({ length: 24 }, (_, i) => {
    const start = String(i).padStart(2, "0") + ":00";
    const end = String(i + 1).padStart(2, "0") + ":00";
    return `${start} - ${end}`;
  }),
];

const TABS: { label: string; status: ReservationStatusCode }[] = [
  { label: "신청", status: "pending" },
  { label: "승인", status: "confirmed" },
  { label: "거절", status: "declined" },
];

const STATUS_UI_CONFIG: Record<
  ReservationStatusCode,
  { label: string; badgeStyle: string }
> = {
  pending: {
    label: "신청",
    badgeStyle: "bg-blue-50 text-blue-600 border-blue-100",
  },
  confirmed: {
    label: "예약 승인",
    badgeStyle: "bg-cyan-50 text-cyan-500 border-cyan-100",
  },
  declined: {
    label: "예약 거절",
    badgeStyle: "bg-red-50 text-red-400 border-red-100",
  },
  canceled: {
    label: "예약 취소",
    badgeStyle: "bg-gray-100 text-gray-500 border-gray-200",
  },
  completed: {
    label: "방문 완료",
    badgeStyle: "bg-blue-50 text-blue-600 border-blue-100",
  },
};

export default function ReservationDetailContent({
  dateKey,
  reservations: initialReservations,
  onClose,
}: Props) {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [activeTab, setActiveTab] = useState<ReservationStatusCode>("pending");
  const [selectedTime, setSelectedTime] = useState("전체");

  const handleStatusChange = (id: string | number, newStatus: ReservationStatusCode) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const filteredReservations = reservations.filter((r) => {
    if (r.status !== activeTab) return false;
    if (selectedTime === "전체") return true;

    const hour = new Date(r.date).getHours();
    const startHour = Number(selectedTime.split(":")[0]);
    return hour === startHour;
  });

  const getCount = (status: ReservationStatusCode) =>
    reservations.filter((r) => r.status === status).length;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">{dateKey}</h2>
        <button onClick={onClose}>
          <DeleteIcon className="w-6 h-6" />
        </button>
      </div>

      <nav className="mb-6 flex border-b border-gray-100 text-16-b">
        {TABS.map((tab) => (
          <button
            key={tab.status}
            onClick={() => setActiveTab(tab.status)}
            className={`relative flex-1 pb-3 font-medium transition-colors ${
              activeTab === tab.status ? "text-blue-500" : "text-gray-400"
            }`}
          >
            {tab.label} {getCount(tab.status)}
            {activeTab === tab.status && (
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-500" />
            )}
          </button>
        ))}
      </nav>

      <div className="mb-6">
        <label className="block text-18-b font-bold mb-3">예약 시간</label>
        <div className="relative">
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full h-13.5 appearance-none rounded-xl border border-gray-200 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            ▼
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-7.5">
        <h3 className="text-18-b font-bold">예약 내역</h3>

        {filteredReservations.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-400">
            내역이 없습니다.
          </p>
        ) : (
          <ul className="space-y-3">
            {filteredReservations.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex gap-4">
                      <span className="text-gray-400 font-medium w-12">닉네임</span>
                      <span className="text-gray-800 font-bold">{r.id}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-gray-400 font-medium w-12">인원</span>
                      <span className="text-gray-800 font-bold">{r.people}명</span>
                    </div>
                  </div>

                  <div>
                    {activeTab === "pending" ? (
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => handleStatusChange(r.id, "confirmed")}
                          className="rounded-lg border border-gray-200 px-5 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50"
                        >
                          승인하기
                        </button>
                        <button 
                          onClick={() => handleStatusChange(r.id, "declined")}
                          className="rounded-lg bg-gray-100 px-5 py-1.5 text-xs font-bold text-gray-400 hover:bg-gray-200"
                        >
                          거절하기
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`inline-block px-3 py-1.5 text-xs font-bold border rounded-full ${
                          STATUS_UI_CONFIG[r.status]?.badgeStyle
                        }`}
                      >
                        {STATUS_UI_CONFIG[r.status]?.label}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}