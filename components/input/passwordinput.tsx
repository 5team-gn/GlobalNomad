"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "./Input";
import type { ComponentProps } from "react";

export function PasswordInput(props: ComponentProps<"input">) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className="h-[54px] w-full rounded-[16px] border border-gray-200 px-[20px] pr-12"
      />

      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <Image
          src={visible ? "/icon_active_on.svg" : "/icon_active_off.svg"}
          alt={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
