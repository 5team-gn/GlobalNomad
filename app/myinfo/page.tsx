"use client";

import { useState } from "react";

import Sidebar from "@/feature/MyInfo/Sidebar";
import MyInfoView from "@/feature/MyInfo/MyInfoView";
import ReservationView from "@/feature/MyInfo/ReservationView";
import MyExperinenceView from "@/feature/MyInfo/MyExperinenceView";
import ReservaionStatusView from "@/feature/MyInfo/ReservaionStatusView";
import type { SidebarMenu } from "@/types/SidebarTypes";

export default function MyInfoPage() {
  const [activeMenu, setActiveMenu] = useState<SidebarMenu>("MY_INFO");

  const handleMenuChange = (menu: SidebarMenu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-245 px-6 pt-10">
        <div className="flex gap-12.5">
          <Sidebar active={activeMenu} onChange={handleMenuChange} />

          {/* 콘텐츠 영역 */}
          <main className="flex-1 min-w-0">
            {activeMenu === "MY_INFO" && <MyInfoView />}
            {activeMenu === "RESERVATIONS" && <ReservationView />}
            {activeMenu === "MY_EXPERIENCE" && <MyExperinenceView />}
            {activeMenu === "RESERVATION_STATUS" && <ReservaionStatusView />}
          </main>
        </div>
      </div>
    </div>
  );
}
