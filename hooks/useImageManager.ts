import { useState } from "react";
export interface ImageItem {
  file: File;
  preview: string;
}

export function useImageManager(initial?: string[]) {
  const [images, setImages] = useState<ImageItem[]>([]);

  const addImages = (files: File[]) => {
    setImages((prev) => [
      ...prev,
      ...files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  return { images, addImages, removeImage };
}
