"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";
import { Input } from "./Input";

type PasswordInputProps = ComponentPropsWithRef<typeof Input>;

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
        className="absolute right-4 top-1/2 -translate-y-1/2 
             outline-none focus:outline-none"
      >
        <Image
          src={visible ? "/icon_eye_on.svg" : "/icon_eye.svg"}
          alt=""
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
