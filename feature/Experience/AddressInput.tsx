"use client";

import { useState } from "react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { Input } from "@/components/input/Input";

interface Props {
  value: string;
  onChange: (address: string) => void;
  error?: string;
}

export function AddressInput({ value, onChange, error }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data: Address) => {
    // 도로명 주소 또는 지번 주소 중 선택
    onChange(data.address);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input 
          value={value} 
          readOnly 
          placeholder="주소를 검색해 주세요" 
          className="bg-gray-50 flex-1"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-5 py-3 bg-gray-900 text-white rounded-xl text-sm whitespace-nowrap"
        >
          주소 찾기
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-lg bg-white p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">주소 검색</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-500">닫기</button>
            </div>
            <DaumPostcodeEmbed onComplete={handleComplete} />
          </div>
        </div>
      )}
    </div>
  );
}