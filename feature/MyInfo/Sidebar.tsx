"use client";

import { useState, useRef } from "react";
import { SIDEBAR_MENUS } from "@/feature/MyInfo/Utils/SidebarMenuConfig";
import { SidebarProps } from "@/types/SidebarTypes";
import ImageEditButton from "./ImageEditButton";
import BasicImage from "@/public/Image/cloude.svg";
import Image from "next/image";
import ArrowLeft from "@/public/icon_arrow_left.svg";
import ArrowRight from "@/public/icon_arrow_right.svg";
import toast from "react-hot-toast";
import { uploadProfileImage } from "@/lib/api/user";
import axios from "axios";
import { updateMyInfo } from "@/lib/api/user";

export default function Sidebar({
  active,
  onChange,
  user,
  onProfileUpdate,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleImageEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드 가능합니다.");
      return;
    }

    try {
      const data = await uploadProfileImage(file);
      const newImageUrl = data.profileImageUrl;

      if (newImageUrl) {
        await updateMyInfo({
          profileImageUrl: newImageUrl,
        })
        onProfileUpdate(newImageUrl);
        toast.success("프로필 이미지가 성공적으로 변경되었습니다.");
      }
    } catch (error: unknown) {
      console.error("Error uploading image:", error);
      let errorMessage = "이미지 업로드에 실패했습니다.";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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

      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-md shadow-md md:hidden flex items-center justify-center"
      >
        {isOpen ? (
          <ArrowLeft width={24} height={24} />
        ) : (
          <ArrowRight width={24} height={24} />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      <aside
        className={`
          bg-white transition-all duration-300 ease-in-out z-40
          lg:relative lg:translate-x-0 lg:w-64 lg:h-112.5 lg:border lg:rounded-xl lg:px-6 lg:py-3.5 lg:shadow lg:flex lg:flex-col
          md:relative md:translate-x-0 md:w-44.5 md:h-85.5 md:border md:rounded-xl md:px-3 md:py-3 md:shadow md:flex md:flex-col
          fixed inset-y-0 left-0 w-64 border-r border-gray-100 shadow-xl transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex flex-col items-center justify-center my-4 lg:my-6">
            <div className="relative">
              <div className="rounded-full bg-primary-100 overflow-hidden border border-gray-100 w-20 h-20 lg:w-30 lg:h-30 relative">
                {user?.profileImageUrl ? (
                  <Image
                    src={user.profileImageUrl}
                    alt="profile"
                    fill
                    className="object-cover"
                    unoptimized
                  />
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
            <p className="mt-3 font-bold text-gray-800 lg:hidden text-sm">
              {user?.nickname}님
            </p>
          </div>

          <nav className="flex flex-col gap-1.5 lg:gap-3.5 overflow-y-auto no-scrollbar">
            {SIDEBAR_MENUS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  onChange(key);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 lg:gap-3 px-3 py-2 lg:py-2.5 rounded-md transition-colors shrink-0 ${
                  active === key
                    ? "bg-blue-100 text-primary-500"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <Icon
                  className={`shrink-0 w-5 h-5 lg:w-6 lg:h-6 ${
                    active === key ? "text-primary-500" : "text-gray-400"
                  }`}
                />
                <span
                  className={`font-medium truncate text-xs lg:text-sm ${
                    active === key ? "text-gray-950" : "text-gray-600"
                  }`}
                >
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
