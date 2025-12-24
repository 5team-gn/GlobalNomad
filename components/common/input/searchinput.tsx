"use client";

import Image from "next/image";
import Input from "./Input";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

const SearchInput = ({
  placeholder = "검색어를 입력하세요",
  className,
  inputClassName,
}: SearchInputProps) => {
  return (
    <div className={`relative ${className ?? ""}`}>
      <Input
        placeholder={placeholder}
        inputClassName={`pl-10 ${inputClassName ?? ""}`}
      />

      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        <Image src="/icon_search.svg" alt="검색" width={20} height={20} />
      </span>
    </div>
  );
};

export default SearchInput;
