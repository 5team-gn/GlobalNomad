"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProfileDropdownProps {
  onLogout: () => void;
}

export default function ProfileDropdown({ onLogout }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 외부 클릭 감지하여 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      
      <div className="absolute right-0 top-[10px] w-[160px] bg-white rounded-[12px] shadow-lg border border-gray-200 py-2 z-50">
        <Link
          href="/myinfo"
          className="block px-4 py-3 text-[14px] text-gray-900 hover:bg-gray-50 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          마이페이지
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 text-[14px] text-gray-900 hover:bg-gray-50 transition-colors"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
