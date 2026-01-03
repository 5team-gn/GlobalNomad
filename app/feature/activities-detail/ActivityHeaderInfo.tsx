/**
 *
 *
 * @description 액티비티 상세 - 헤더 정보 컴포넌트
 */

"use client";

import { ActivityHeaderInfoMock } from "@/types/activities/activity.types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ActivityHeaderInfo({
  mock,
}: {
  mock: ActivityHeaderInfoMock;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 케밥 메뉴 외부 클릭 시 닫기
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    }
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  const onEdit = (item: typeof mock) => {
    // 수정하기 로직 구현
    console.log("수정하기:", item);
    setOpenMenu(false);
  };

  const onDelete = (id: number) => {
    // 삭제하기 로직 구현
    console.log("삭제하기:", id);
    setOpenMenu(false);
  };
  return (
    <div className="detail_header relative">
      <div className="flex items-center justify-between mb-2">
        <p className="text-14-m text-gray-950">{mock.category}</p>

        {/* 케밥메뉴 */}
        {openMenu && (
          <div
            ref={menuRef}
            className="absolute right-[20] top-0 w-[95] rounded-lg border border-gray-100 bg-white shadow-md overflow-hidden"
          >
            <button
              onClick={() => onEdit(mock)}
              className="w-full px-4 py-[18] text-left text-14-m text-gray-950 hover:bg-gray-25 cursor-pointer"
            >
              수정하기
            </button>
            <button
              onClick={() => onDelete(mock.id)}
              className="w-full px-4 py-[18] text-left text-14-m text-gray-950 hover:bg-gray-25 cursor-pointer"
            >
              삭제하기
            </button>
          </div>
        )}
        <button
          className="cursor-pointer p-2"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <Image src="/icons/icon_more.svg" width={3.5} height={5} alt="" />
        </button>
      </div>

      <h1 className="text-24-b font-bold text-gray-950">{mock.title}</h1>

      <div className="my-[17]">
        <div className="flex mb-[10]">
          <Image
            className="mr-[6]"
            src="/icons/star.svg"
            width={16}
            height={16}
            alt=""
          />
          <div className="text-14-m text-gray-700">
            {mock.rating} ({mock.reviewCount})
          </div>
        </div>

        <div className="flex">
          <Image
            className="mr-[2]"
            src="/icons/icon_map.svg"
            width={16}
            height={16}
            alt=""
          />
          <p className="text-14- text-gray-700">{mock.address}</p>
        </div>
      </div>
    </div>
  );
}
