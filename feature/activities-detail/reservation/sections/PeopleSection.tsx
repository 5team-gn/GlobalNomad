/**
 *
 *
 * @description 액티비티 상세 - 인원 선택 섹션
 */
"use client";

import Image from "next/image";

type Props = {
  label?: string;
  labelClassName?: string;
  people: number;
  onInc: () => void;
  onDec: () => void;
  disabled?: boolean;
  labelText?: string;
  wrapperClassName: string;
};

export default function PeopleSection({
  label,
  labelClassName,
  people,
  onInc,
  onDec,
  disabled,
  labelText,
  wrapperClassName,
}: Props) {
  return (
    <>
      {labelText ? <p className={labelClassName}>{labelText}</p> : null}
      <div className={wrapperClassName}>
        <button
          type="button"
          onClick={onDec}
          disabled={disabled}
          className="h-10 w-10 rounded-lg flex items-center justify-center cursor-pointer"
          aria-label="인원 감소"
        >
          <Image src="/icons/icon_minus.svg" alt="" width={20} height={20} />
        </button>
        <div className="text-14-b text-gray-950">{people}</div>
        <button
          type="button"
          onClick={onInc}
          disabled={disabled}
          className="h-10 w-10 rounded-lg flex items-center justify-center cursor-pointer"
          aria-label="인원 증가"
        >
          <Image src="/icons/icon_plus.svg" alt="" width={20} height={20} />
        </button>
      </div>
    </>
  );
}
