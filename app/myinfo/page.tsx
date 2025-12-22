// app/myinfo/page.tsx (또는 dashboard/page.tsx)
"use client";

import { useState } from "react";
import Sidebar from "@/feature/MyInfo/components/Sidebar";
import MyInfoView from "@/feature/MyInfo/MyInfoView";
import ReservationView from "@/feature/MyInfo/ReservationView";
import MyExperinenceView from "@/feature/MyInfo/MyExperinenceView";
import ReservaionStatusView from "@/feature/MyInfo/ReservaionStatusView";
import type { SidebarMenu } from "@/types/SidebarTypes";

export default function MyInfoPage() {
  const [activeMenu, setActiveMenu] = useState<SidebarMenu>("MY_INFO");

  return (
    <div className="flex min-h-screen">
      <div className="flex ml-30 xl:ml-117.5 pt-10">
        <Sidebar active={activeMenu} onChange={setActiveMenu} />

        <main className="flex-1 p-6">
          {activeMenu === "MY_INFO" && <MyInfoView />}
          {activeMenu === "RESERVATIONS" && <ReservationView />}
          {activeMenu === "MY_EXPERIENCE" && <MyExperinenceView />}
          {activeMenu === "RESERVATION_STATUS" && <ReservaionStatusView />}
        </main>
      </div>
    </div>
  );
}
