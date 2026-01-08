import Image from "next/image";
import { Input } from "./Input";
import type { ComponentProps } from "react";

interface SearchInputProps extends ComponentProps<"input"> {
  className?: string;
}

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <Input {...props} className={`pl-10 ${className ?? ""}`} />

      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        <Image src="/icon_search.svg" alt="검색" width={20} height={20} />
      </span>
    </div>
  );
}
