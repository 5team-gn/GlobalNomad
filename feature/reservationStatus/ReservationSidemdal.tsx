import { useState } from "react";
import { Reservation, ReservationStatusCode } from "./types/reservation";
import DeleteIcon from "@/public/icon_delete.svg";

interface Props {
  dateKey: string;
  reservations: Reservation[];
  onClose: () => void;
  position: {
    top: number;
    left: number;
  };
}

const TIME_SLOTS = [
  "전체", 
  ...Array.from({ length: 24 }, (_, i) => {
    const start = String(i).padStart(2, "0") + ":00";
    const end = String(i + 1).padStart(2, "0") + ":00";
    return `${start} - ${end}`;
  })
];

const TABS: { label: string; status: ReservationStatusCode }[] = [
  { label: "신청", status: "pending" },
  { label: "승인", status: "confirmed" },
  { label: "거절", status: "declined" },
];

export default function ReservationSideModal({ dateKey, reservations, onClose,position }: Props) {
  const [activeTab, setActiveTab] = useState<ReservationStatusCode>("pending");
  const [selectedTime, setSelectedTime] = useState<string>("전체");

  const filteredReservations = reservations.filter((r) => {
    const isStatusMatch = r.status === activeTab;
    
    let isTimeMatch = true;
    if (selectedTime !== "전체") {
      const reservationHour = new Date(r.date).getHours(); 
      const startHour = parseInt(selectedTime.split(":")[0]);
      isTimeMatch = reservationHour === startHour;
    }

    return isStatusMatch && isTimeMatch;
  });

  const getCount = (status: ReservationStatusCode) =>
    reservations.filter((r) => r.status === status).length;

  return (
    <aside className="absolute w-90 rounded-2xl border bg-white p-6 shadow-xl z-50">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{dateKey}</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
          <DeleteIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <nav className="mb-6 flex border-b border-gray-100 text-16-b">
        {TABS.map((tab) => (
          <button
            key={tab.status}
            onClick={() => setActiveTab(tab.status)}
            className={`relative flex-1 pb-3 font-medium transition-colors  ${
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
            className="w-full h-13.5 appearance-none rounded-xl border border-gray-200  px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2  ">▼</div>
        </div>
      </div>

      <div className="space-y-4 mt-7.5">
        <h3 className="text-18-b">예약 내역</h3>
        {filteredReservations.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-400">
            {selectedTime === "전체" ? "예약 내역이 없습니다." : `${selectedTime}에 해당하는 내역이 없습니다.`}
          </p>
        ) : (
          <ul className="space-y-3">
            {filteredReservations.map((r) => {
              let badgeStyle = "bg-blue-50 text-blue-600 border-blue-100";
              let cardStyle = "bg-white";

              if (r.status === "canceled") {
                badgeStyle = "bg-gray-100 text-gray-500 border-gray-200";
                cardStyle = "bg-gray-50 opacity-80";
              } else if (r.status === "declined") {
                badgeStyle = "bg-red-50 text-red-600 border-red-100";
                cardStyle = "bg-red-50/30 opacity-80";
              } else if (r.status === "completed") {
                badgeStyle = "bg-blue-50 text-blue-600 border-blue-100";
              }

              return (
                <li key={r.id} className={`rounded-2xl border border-gray-100 shadow-sm ${cardStyle}`}>
                  <div className="flex items-start justify-between px-4 py-3.5">
                    <div className="space-y-2.5">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold border rounded ${badgeStyle}`}>
                        {r.status === "pending" && "신청"}
                        {r.status === "canceled" && "예약 취소"}
                        {r.status === "declined" && "예약 거절"}
                        {r.status === "completed" && "예약 승인"}
                      </span>

                      <div className="flex gap-2">
                        <span className="text-16-b font-medium text-gray-400">닉네임</span>
                        <span className="text-16-m font-bold text-gray-800">{r.id}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-16-b font-medium text-gray-400">인원</span>
                        <span className="text-16-m font-bold text-gray-800">{r.people}명</span>
                      </div>
                    </div>
                    {activeTab === "pending" && (
                      <div className="flex flex-col gap-2">
                        <button className="rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50">
                          승인하기
                        </button>
                        <button className="rounded-lg bg-gray-100 px-4 py-1.5 text-xs font-bold text-gray-400 hover:bg-gray-200">
                          거절하기
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}