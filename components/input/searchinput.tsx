import Image from "next/image";
import { Input } from "./Input";
import type { ComponentProps } from "react";

export function SearchInput(props: ComponentProps<"input">) {
  return (
    <div className="relative w-full">
      <Input {...props} className="pl-[44px]" />

      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
        <Image src="/icon_search.svg" alt="검색" width={20} height={20} />
      </span>
    </div>
  );
}
