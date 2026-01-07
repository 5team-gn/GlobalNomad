import { ReservationStatusCode } from "./types/reservation";
import { TABS } from "./constants/ReservationUI";

interface Props {
  activeTab: ReservationStatusCode;
  onChange: (status: ReservationStatusCode) => void;
  getCount: (status: ReservationStatusCode) => number;
}

export default function ReservationTabs({
  activeTab,
  onChange,
  getCount,
}: Props) {
  return (
    <nav className="mb-6 flex border-b border-gray-100 text-16-b">
      {TABS.map((tab) => (
        <button
          key={tab.status}
          onClick={() => onChange(tab.status)}
          className={`relative flex-1 pb-3 font-medium transition-colors ${
            activeTab === tab.status
              ? "text-blue-500"
              : "text-gray-400"
          }`}
        >
          {tab.label} {getCount(tab.status)}
          {activeTab === tab.status && (
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-500" />
          )}
        </button>
      ))}
    </nav>
  );
}