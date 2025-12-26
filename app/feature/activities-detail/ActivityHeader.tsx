"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { mockActivityDetail } from "@/app/mocks/activityDetail.mock";

const ActivityHeader = () => {
  const mock = mockActivityDetail;

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
    <>
      {/* 헤더 이미지 */}
      <div className="order-1 lg:col-start-1 lg:row-start-1">
        <div className="flex gap-[8] overflow-hidden rounded-[30] min-w-0">
          <div className="relative flex-1 min-w-0 h-[400]">
            <Image
              src={mock.bannerImageUrl}
              alt={mock.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div
            data-count={mock.subImages.length}
            className="
              min-w-[329] h-[400]
              grid gap-[8]
              grid-cols-2
              data-[count=1]:grid-cols-1
              data-[count=2]:grid-cols-1
              flex-1
            "
          >
            {mock.subImages.map((img, i) => (
              <div key={img.imageUrl ?? i} className="relative h-[196]">
                <Image
                  src={img.imageUrl}
                  alt={`${mock.title}-${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 상세 헤더 + 달력  */}
      <div className="order-2 lg:col-start-2 lg:row-start-1">
        {/* 상세 헤더 */}
        <div className="detail_header">
          <div className="flex items-center justify-between mb-2 relative">
            <p className="text-14-m text-gray-950">{mock.category}</p>
            <button
              className="cursor-pointer p-2"
              onClick={() => setOpenMenu((prev) => !prev)}
            >
              <Image src="/icons/icon_more.svg" width={3.5} height={5} alt="" />
            </button>

            {/* 더보기팝업 */}
            {openMenu && (
              <div
                ref={menuRef}
                className="absolute right-[20] top-0 w-[95] rounded-lg border border-gray-100 bg-white shadow-md overflow-hidden"
              >
                <button
                  onClick={() => onEdit(mock)}
                  className="w-full px-4 py-[18] text-left text-14-m text-gray-950 hover:bg-gray-25"
                >
                  수정하기
                </button>
                <button
                  onClick={() => onDelete(mock.id)}
                  className="w-full px-4 py-[18] text-left text-14-m text-gray-950 hover:bg-gray-25"
                >
                  삭제하기
                </button>
              </div>
            )}
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
      </div>
    </>
  );
};

export default ActivityHeader;
