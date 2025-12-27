"use client";

import { useRef, useState } from "react";
import EyeIcon from "@/public/icon_eye.svg";

interface ProductImageInputProps {
  onImageUpload?: (files: File[]) => void;
  currentCount: number;
  maxCount?: number;
}

export default function ProductImageInput({
  onImageUpload,
  currentCount,
  maxCount = 4,
}: ProductImageInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const isMax = currentCount >= maxCount;
  const remainCount = maxCount - currentCount;

  const handleFiles = (files: FileList | null) => {
    if (!files || isMax) return;

    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) return;

    const uploadableFiles = imageFiles.slice(0, remainCount);

    if (uploadableFiles.length > 0) {
      onImageUpload?.(uploadableFiles);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = ""; 
  };

  const handleClick = () => {
    if (isMax) return;
    inputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isMax) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        w-42 h-42
        rounded-2xl border border-dashed
        flex flex-col justify-center items-center
        transition shadow
        ${
          isMax
            ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
            : isDragging
            ? "border-blue-500 bg-blue-50 cursor-pointer"
            : "border-gray-100 bg-white cursor-pointer"
        }
      `}
    >
      <EyeIcon />

      <p className="mt-2 text-gray-500 text-sm">
        {currentCount}/{maxCount}
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        disabled={isMax}
        onChange={handleChange}
      />
    </div>
  );
}
