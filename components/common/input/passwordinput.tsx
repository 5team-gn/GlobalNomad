"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "./Input";

interface PasswordInputProps {
  label?: string;
  className?: string;
  inputClassName?: string;
  helperText?: string;
  error?: string;
}

const PasswordInput = ({
  label,
  className,
  inputClassName,
  helperText,
  error,
}: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`relative ${className ?? ""}`}>
      <Input
        label={label}
        type={visible ? "text" : "password"}
        helperText={helperText}
        error={error}
        inputClassName={`pr-10 ${inputClassName ?? ""}`}
      />

      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
        aria-label={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
      >
        <Image
          src={visible ? "/icon_active_on.svg" : "/icon_active_off.svg"}
          alt=""
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default PasswordInput;
