"use client";

import { useSearchParams, useRouter } from "next/navigation";

import Sidebar from "@/feature/MyInfo/Sidebar";
import MyInfoView from "@/feature/MyInfo/MyInfoView";
import ReservationView from "@/feature/MyInfo/ReservationView";
import MyExperinenceView from "@/feature/MyInfo/MyExperinenceView";
import ReservationStatusPage from "@/feature/reservationStatus/ReservationStatusPage";
import type { SidebarMenu } from "@/types/SidebarTypes";

const DEFAULT_MENU: SidebarMenu = "MY_INFO";

export default function MyInfoClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeMenu = (searchParams.get("menu") as SidebarMenu) ?? DEFAULT_MENU;

  const handleMenuChange = (menu: SidebarMenu) => {
    router.push(`/myinfo?menu=${menu}`);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-245 px-6 pt-10">
        <div className="flex gap-12.5">
          <Sidebar active={activeMenu} onChange={handleMenuChange} />

          <main className="flex-1 min-w-0">
            {activeMenu === "MY_INFO" && <MyInfoView />}
            {activeMenu === "RESERVATIONS" && <ReservationView />}
            {activeMenu === "MY_EXPERIENCE" && <MyExperinenceView />}
            {activeMenu === "RESERVATION_STATUS" && <ReservationStatusPage />}
          </main>
        </div>
      </div>
    </div>
  );
}
