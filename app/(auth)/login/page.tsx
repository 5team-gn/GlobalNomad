"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { InputField } from "@/components/input/inputfield";
import { PasswordInput } from "@/components/input/passwordinput";
import { Button } from "@/components/button/Button";
import { login } from "@/lib/api/auth";
import type { LoginRequest } from "@/types/auth/auth.types";
import { useContext } from "react";
import { AuthContext } from "@/app/AuthProvider";

/**
 * 로그인 페이지 컴포넌트
 */
export default function LoginPage() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    mode: "onBlur", // 포커스 아웃 시 유효성 검사
  });

  /**
   * 로그인 폼 제출 핸들러
   * @param data 로그인 데이터 (이메일, 비밀번호)
   */
  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await login(data);
      // 토큰 저장 (localStorage)
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", String(response.user.id));

      toast.success("로그인에 성공했습니다.");
      await auth?.refreshUser();
      // 메인 페이지로 이동
      router.replace("/");
      // router.push("/");
    } catch (error: any) {
      console.error(error);
      // 서버 에러 메시지가 있으면 표시, 없으면 기본 에러 메시지
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("로그인 중 오류가 발생했습니다.");
      }
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

      {/* 로그인 폼 컨테이너 */}
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

        {/* 비밀번호 입력 필드 */}
        <div className="flex flex-col gap-[10px]">
          <label className="text-[16px] font-medium text-gray-900">
            비밀번호
          </label>
          <PasswordInput
            placeholder="비밀번호를 입력해주세요"
            error={errors.password?.message}
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "8자 이상 입력해주세요.",
              },
            })}
          />
        </div>

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting} // 제출 중일 때 비활성화
          className="w-full h-[48px] text-[15px] font-bold mt-[4px] rounded-[16px]"
        >
          로그인 하기
        </Button>

        {/* 소셜 로그인 구분선 및 버튼 */}
        <div className="mt-[4px] w-full">
          <div className="relative mb-[20px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <span className="relative bg-white px-[16px] text-gray-500 text-[14px]">
              OR
            </span>
          </div>

          <div className="flex justify-center">
            {/* 카카오 로그인 버튼 (디자인만 구현됨) */}
            <button
              type="button"
              className="flex h-[48px] w-full items-center justify-center gap-[12px] rounded-[16px] bg-[#FEE500] text-[15px] font-medium text-[#191919] transition-colors hover:bg-[#FDD835]"
              aria-label="Kakao 로그인"
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
              <span>카카오 로그인</span>
            </button>
          </div>
        </div>

        {/* 회원가입 페이지 링크 */}
        <div className="flex justify-center gap-[8px] mt-[4px]">
          <span className="text-gray-800 text-[15px]">회원이 아니신가요?</span>
          <Link
            href="/signup"
            className="text-primary-500 underline text-[15px]"
          >
            회원가입 하기
          </Link>
        </div>
      </form>
    </div>
  );
}
