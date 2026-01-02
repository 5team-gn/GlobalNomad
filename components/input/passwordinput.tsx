"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "./Input";
import type { ComponentProps } from "react";
import clsx from "clsx";

type PasswordInputProps = ComponentProps<typeof Input>;

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={clsx("pr-12", className)}
      />

      <button
        type="button"
        aria-label={visible ? "비밀번호 숨기기" : "비밀번호 표시"}
        aria-pressed={visible}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <Image
          src={visible ? "/icon_active_on.svg" : "/icon_active_off.svg"}
          alt={visible ? "비밀번호 숨기기 아이콘" : "비밀번호 보기 아이콘"}
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
