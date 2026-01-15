"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import NotificationsBell from "./NotificationsBell";
import SessionCountdown from "../SessionCountdown";

const Header = () => {
  const { isLoggedIn, user, logout, isLoading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <header className="h-[70px] bg-white border-b border-gray-200" />;
  }

  return (
    <header className="text-black flex items-center justify-between py-[10px] px-[200px] bg-white h-[70px]">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/Logo.jpg"
            alt="GlobalNomad Logo"
            width={134}
            height={16}
            priority
          />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-6 relative">
            {/* 알림 아이콘 */}
            <NotificationsBell />

            <div className="h-[24px] w-[1px] bg-gray-200"></div>

            {/* 프로필 & 닉네임 */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex items-center gap-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="relative w-[32px] h-[32px] rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                  {user?.profileImageUrl ? (
                    <Image
                      src={user.profileImageUrl}
                      alt="프로필"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="/icon_user.svg"
                      alt="프로필"
                      width={20}
                      height={20}
                    />
                  )}
                </div>
                <span className="text-[14px] font-medium text-gray-900">
                  {user?.nickname}
                </span>
              </button>

              {/* 드롭다운 메뉴 */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-[160px] bg-white rounded-[12px] shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href="/myinfo"
                    className="block px-4 py-3 text-[14px] text-gray-900 hover:bg-gray-50 transition-colors text-left"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    마이페이지
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-[14px] text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>

            {/* 세션 남은 시간 */}
            <SessionCountdown
              getToken={() => {
                // TODO: 프로젝트의 실제 토큰 저장 위치로 변경하세요
                // 예) localStorage, cookie, zustand store 등
                return typeof window !== "undefined"
                  ? localStorage.getItem("accessToken")
                  : null;
              }}
              onExpire={() => {
                // 만료 시 즉시 로그아웃 처리(원치 않으면 제거)
                logout();
              }}
              warnBeforeSec={120}
            />
          </div>
        ) : (
          <>
            <Link href="/login">
              <span className="text-black font-medium text-[14px] tracking-[-0.025em]">
                로그인
              </span>
            </Link>
            <Link href="/signup">
              <span className="text-black font-medium text-[14px] tracking-[-0.025em]">
                회원가입
              </span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
