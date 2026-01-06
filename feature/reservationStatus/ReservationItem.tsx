import { Reservation,ReservationStatusCode } from "./types/reservation";
import { STATUS_UI_CONFIG } from "./constants/ReservationUI";

interface Props {
  reservation: Reservation;
  activeTab: ReservationStatusCode;
  onStatusChange: (
    id: string | number,
    status: ReservationStatusCode
  ) => void;
}

export default function ReservationItem({
  reservation,
  activeTab,
  onStatusChange,
}: Props) {
  return (
    <li className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex gap-4">
            <span className="text-gray-400 font-medium w-12">
              닉네임
            </span>
            <span className="text-gray-800 font-bold">
              {reservation.id}
            </span>
          </div>

          <div className="flex gap-4">
            <span className="text-gray-400 font-medium w-12">
              인원
            </span>
            <span className="text-gray-800 font-bold">
              {reservation.people}명
            </span>
          </div>
        </div>

        <div>
          {activeTab === "pending" ? (
            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  onStatusChange(reservation.id, "confirmed")
                }
                className="rounded-lg border border-gray-200 px-5 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                승인하기
              </button>
              <button
                onClick={() =>
                  onStatusChange(reservation.id, "declined")
                }
                className="rounded-lg bg-gray-100 px-5 py-1.5 text-xs font-bold text-gray-400 hover:bg-gray-200"
              >
                거절하기
              </button>
            </div>
          ) : (
            <span
              className={`inline-block px-3 py-1.5 text-xs font-bold border rounded-full ${
                STATUS_UI_CONFIG[reservation.status]?.badgeStyle
              }`}
            >
              {STATUS_UI_CONFIG[reservation.status]?.label}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}