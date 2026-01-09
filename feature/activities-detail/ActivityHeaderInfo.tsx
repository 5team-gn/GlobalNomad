/**
 *
 *
 * @description 액티비티 상세 - 헤더 정보 컴포넌트
 */

"use client";

import { ActivityHeaderInfoType } from "@/types/activities/activity.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { deleteMyActivity } from "./api/deleteMyActivity";
import axios from "axios";
import { AlertModal, BasicModal } from "@/components/modal";

export default function ActivityHeaderInfo({
  activity,
}: {
  activity: ActivityHeaderInfoType;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  //에러 알림 모달
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorText, setErrorText] = useState("삭제에 실패했습니다.");

  //삭제 확인 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();

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

  // 수정하기
  const onEdit = (item: typeof activity) => {
    setOpenMenu(false);
    router.push(`/myinfo/experiences/${item.id}/edit`);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteMyActivity(id),
    onSuccess: () => {
      toast.success("삭제되었습니다.");
      // 내 체험 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["myActivities"] });
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        const message = (e.response?.data as { message: string })?.message;
        setErrorText(message ?? "삭제에 실패했습니다.");
        setIsErrorModalOpen(true);
        // BasicModal({
        //   isOpen: true,
        //   text: "삭제에 실패했습니다.",
        //   onClose: () => {
        //     console.log("모달닫기");
        //   },
        // });
        return;
        /** 
         * 실제 로그인후 내려주는 api에 아래가 없다면 주석 해제 후 활용
         const status = e.response?.status;
         const message =
           (e.response?.data as any)?.message ?? "삭제에 실패했습니다.";

         if (status === 400) return toast.error(message);
         if (status === 401) return toast.error("로그인이 필요합니다.");
         if (status === 403) return toast.error("권한이 없습니다.");
         */
      }
      setErrorText("삭제에 실패했습니다.");
      setIsErrorModalOpen(true);
    },
  });

  // 삭제하기
  const onClickDelete = () => {
    setOpenMenu(false); //메뉴 닫기
    setIsDeleteModalOpen(true); //삭제 확인 모달 열기
  };

  //모달에서 "확인" 누를 때만 실제 삭제 실행
  const onConfirmDelete = () => {
    if (isDeleting) return; //중복 클릭 방지
    deleteMutate(activity.id); //삭제 실행
  };

  return (
    <div className="detail_header relative">
      {/* 에러용 BasicModal */}
      <BasicModal
        isOpen={isErrorModalOpen}
        text={errorText}
        buttonText="확인"
        onClose={() => setIsErrorModalOpen(false)}
      />
      {/* 삭제 확인용 AlertModal */}
      <AlertModal
        isOpen={isDeleteModalOpen}
        text="체험을 삭제하시겠습니까?"
        cancelText="아니오"
        confirmText="네"
        onClose={() => setIsDeleteModalOpen(false)}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={onConfirmDelete}
      />
      <div className="flex items-center justify-between mb-2">
        <p className="text-14-m text-gray-950">{activity.category}</p>

        {/* 케밥메뉴 */}
        {openMenu && (
          <div
            ref={menuRef}
            className="absolute right-[20px] top-0 w-[95px] rounded-lg border border-gray-100 bg-white shadow-md overflow-hidden"
          >
            <button
              onClick={() => onEdit(activity)}
              className="w-full px-4 py-[18px] text-left text-14-m text-gray-950 hover:bg-gray-25 cursor-pointer"
            >
              수정하기
            </button>
            <button
              onClick={() => onClickDelete()}
              className="w-full px-4 py-[18px] text-left text-14-m text-gray-950 hover:bg-gray-25 cursor-pointer"
            >
              삭제하기
            </button>
          </div>
        )}
        <button
          className="cursor-pointer p-2 mr-[-18px]"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <Image src="/icons/icon_more.svg" width={28} height={28} alt="" />
        </button>
      </div>

      <h1 className="text-24-b font-bold text-gray-950">{activity.title}</h1>

      <div className="my-[17px]">
        <div className="flex mb-[10px]">
          <Image
            className="mr-[6px]"
            src="/icons/star.svg"
            width={16}
            height={16}
            alt=""
          />
          <div className="text-14-m text-gray-700">
            {activity.rating} ({activity.reviewCount})
          </div>
        </div>

        <div className="flex">
          <Image
            className="mr-[2px]"
            src="/icons/icon_map.svg"
            width={16}
            height={16}
            alt=""
          />
          <p className="text-14-m text-gray-700">{activity.address}</p>
        </div>
      </div>
    </div>
  );
}
