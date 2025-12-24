import { SidebarMenu } from "@/types/SidebarTypes";

import User from "@/public/icon_user.svg";
import List from "@/public/icon_list.svg";
import Setting from "@/public/icon_setting.svg";
import Calendar from "@/public/icon_calendar.svg";

export const SIDEBAR_MENUS = [
  { key: "MY_INFO", label: "내 정보", icon: User },
  { key: "RESERVATIONS", label: "예약 내역", icon: List },
  { key: "MY_EXPERIENCE", label: "내 체험 관리", icon: Setting },
  { key: "RESERVATION_STATUS", label: "예약 현황", icon: Calendar },
] as const satisfies readonly {
  key: SidebarMenu;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[];
