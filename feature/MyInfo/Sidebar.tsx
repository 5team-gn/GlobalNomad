"use client";

import { useState } from "react";
import { SIDEBAR_MENUS } from "@/feature/MyInfo/Utils/SidebarMenuConfig";
import { SidebarProps } from "@/types/SidebarTypes";
import ImageEditButton from "./ImageEditButton";
import BasicImage from "@/public/Image/cloude.svg";
import Image from "next/image";
import ArrowLeft from "@/public/icon_arrow_left.svg";
import ArrowRight from "@/public/icon_arrow_right.svg";

export default function Sidebar({ active, onChange, user }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 1. 모바일 전용 트리거 버튼 (md 미만 노출) */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-md shadow-md md:hidden flex items-center justify-center"
      >
        {isOpen ? <ArrowLeft width={24} height={24} /> : <ArrowRight width={24} height={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* 3. 사이드바 본체 */}
      <aside
        className={`
          bg-white transition-all duration-300 ease-in-out z-40
          
          lg:relative lg:translate-x-0 lg:w-64 lg:h-112.5 lg:border lg:rounded-xl lg:px-6 lg:py-3.5 lg:shadow lg:flex lg:flex-col
          
          md:relative md:translate-x-0 md:w-44.5 md:h-85.5 md:border md:rounded-xl md:px-3 md:py-3 md:shadow md:flex md:flex-col
          
          fixed inset-y-0 left-0 w-64 border-r border-gray-100 shadow-xl transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* 프로필 섹션 */}
          <div className="flex flex-col items-center justify-center my-4 lg:my-6">
            <div className={`
              relative rounded-full bg-primary-100 overflow-hidden border border-gray-100
              w-20 h-20 lg:w-30 lg:h-30
            `}>
              {user?.profileImageUrl ? (
                <Image
                  src={user.profileImageUrl}
                  alt="profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <BasicImage/>
                </div>
              )}
            </div>
            <div className="absolute translate-x-7 translate-y-7 lg:translate-x-10 lg:translate-y-10 scale-[0.8] lg:scale-100">
              <ImageEditButton />
            </div>
            
            <p className="mt-3 font-bold text-gray-800 lg:hidden text-sm">
              {user?.nickname}님
            </p>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="flex flex-col gap-1.5 lg:gap-3.5 overflow-y-auto no-scrollbar">
            {SIDEBAR_MENUS.map(({ key, label, icon: Icon }) => {
              const isActive = active === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    onChange(key);
                    setIsOpen(false); 
                  }}
                  className={`flex items-center gap-2 lg:gap-3 px-3 py-2 lg:py-2.5 rounded-md transition-colors shrink-0
                    ${isActive ? "bg-blue-100 text-primary-500" : "hover:bg-gray-50 text-gray-600"}
                  `}
                >
                  <Icon className={`shrink-0 w-5 h-5 lg:w-6 lg:h-6 ${isActive ? "text-primary-500" : "text-gray-400"}`} />
                  <span className={`
                    font-medium truncate
                    /* 태블릿에서 글자가 잘리지 않도록 텍스트 크기 조절 */
                    text-xs lg:text-sm
                    ${isActive ? "text-gray-950" : "text-gray-600"}
                  `}>
                    {label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}