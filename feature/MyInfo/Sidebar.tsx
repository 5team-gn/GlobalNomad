"use client";

import { useState, useRef } from "react";
import { SIDEBAR_MENUS } from "@/feature/MyInfo/Utils/SidebarMenuConfig";
import { SidebarProps } from "@/types/SidebarTypes";
import ImageEditButton from "./ImageEditButton";
import BasicImage from "@/public/Image/cloude.svg";
import Image from "next/image";
import ArrowLeft from "@/public/icon_arrow_left.svg";
import ArrowRight from "@/public/icon_arrow_right.svg";

export default function Sidebar({ active, onChange, user }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 환경 변수에서 팀 아이디와 베이스 URL 가져오기
  const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleImageEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // FormData 생성
    const formData = new FormData();
    formData.append("image", file);

    try {
      // 환경 변수를 활용한 정확한 API 경로 설정
      // https://sp-globalnomad-api.vercel.app/19-5/users/me/image
      const response = await fetch(`${BASE_URL}${TEAM_ID}/users/me/image`, {
        method: "POST",
        body: formData,
        // 헤더에 Authorization 토큰이 필요하다면 여기에 추가해야 할 수 있습니다.
      });

      if (!response.ok) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }

      const data = await response.json();
      console.log("업로드 성공:", data.profileImageUrl);
      
      alert("프로필 이미지가 성공적으로 변경되었습니다.");
      window.location.reload(); 

    } catch (error) {
      console.error("Error uploading image:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* ... (이전과 동일한 UI 코드) ... */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-md shadow-md md:hidden flex items-center justify-center"
      >
        {isOpen ? <ArrowLeft width={24} height={24} /> : <ArrowRight width={24} height={24} />}
      </button>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleMenu} />}

      <aside className={`
          bg-white transition-all duration-300 ease-in-out z-40
          lg:relative lg:translate-x-0 lg:w-64 lg:h-112.5 lg:border lg:rounded-xl lg:px-6 lg:py-3.5 lg:shadow lg:flex lg:flex-col
          md:relative md:translate-x-0 md:w-44.5 md:h-85.5 md:border md:rounded-xl md:px-3 md:py-3 md:shadow md:flex md:flex-col
          fixed inset-y-0 left-0 w-64 border-r border-gray-100 shadow-xl transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex flex-col items-center justify-center my-4 lg:my-6">
            <div className="relative">
              <div className="rounded-full bg-primary-100 overflow-hidden border border-gray-100 w-20 h-20 lg:w-30 lg:h-30 relative">
                {user?.profileImageUrl ? (
                  <Image src={user.profileImageUrl} alt="profile" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <BasicImage />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 z-10 scale-[0.8] lg:scale-100">
                <ImageEditButton onClick={handleImageEditClick} />
              </div>
            </div>
            <p className="mt-3 font-bold text-gray-800 lg:hidden text-sm">{user?.nickname}님</p>
          </div>

          <nav className="flex flex-col gap-1.5 lg:gap-3.5 overflow-y-auto no-scrollbar">
            {SIDEBAR_MENUS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => { onChange(key); setIsOpen(false); }}
                className={`flex items-center gap-2 lg:gap-3 px-3 py-2 lg:py-2.5 rounded-md transition-colors shrink-0 ${
                  active === key ? "bg-blue-100 text-primary-500" : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <Icon className={`shrink-0 w-5 h-5 lg:w-6 lg:h-6 ${active === key ? "text-primary-500" : "text-gray-400"}`} />
                <span className={`font-medium truncate text-xs lg:text-sm ${active === key ? "text-gray-950" : "text-gray-600"}`}>
                  {label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}