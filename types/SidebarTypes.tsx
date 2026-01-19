import { User } from "@/lib/api/user.types";

export type SidebarMenu =
  | "MY_INFO"
  | "RESERVATIONS"
  | "MY_EXPERIENCE"
  | "RESERVATION_STATUS";

export type UserProfile = {
  nickname: string;
  profileImageUrl?: string | null;
};

export type SidebarProps = {
  active: SidebarMenu;
  onChange: (menu: SidebarMenu) => void;
  user?: User | null;
  onProfileUpdate: (newImageUrl: string) => void;
};
