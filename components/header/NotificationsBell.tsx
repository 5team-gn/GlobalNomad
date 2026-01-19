/*
 ** 헤더 내 알림 벨 컴포넌트
 *
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useNotifications } from "@/hooks/useNotifications";
import { inferNotiType, getNotiTitle, timeAgo } from "@/utils/notification";

export default function NotificationsBell() {
  const [open, setOpen] = useState(false);

  // 드롭다운 외부 클릭 감지용
  const wrapRef = useRef<HTMLDivElement>(null);

  // 무한 스크롤 root(드롭다운 내부 스크롤 영역)
  const listRef = useRef<HTMLDivElement>(null);

  // 무한 스크롤 트리거(바닥 감지용 sentinel)
  const sentinelRef = useRef<HTMLDivElement>(null);

  // 한 번에 가져올 알림 개수
  const PAGE_SIZE = 3;

  // 데이터 로직은 훅으로 분리
  const {
    loading,
    totalCount,
    items,
    cursorId,
    hasNotifications,
    fetchNotifications,
    resetAndRefetch,
    deleteNotification,
  } = useNotifications(PAGE_SIZE);

  // 벨 아이콘 상태(알림 없음 / 알림 있음 / 열림)
  const iconSrc = useMemo(() => {
    if (!hasNotifications) return "/icons/icon_bell_on.svg";
    if (open) return "/icons/icon_bell_act.svg";
    return "/icons/icon_bell_on.svg";
  }, [hasNotifications, open]);

  // 최초 1회: 알림 존재 여부 판단을 위해 기본 조회
  useEffect(() => {
    fetchNotifications(null, "replace");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // 무한 스크롤: sentinel이 보이면 다음 페이지 요청
  useEffect(() => {
    if (!open) return;
    if (!sentinelRef.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        if (cursorId === null) return; // 더 이상 페이지 없음
        if (loading) return;

        fetchNotifications(cursorId, "append");
      },
      {
        // 드롭다운 내부에서만 스크롤 감지
        root: listRef.current,
        // 바닥에 닿기 조금 전 미리 로드
        rootMargin: "120px",
        threshold: 0,
      }
    );

    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [open, cursorId, loading, fetchNotifications]);

  // 벨 클릭: 열 때는 목록을 최신 상태로 갱신
  const onClickBell = async () => {
    if (!hasNotifications) return;

    const nextOpen = !open;
    setOpen(nextOpen);

    if (nextOpen) {
      await resetAndRefetch();
    }
  };

  return (
    <div className="relative flex" ref={wrapRef}>
      <button
        type="button"
        aria-label="알림"
        onClick={onClickBell}
        disabled={!hasNotifications}
        className={!hasNotifications ? "opacity-60" : "cursor-pointer"}
      >
        <Image src={iconSrc} alt="알림" width={24} height={24} />
      </button>

      {open && hasNotifications && (
        <div className="absolute right-0 top-full mt-2 w-[231px] max-w-[231px] bg-white rounded-[12px] z-50 shadow-[0_0_24px_0_rgba(120,116,134,0.22)] flex flex-col overflow-hidden">
          {/* 헤더 */}
          <div className="flex items-center justify-between px-4 h-[48px] bg-white">
            <div className="text-16-b">알림 {totalCount}개</div>
            <button
              type="button"
              aria-label="닫기"
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <Image
                src="/icons/icon_close.svg"
                alt="닫기"
                width={24}
                height={24}
              />
            </button>
            {/* </div> */}
          </div>

          {/* 리스트 */}
          <div ref={listRef} className="max-h-[326px] flex-1 overflow-auto">
            {items.map((n, idx) => {
              const type = inferNotiType(n.content);

              // 승인/거절 시안 스타일 반영
              const rowBg = type === "APPROVED" ? "bg-primary-100" : "bg-white";

              // 강조 단어 설정
              const highlight =
                type === "APPROVED"
                  ? { word: "승인", cls: "text-primary-500 font-semibold" }
                  : type === "REJECTED"
                  ? { word: "거절", cls: "text-red-500 font-semibold" }
                  : null;

              //가운데단어만 색상 강조 렌더링
              const renderContent = () => {
                if (!highlight) return n.content;

                const idx = n.content.indexOf(highlight.word);
                if (idx < 0) return n.content;

                const before = n.content.slice(0, idx);
                const mid = highlight.word;
                const after = n.content.slice(idx + mid.length);

                return (
                  <>
                    {before}
                    <span className={highlight.cls}>{mid}</span>
                    {after}
                  </>
                );
              };

              return (
                <div
                  key={n.id}
                  className={[
                    "px-4 py-5 ",
                    idx === 0 ? "border-t border-gray-100" : "",
                    rowBg,
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className={`text-14-b `}>{getNotiTitle(type)}</div>
                        <div className="text-[11px] text-gray-400 whitespace-nowrap">
                          {timeAgo(n.createdAt)}
                        </div>
                      </div>

                      <div className="mt-1 text-14-body-m  text-gray-700 break-words">
                        {renderContent()}
                      </div>
                    </div>

                    {/* 개별 삭제 */}
                    <button
                      type="button"
                      aria-label="알림 삭제"
                      onClick={() => deleteNotification(n.id)}
                      className="shrink-0 text-gray-400 mt-[-4px] mr-[-2px] hover:text-gray-700 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}

            {/* 다음 페이지가 있을 때만 sentinel 렌더 */}
            {cursorId !== null && (
              <div
                ref={sentinelRef}
                className="py-2 text-center text-[11px] text-gray-400"
              >
                {loading ? "불러오는 중..." : " "}
              </div>
            )}

            {/* 마지막 페이지 안내 */}
            {cursorId === null && items.length > 0 && (
              <div className="py-2 text-center text-[11px] text-gray-400">
                마지막 알림입니다.
              </div>
            )}
          </div>
          {/* 푸터 */}
          <div className="h-[30px] bg-white border-t border-gray-100" />
        </div>
      )}
    </div>
  );
}
