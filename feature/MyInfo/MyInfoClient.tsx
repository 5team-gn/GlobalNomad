"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

import Sidebar from "@/feature/MyInfo/Sidebar";
import MyInfoView from "@/feature/MyInfo/MyInfoView";
import ReservationView from "@/feature/MyInfo/ReservationView";
<<<<<<< HEAD
import MyExperinenceView from "@/feature/MyInfo/MyExperienceView";
import ReservationStatusPage from "@/feature/reservationStatus/ReservationStatusPage";
import { getMyInfo } from "@/lib/api/user";

=======
import MyExperinenceView from "@/feature/MyInfo/MyExperinenceView";
import ReservaionStatusView from "@/feature/MyInfo/ReservaionStatusView";
>>>>>>> origin/main
import type { SidebarMenu } from "@/types/SidebarTypes";
import type { User } from "@/lib/api/user.types"; 


const DEFAULT_MENU: SidebarMenu = "MY_INFO";

export default function MyInfoClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeMenu =
    (searchParams.get("menu") as SidebarMenu) ?? DEFAULT_MENU;
<<<<<<< HEAD

  /** 🔹 user 상태 관리 */
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMyInfo().then(setUser).catch(console.error);
  }, []);
=======
>>>>>>> origin/main

  const handleMenuChange = (menu: SidebarMenu) => {
    router.push(`/myinfo?menu=${menu}`);
  };

  /** 🔹 프로필 이미지 업데이트 핸들러 */
  const handleProfileUpdate = (newImageUrl: string) => {
    setUser((prev) =>
      prev ? { ...prev, profileImageUrl: newImageUrl } : prev
    );
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-245 md:px-6 pt-10">
        <div className="flex gap-12.5">
          <Sidebar
            active={activeMenu}
            onChange={handleMenuChange}
            user={user}
            onProfileUpdate={handleProfileUpdate}
          />

          <main className="flex-1 min-w-0">
            {activeMenu === "MY_INFO" && <MyInfoView />}
            {activeMenu === "RESERVATIONS" && <ReservationView />}
            {activeMenu === "MY_EXPERIENCE" && <MyExperinenceView />}
            {activeMenu === "RESERVATION_STATUS" && (
<<<<<<< HEAD
              <ReservationStatusPage />
=======
              <ReservaionStatusView />
>>>>>>> origin/main
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
