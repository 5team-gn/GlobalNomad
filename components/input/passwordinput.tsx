"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "./Input";
import type { ComponentProps } from "react";

interface PasswordInputProps extends Omit<ComponentProps<"input">, "type"> {
  className?: string;
}

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={`pr-10 ${className ?? ""}`}
      />

      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
<<<<<<< HEAD
        className="absolute right-4 top-1/2 -translate-y-1/2 
             outline-none focus:outline-none"
      >
        <Image
          src={visible ? "/icon_eye_on.svg" : "/icon_eye.svg"}
          alt=""
          width={24}
          height={24}
=======
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <Image
          src={visible ? "/icon_active_on.svg" : "/icon_active_off.svg"}
          alt={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
          width={20}
          height={20}
>>>>>>> origin/main
        />
      </button>
    </div>
  );
}
