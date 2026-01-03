import { Suspense } from "react";
import MyInfoClient from "@/feature/MyInfo/MyInfoClient";

export default function MyInfoPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex ml-30 xl:ml-117.5 pt-10">
        <Sidebar active={activeMenu} onChange={setActiveMenu} />

        <main className="flex-1">
          {activeMenu === "MY_INFO" && <MyInfoView />}
          {activeMenu === "RESERVATIONS" && <ReservationView />}
          {activeMenu === "MY_EXPERIENCE" && <MyExperinenceView />}
          {activeMenu === "RESERVATION_STATUS" && <ReservaionStatusView />}
        </main>
      </div>
    </div>
  );
}
