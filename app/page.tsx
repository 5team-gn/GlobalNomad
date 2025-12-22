"use client";

import Input from "@/components/common/input/Input";
import PasswordInput from "@/components/common/input/passwordinput";
import SearchInput from "@/components/common/input/searchinput";

export default function InputTestPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-12 space-y-20">
      <h1 className="text-2xl font-bold">Input 컴포넌트 통합 테스트</h1>

      {/* ========================= */}
      {/* 1️⃣ Width 테스트 */}
      {/* ========================= */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">1️⃣ 가로(width) 테스트</h2>

        <div className="flex gap-10 items-start">
          <div className="w-[240px] bg-white border box-border p-4 space-y-2">
            <p className="text-sm font-medium">240px</p>
            <Input inputClassName="rounded-[16px]" placeholder="240px" />
          </div>

          <div className="w-[400px] bg-white border box-border p-4 space-y-2">
            <p className="text-sm font-medium">400px</p>
            <Input inputClassName="rounded-[16px]" placeholder="400px" />
          </div>

          <div className="w-[640px] bg-white border box-border p-4 space-y-2">
            <p className="text-sm font-medium">640px</p>
            <Input inputClassName="rounded-[16px]" placeholder="640px" />
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* 2️⃣ Height 테스트 */}
      {/* ========================= */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">2️⃣ 높이(height) 테스트</h2>

        <div className="flex gap-10 items-end">
          <div className="bg-white border box-border p-4 space-y-2">
            <p className="text-sm font-medium">40px</p>
            <Input inputClassName="h-[40px] px-3 rounded-[16px]" />
          </div>

          <div className="bg-white border box-border p-4 space-y-2">
            <p className="text-sm font-medium">54px</p>
            <Input inputClassName="h-[54px] px-4 rounded-[16px]" />
          </div>

          <div className="bg-white border box-border p-4 space-y-2">
            <p className="text-sm font-medium">72px</p>
            <Input inputClassName="h-[72px] px-5 text-lg rounded-[16px]" />
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* 3️⃣ SearchInput 테스트 (radius 24px) */}
      {/* ========================= */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">
          3️⃣ SearchInput (border-radius: 24px)
        </h2>

        <div className="bg-white border box-border p-6 w-[1040px] space-y-4">
          <div className="relative">
            <SearchInput
              placeholder="검색어 입력"
              className="w-full"
              inputClassName="h-[70px] pl-10 pr-[120px] rounded-[24px]"
            />

            {/* 오른쪽 버튼 자리 */}
            <button
              type="button"
              className="
                absolute
                right-2
                top-1/2
                -translate-y-1/2
                h-[54px]
                w-[100px]
                rounded-[16px]
                bg-gray-900
                text-white
                text-sm
              "
            >
              검색
            </button>
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* 4️⃣ PasswordInput 테스트 */}
      {/* ========================= */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">
          4️⃣ PasswordInput (border-radius: 16px)
        </h2>

        <div className="bg-white border box-border w-[640px] p-6 space-y-4">
          <PasswordInput
            label="비밀번호"
            helperText="아이콘 클릭 시 표시 / 숨김"
            inputClassName="h-[54px] px-4 rounded-[16px]"
          />
        </div>
      </section>

      {/* ========================= */}
      {/* 5️⃣ 실제 로그인 시안 */}
      {/* ========================= */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">
          5️⃣ 실제 로그인 시안 (640 × 54)
        </h2>

        <div className="bg-white border box-border w-[640px] p-8 space-y-6">
          <Input
            label="이메일"
            placeholder="email@example.com"
            inputClassName="h-[54px] px-4 rounded-[16px]"
          />

          <PasswordInput
            label="비밀번호"
            helperText="아이콘 클릭 시 표시 / 숨김"
            inputClassName="h-[54px] px-4 rounded-[16px]"
          />
        </div>
      </section>
    </main>
  );
}
