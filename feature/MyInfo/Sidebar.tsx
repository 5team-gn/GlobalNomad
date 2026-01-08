"use client";

import { SIDEBAR_MENUS } from "@/feature/MyInfo/Utils/SidebarMenuConfig";
import { SidebarProps } from "@/types/SidebarTypes";
import ImageEditButton from "./ImageEditButton";
import BasicImage from "@/public/Image/cloude.svg";
import Image from "next/image";

export default function Sidebar({ active, onChange, user }: SidebarProps) {
  return (
    <aside className="w-64 max-h-112.5 border border-gray-50 rounded-xl px-6 py-3.5 shadow">
      <div className="flex items-center my-6 justify-center">
        <div className="relative w-30 h-30">
          <div className="w-full h-full rounded-full bg-primary-100 overflow-hidden border border-gray-100">
            {user?.profileImageUrl ? (
              <Image
                src={user.profileImageUrl ?? BasicImage}
                alt={`${user?.nickname ?? "user"} profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                <BasicImage />
              </div>
            )}
          </div>

          <ImageEditButton />
        </div>
      </div>

      <nav className="flex flex-col gap-3.5">
        {SIDEBAR_MENUS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition cursor-pointer
                ${isActive ? "bg-blue-100" : "hover:bg-gray-100"}
              `}
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? "text-primary-500" : "text-gray-400"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isActive ? "text-gray-950" : "text-gray-600"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
