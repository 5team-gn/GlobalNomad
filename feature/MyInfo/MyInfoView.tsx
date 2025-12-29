"use client";

export default function MyInfoView() {
  return (
    <div className="flex justify-center bg-[var(--color-gray-25)] font-pretendard">
      <div className="w-[640px] rounded-xl bg-white pl-[50px]">
        {/* 타이틀 */}
        <div className="mb-[24px]">
          <h2 className="pt-[10px] text-[var(--text-18-b)] font-[var(--text-18-b--font-weight)] text-[var(--color-gray-950)] tracking-[-0.45px]">
            내 정보
          </h2>
          <p className="mt-[4px] font-[var(--text-14-m--font-weight)] text-[var(--color-gray-500)]">
            닉네임과 비밀번호를 수정하실 수 있습니다.
          </p>
        </div>

        {/* Input 영역 */}
        <div className="space-y-[24px]">
          {/* TODO: 공통 Input 컴포넌트 적용 예정 */}
          <InputField label="닉네임" placeholder="닉네임을 입력해주세요" />

          {/* TODO: 공통 Input 컴포넌트 적용 예정 */}
          <InputField label="이메일" placeholder="codeit@codeit.com" />

          {/* TODO: 공통 Input + PasswordInput 적용 예정 */}
          <InputField
            label="비밀번호"
            type="password"
            placeholder="8자 이상 입력해 주세요"
          />

          {/* TODO: 공통 Input + PasswordInput 적용 예정 */}
          <InputField
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
          />

          <div className="mt-[32px] flex justify-center">
            {/* TODO: 공통 Button 컴포넌트로 교체 예정 */}
            <button
              type="button"
              className="rounded-[12px] bg-[var(--color-primary-500)] px-10 py-3 text-[var(--text-14-m)] font-[var(--text-14-m--font-weight)] text-white hover:opacity-90"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- */
/* Input Field Component */
/* -------------------- */

/**
 * TODO:
 * - 공통 Input 컴포넌트 병합 시 제거 예정
 * - 현재는 UI 확인을 위한 임시 구현
 */
type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
};

function InputField({ label, type = "text", placeholder }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-[10px]">
      <label className="text-[var(--text-16-m)] font-[var(--text-16-m--font-weight)] text-[var(--color-gray-950)] tracking-[-0.4px]">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="h-[54px] w-[640px] rounded-[16px] border border-[var(--color-gray-200)] px-[20px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-500)]"
      />
    </div>
  );
}
