import Image from "next/image";
import { Input } from "./Input";
import type { ComponentProps } from "react";
import clsx from "clsx";

export function SearchInput({
  className,
  ...props
}: ComponentProps<typeof Input>) {
  return (
    <div className="relative w-full">
      <Input {...props} className={clsx("pl-[44px]", className)} />
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
        <Image src="/icon_search.svg" alt="검색" width={20} height={20} />
      </span>
    </div>
  );
}
