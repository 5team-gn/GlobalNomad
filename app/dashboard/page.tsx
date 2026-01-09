/* app/dashboard/page.tsx */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

// ✅ 경로는 본인 프로젝트 구조에 맞게 조정하세요.
import BasicModal from "@/components/modal/BasicModal";
import AlertModal from "@/components/modal/AlertModal";

type RouteItem = {
  label: string;
  href: string;
  desc?: string;
};

export default function DashboardPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const routes = useMemo<RouteItem[]>(
    () => [
      { label: "로그인", href: "/login", desc: "(auth)/login" },
      { label: "회원가입", href: "/signup", desc: "(auth)/signup" },

      // 상세는 id가 필요하므로 샘플 id로 접근 (없으면 404일 수 있음)
      {
        label: "액티비티 상세(샘플)",
        href: "/activities/6599",
        desc: "activities/[id]",
      },

      {
        label: "모달 테스트",
        href: "/modal-test",
        desc: "modal-test/page.tsx",
      },

      {
        label: "내 액티비티",
        href: "/myactivities",
        desc: "myactivities/page.tsx",
      },
      {
        label: "내 액티비티 관리",
        href: "/myactivities/management",
        desc: "myactivities/management",
      },
      {
        label: "내 액티비티 등록",
        href: "/myactivities/register",
        desc: "myactivities/register",
      },
      {
        label: "내 액티비티 수정",
        href: "/myactivities/edit",
        desc: "myactivities/edit",
      },

      { label: "내정보", href: "/myinfo", desc: "myinfo/page.tsx" },
      {
        label: "내 체험 목록",
        href: "/myinfo/experiences",
        desc: "myinfo/experiences/page.tsx",
      },
      {
        label: "내 체험 신규",
        href: "/myinfo/experiences/new",
        desc: "myinfo/experiences/new",
      },
      {
        label: "내 체험 수정(샘플)",
        href: "/myinfo/experiences/1/edit",
        desc: "myinfo/experiences/[id]/edit",
      },

      { label: "예약", href: "/reservation", desc: "reservation/page.tsx" },
      { label: "리뷰", href: "/review", desc: "review/page.tsx" },
    ],
    []
  );

  return (
    <main className="mx-auto w-full max-w-[1100px] px-5 py-10">
      {/* 모달들 */}
      <BasicModal
        isOpen={basicOpen}
        text="BasicModal 프리뷰입니다. 확인 버튼만 있는 모달입니다."
        buttonText="확인"
        onClose={() => setBasicOpen(false)}
      />

      <AlertModal
        isOpen={alertOpen}
        text="AlertModal 프리뷰입니다. 취소/확인 버튼이 있는 모달입니다."
        cancelText="아니오"
        confirmText="확인"
        onClose={() => setAlertOpen(false)}
        onCancel={() => setAlertOpen(false)}
        onConfirm={() => {
          // 확인 버튼 눌렀을 때 동작 테스트용
          setAlertOpen(false);
        }}
      />

      {/* 헤더 */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-24-b text-gray-950">Design Preview Dashboard</h1>
        <p className="text-14-m text-gray-600">
          현재 프로젝트의 주요 페이지/컴포넌트 스타일을 한 곳에서 빠르게
          확인하는 대시보드입니다.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            className="rounded-lg bg-gray-900 px-4 py-2 text-white text-14-m hover:opacity-90"
            onClick={() => setBasicOpen(true)}
          >
            BasicModal 열기
          </button>
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 text-white text-14-m hover:opacity-90"
            onClick={() => setAlertOpen(true)}
          >
            AlertModal 열기
          </button>
        </div>
      </header>

      {/* 빠른 이동 */}
      <section className="mb-10">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-16-m text-gray-900">Quick Links</h2>
          <span className="text-12-m text-gray-500">
            각 페이지로 이동해 레이아웃/타이포/컴포넌트 일관성 확인
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-gray-200 hover:shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-14-m text-gray-950">{r.label}</span>
                <span className="text-12-m text-gray-400">→</span>
              </div>
              {r.desc ? (
                <div className="mt-1 text-12-m text-gray-500">{r.desc}</div>
              ) : null}
              <div className="mt-3 text-12-m text-blue-600 underline underline-offset-2">
                {r.href}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* UI 프리뷰: Typography */}
      <section className="mb-10">
        <h2 className="mb-3 text-16-m text-gray-900">Typography</h2>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3">
            <div>
              <div className="text-24-b text-gray-950">
                text-24-b: 제목/헤더
              </div>
              <div className="text-12-m text-gray-500">
                전역 타이포 클래스 확인
              </div>
            </div>
            <div className="text-16-m text-gray-900">text-16-m: 본문 강조</div>
            <div className="text-14-m text-gray-700">
              text-14-m: 일반 본문. 동일한 문장으로 폰트/행간/색상을 확인합니다.
            </div>
            <div className="text-12-m text-gray-500">
              text-12-m: 보조 설명/캡션
            </div>
          </div>
        </div>
      </section>

      {/* UI 프리뷰: Buttons */}
      <section className="mb-10">
        <h2 className="mb-3 text-16-m text-gray-900">Buttons</h2>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white text-14-m hover:opacity-90">
              Primary
            </button>
            <button className="rounded-lg bg-gray-900 px-4 py-2 text-white text-14-m hover:opacity-90">
              Dark
            </button>
            <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-800 text-14-m hover:bg-gray-50">
              Outline
            </button>
            <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 text-14-m hover:bg-gray-200">
              Ghost
            </button>
            <button className="rounded-lg bg-red-500 px-4 py-2 text-white text-14-m hover:opacity-90">
              Destructive
            </button>
            <button
              className="cursor-not-allowed rounded-lg bg-gray-200 px-4 py-2 text-gray-500 text-14-m"
              disabled
            >
              Disabled
            </button>
          </div>
        </div>
      </section>

      {/* UI 프리뷰: Form Controls */}
      <section className="mb-10">
        <h2 className="mb-3 text-16-m text-gray-900">Form Controls</h2>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-12-m text-gray-600">Input</span>
              <input
                className="h-11 rounded-lg border border-gray-200 px-3 text-14-m outline-none focus:border-gray-300"
                placeholder="텍스트 입력"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-12-m text-gray-600">
                Select (기본 HTML)
              </span>
              <select className="h-11 rounded-lg border border-gray-200 px-3 text-14-m outline-none focus:border-gray-300">
                <option>옵션 1</option>
                <option>옵션 2</option>
                <option>옵션 3</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-12-m text-gray-600">Textarea</span>
              <textarea
                className="min-h-[120px] rounded-lg border border-gray-200 p-3 text-14-m outline-none focus:border-gray-300"
                placeholder="여러 줄 입력"
              />
            </label>
          </div>
        </div>
      </section>

      {/* UI 프리뷰: Card */}
      <section className="mb-10">
        <h2 className="mb-3 text-16-m text-gray-900">Cards / List</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-14-m text-gray-950">
                  카드 제목 {idx + 1}
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-1 text-12-m text-gray-600">
                  Badge
                </span>
              </div>
              <p className="text-14-m text-gray-700">
                카드 본문 예시입니다. 간격/그림자/보더/색상 톤을 확인합니다.
              </p>
              <div className="mt-4 flex gap-2">
                <button className="rounded-lg bg-blue-500 px-3 py-2 text-white text-12-m hover:opacity-90">
                  Action
                </button>
                <button className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 text-12-m hover:bg-gray-50">
                  Secondary
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-100 pt-6 text-12-m text-gray-500">
        <div>Dashboard 경로: /dashboard</div>
      </footer>
    </main>
  );
}
