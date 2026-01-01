// app/input-test/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/input/Input";
import { InputField } from "@/components/input/inputfield";
import { PasswordInput } from "@/components/input/passwordinput";
import { SearchInput } from "@/components/input/searchinput";

export default function InputTestPage() {
  return (
    <div className="p-10 space-y-12 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Input Component Test</h1>

      {/* Basic Input */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">1. Basic Input</h2>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">기본 (자동 크기)</p>
          <Input placeholder="기본 인풋" className="w-full" />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">작은 크기 (200px)</p>
          <Input placeholder="작은 인풋" className="w-[200px]" />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">비활성화 상태</p>
          <Input placeholder="비활성화" disabled className="w-full" />
        </div>
      </section>

      {/* Border Test */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">2. Border & Size Test</h2>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">기본 테두리 (border)</p>
          <Input placeholder="기본 border" className="w-full" />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            커스텀 테두리 (border-2 border-blue-500)
          </p>
          <Input
            placeholder="파란색 두꺼운 테두리"
            className="w-full border-2 border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">빨간 테두리 (border-red-500)</p>
          <Input placeholder="에러 스타일" className="w-full border-red-500" />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">테두리 없음 (border-0)</p>
          <Input
            placeholder="테두리 없음"
            className="w-full border-0 bg-gray-100"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            로그인 시안 크기 (640px × 54px)
          </p>
          <Input
            placeholder="640 × 54 크기 테스트"
            className="w-[640px] h-[54px]"
          />
          <p className="text-xs text-gray-500">
            실제 크기: 640px width, 54px height
          </p>
        </div>
      </section>

      {/* InputField */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">3. InputField</h2>

        <InputField label="이메일" helperText="이메일 형식으로 입력해주세요">
          <Input placeholder="example@email.com" className="w-full" />
        </InputField>

        <InputField label="에러 상태" error="필수 입력 항목입니다">
          <Input placeholder="에러 테스트" className="w-full border-red-500" />
        </InputField>

        <InputField label="일반 텍스트" helperText="도움말 텍스트입니다">
          <Input placeholder="텍스트 입력" className="w-full" />
        </InputField>
      </section>

      {/* Password */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          4. Password Input (with Border Test)
        </h2>

        <InputField label="비밀번호" helperText="8자 이상 입력해주세요">
          <PasswordInput
            placeholder="비밀번호를 입력하세요"
            className="w-full"
          />
        </InputField>

        <InputField label="비밀번호 확인" error="비밀번호가 일치하지 않습니다">
          <PasswordInput
            placeholder="비밀번호 확인"
            className="w-full border-red-500"
          />
        </InputField>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            로그인 시안 크기 (640px × 54px)
          </p>
          <PasswordInput
            placeholder="640 × 54 크기 테스트"
            className="w-[640px] h-[54px]"
          />
        </div>
      </section>

      {/* Search */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">5. Search Input</h2>
        <SearchInput placeholder="검색어를 입력하세요" className="w-full" />
        <SearchInput placeholder="작은 검색창" className="w-[300px]" />

        <div className="space-y-2">
          <p className="text-sm text-gray-600">커스텀 테두리 검색창</p>
          <SearchInput
            placeholder="파란 테두리 검색"
            className="w-full border-2 border-blue-500"
          />
        </div>
      </section>

      {/* Combination Test */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">6. 조합 테스트</h2>

        <div className="grid grid-cols-2 gap-4">
          <InputField label="이름">
            <Input placeholder="홍길동" className="w-full" />
          </InputField>

          <InputField label="전화번호">
            <Input placeholder="010-1234-5678" className="w-full" />
          </InputField>
        </div>

        <InputField label="주소 검색">
          <SearchInput placeholder="주소를 검색하세요" className="w-full" />
        </InputField>
      </section>

      {/* Login Example - 눈 아이콘 위치 조정됨 */}
      <section className="space-y-6 border-t pt-10">
        <h2 className="text-lg font-semibold">
          7. 로그인 화면 예시 (640px × 54px 실제 크기 적용)
        </h2>

        <LoginForm />
      </section>

      {/* Signup Example - 눈 아이콘 위치 조정됨 */}
      <section className="space-y-6 border-t pt-10">
        <h2 className="text-lg font-semibold">
          8. 회원가입 화면 예시 (640px × 54px 실제 크기 적용)
        </h2>

        <SignupForm />
      </section>
    </div>
  );
}

// Password Input Test 컴포넌트 (섹션 4용)
function PasswordInputTest() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative" style={{ width: "640px" }}>
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="640 × 54 크기 테스트"
        className="w-full h-[54px] pl-4 pr-14 text-base box-border"
      />
      <button
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
        onClick={() => setShowPassword(!showPassword)}
      >
        <Image
          src={showPassword ? "/icon_active_on.svg" : "/icon_active_off.svg"}
          alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}

// 로그인 폼 컴포넌트
function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[680px] mx-auto space-y-6 border p-8 rounded-lg bg-white shadow-sm">
      <h3 className="text-xl font-bold mb-2">로그인</h3>

      <div className="space-y-6">
        <InputField label="이메일" helperText="가입하신 이메일을 입력하세요">
          <Input
            type="email"
            placeholder="example@email.com"
            className="h-[54px] text-base px-4 box-border rounded-2xl"
            style={{ width: "640px" }}
          />
        </InputField>

        <InputField label="비밀번호" helperText="8자 이상 입력해주세요">
          <div className="relative" style={{ width: "640px" }}>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              className="w-full h-[54px] pl-4 pr-14 text-base box-border rounded-2xl"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Image
                src={
                  showPassword ? "/icon_active_on.svg" : "/icon_active_off.svg"
                }
                alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                width={20}
                height={20}
              />
            </button>
          </div>
        </InputField>
      </div>

      <div
        className="flex items-center justify-between text-sm"
        style={{ width: "640px" }}
      >
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded w-4 h-4" />
          <span>로그인 상태 유지</span>
        </label>
        <button className="text-blue-600 hover:underline">비밀번호 찾기</button>
      </div>

      <button
        className="bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-base font-medium"
        style={{ width: "640px", height: "54px" }}
      >
        로그인
      </button>

      <div
        className="text-center text-sm text-gray-600 pt-2"
        style={{ width: "640px" }}
      >
        계정이 없으신가요?{" "}
        <button className="text-blue-600 hover:underline font-medium">
          회원가입
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded text-sm text-gray-700">
        <p className="font-medium mb-2">✓ 크기 및 위치 확인:</p>
        <ul className="space-y-1 ml-4">
          <li>• Input 실제 크기: 640px × 54px (box-border 적용)</li>
          <li>• Button 실제 크기: 640px × 54px (inline style로 강제 적용)</li>
          <li>• 눈 아이콘: right-4 위치, 수직 중앙 정렬</li>
          <li>• Input padding: pl-4, pr-14 (눈 아이콘 공간 확보)</li>
          <li>• SVG 아이콘 사용: icon_active_on.svg / icon_active_off.svg</li>
        </ul>
      </div>
    </div>
  );
}

// 회원가입 폼 컴포넌트
function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <div className="w-full max-w-[680px] mx-auto space-y-6 border p-8 rounded-lg bg-white shadow-sm">
      <h3 className="text-xl font-bold mb-2">회원가입</h3>

      <div className="space-y-6">
        <InputField label="이메일" error="이미 사용 중인 이메일입니다">
          <Input
            type="email"
            placeholder="example@email.com"
            className="h-[54px] border-red-500 text-base px-4 box-border"
            style={{ width: "640px" }}
          />
        </InputField>

        <InputField
          label="비밀번호"
          helperText="영문, 숫자, 특수문자 포함 8자 이상"
        >
          <div className="relative" style={{ width: "640px" }}>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              className="w-full h-[54px] pl-4 pr-14 text-base box-border"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Image
                src={
                  showPassword ? "/icon_active_on.svg" : "/icon_active_off.svg"
                }
                alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                width={20}
                height={20}
              />
            </button>
          </div>
        </InputField>

        <InputField label="비밀번호 확인">
          <div className="relative" style={{ width: "640px" }}>
            <Input
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="비밀번호 확인"
              className="w-full h-[54px] pl-4 pr-14 text-base box-border rounded-2xl"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            >
              <Image
                src={
                  showPasswordConfirm
                    ? "/icon_active_on.svg"
                    : "/icon_active_off.svg"
                }
                alt={showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 보기"}
                width={20}
                height={20}
              />
            </button>
          </div>
        </InputField>

        <InputField label="이름">
          <Input
            placeholder="홍길동"
            className="h-[54px] text-base px-4 box-border"
            style={{ width: "640px" }}
          />
        </InputField>

        <InputField label="전화번호" helperText="'-' 없이 숫자만 입력">
          <Input
            type="tel"
            placeholder="01012345678"
            className="h-[54px] text-base px-4 box-border"
            style={{ width: "640px" }}
          />
        </InputField>
      </div>

      <button
        className="bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-base font-medium"
        style={{ width: "640px", height: "54px" }}
      >
        가입하기
      </button>

      <div className="mt-6 p-4 bg-blue-50 rounded text-sm text-gray-700">
        <p className="font-medium mb-2">✓ 크기 및 상태 확인:</p>
        <ul className="space-y-1 ml-4">
          <li>• 모든 Input 실제 크기: 640px × 54px (box-border 적용)</li>
          <li>• Button 실제 크기: 640px × 54px (inline style로 강제 적용)</li>
          <li>• 에러 상태 테두리: border-red-500 적용</li>
          <li>• 눈 아이콘: right-4 위치, 54px 높이 기준 수직 중앙 정렬</li>
          <li>• 텍스트 크기: text-base (16px) 적용</li>
          <li>• SVG 아이콘 사용: icon_active_on.svg / icon_active_off.svg</li>
        </ul>
      </div>
    </div>
  );
}
