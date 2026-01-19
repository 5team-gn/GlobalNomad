"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

import { InputField } from "@/components/input/inputfield";
import { PasswordInput } from "@/components/input/passwordinput";
import { Button } from "@/components/button/Button";
import { signup } from "@/lib/api/auth";
import type { SignupRequest } from "@/types/auth/auth.types";

/**
 * 회원가입 폼 데이터 타입 정의
 * 비밀번호 확인 필드 추가
 */
interface SignupFormValues extends SignupRequest {
  passwordConfirm: string;
}

type ErrorResponse = {
  message?: string;
};

/**
 * 회원가입 페이지 컴포넌트
 */
export default function SignupPage() {
  const router = useRouter();

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    mode: "onBlur",
  });

  // 비밀번호 확인을 위해 비밀번호 값 실시간 감지
  const password = watch("password");

  /**
   * 회원가입 폼 제출 핸들러
   * @param data 회원가입 데이터
   */
  const onSubmit = async (data: SignupFormValues) => {
    try {
      // passwordConfirm 필드는 API 요청에 포함하지 않음
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordConfirm, ...signupData } = data;

      await signup(signupData);

      toast.success("회원가입이 완료되었습니다.");
      router.push("/login");
    } catch (err: unknown) {
      console.error(err);

      const axiosErr = err as AxiosError<ErrorResponse>;
      const message = axiosErr.response?.data?.message;

      toast.error(message ?? "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      {/* 로고 영역 - 클릭 시 메인으로 이동 */}
      <div className="mb-[30px]">
        <Link href="/">
          <Image
            src="/loginLogo.svg"
            alt="GlobalNomad"
            width={160}
            height={90}
            priority
          />
        </Link>
      </div>

      {/* 회원가입 폼 컨테이너 */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[540px] flex flex-col gap-[20px]"
      >
        {/* 이메일 입력 필드 */}
        <InputField
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          error={errors.email?.message}
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
        />

        {/* 닉네임 입력 필드 */}
        <InputField
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해주세요"
          error={errors.nickname?.message}
          {...register("nickname", {
            required: "닉네임을 입력해주세요.",
            maxLength: {
              value: 10,
              message: "닉네임은 10자 이내로 입력해주세요.",
            },
          })}
        />

        {/* 비밀번호 입력 필드: InputField로 감싸서 error 처리 */}
        <InputField label="비밀번호" error={errors.password?.message}>
          <PasswordInput
            placeholder="비밀번호를 입력해주세요"
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "8자 이상 입력해주세요.",
              },
            })}
          />
        </InputField>

        {/* 비밀번호 확인 입력 필드: InputField로 감싸서 error 처리 */}
        <InputField
          label="비밀번호 확인"
          error={errors.passwordConfirm?.message}
        >
          <PasswordInput
            placeholder="비밀번호를 한번 더 입력해주세요"
            {...register("passwordConfirm", {
              required: "비밀번호 확인을 입력해주세요.",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다.",
            })}
          />
        </InputField>

        {/* 회원가입 버튼 */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full h-[48px] text-[15px] font-bold mt-[4px] rounded-[16px]"
        >
          회원가입 하기
        </Button>

        {/* 소셜 회원가입 구분선 및 버튼 */}
        <div className="mt-[4px] w-full">
          <div className="relative mb-[20px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <span className="relative bg-white px-[16px] text-gray-500 text-[14px]">
              SNS 계정으로 회원가입하기
            </span>
          </div>

          <div className="flex justify-center">
            {/* 카카오 회원가입 버튼 (디자인만 구현됨) */}
            <button
              type="button"
              className="flex h-[48px] w-full items-center justify-center gap-[12px] rounded-[16px] bg-[#FEE500] text-[15px] font-medium text-[#191919] transition-colors hover:bg-[#FDD835]"
              aria-label="Kakao 회원가입"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 4C7.58172 4 4 6.98528 4 10.6667C4 12.9933 5.48528 15.0447 7.74773 16.2307L6.81818 19.6364L10.5184 17.1751C10.9996 17.2831 11.4939 17.3333 12 17.3333C16.4183 17.3333 20 14.3481 20 10.6667C20 6.98528 16.4183 4 12 4Z"
                  fill="#191919"
                />
              </svg>
              <span>카카오로 시작하기</span>
            </button>
          </div>
        </div>

        {/* 로그인 페이지 링크 */}
        <div className="flex justify-center gap-[8px] mt-[4px]">
          <span className="text-gray-800 text-[15px]">회원이신가요?</span>
          <Link
            href="/login"
            className="text-primary-500 underline text-[15px]"
          >
            로그인 하기
          </Link>
        </div>
      </form>
    </div>
  );
}
