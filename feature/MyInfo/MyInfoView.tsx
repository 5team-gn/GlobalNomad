"use client";

import { Button } from "@/components/button/Button";
import { InputField } from "@/components/input/inputfield";
import { PasswordInput } from "@/components/input/passwordinput";

const BASE_INPUT_CLASS =
  "h-[54px] w-full rounded-[16px] border border-gray-100 px-[20px] text-sm text-gray-950 outline-none focus:border-[var(--color-primary-500)] focus:outline-none";

export default function MyInfoView() {
  return (
    <div className="flex justify-center  font-pretendard">
      <div className="w-[640px] rounded-xl bg-white">
        {/* 타이틀 */}
        <div className="mb-[24px]">
          <h2 className="pt-[10px] text-18-b tracking-[-0.45px]">내 정보</h2>
          <p className="mt-[4px] text-14-m text-gray-500">
            닉네임과 비밀번호를 수정하실 수 있습니다.
          </p>
        </div>

        {/* Input 영역 */}
        <div className="space-y-[24px]">
          {/* 닉네임 */}
          <InputField label="닉네임">
            <input
              type="text"
              placeholder="닉네임을 입력해주세요"
              className={BASE_INPUT_CLASS}
            />
          </InputField>

          {/* 이메일 (수정 불가) */}
          <InputField label="이메일" helperText="이메일은 수정할 수 없습니다.">
            <input
              type="email"
              value="codeit@codeit.com"
              disabled
              className={`${BASE_INPUT_CLASS} bg-gray-50 text-gray-400 cursor-not-allowed`}
            />
          </InputField>

          {/* 비밀번호 */}
          <InputField label="비밀번호">
            <PasswordInput
              placeholder="8자 이상 입력해 주세요"
              className={BASE_INPUT_CLASS}
            />
          </InputField>

          {/* 비밀번호 확인 */}
          <InputField label="비밀번호 확인">
            <PasswordInput
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              className={BASE_INPUT_CLASS}
            />
          </InputField>

          {/* 저장 버튼 */}
          <div className="mt-[32px] flex justify-center ">
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="h-[41px] rounded-[12px] px-10 py-3 w-[120px]"
            >
              <span className="text-14-b whitespace-nowrap">저장하기</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
