import Image from "next/image";
import ProductImageInput from "./ProductImageInput";
import Delete from "@/public/delete_button.svg";

interface ImageItem {
  file?: File;
  preview: string;
}

interface Props {
  title: string;
  images: ImageItem[];
  maxCount: number;
  onUpload: (files: File[]) => void;
  onRemove: (index: number) => void;
}

export function ImageSection({
  title,
  images,
  maxCount,
  onUpload,
  onRemove,
}: Props) {
  return (
    <>
      <h2 className="text-16-b">{title}</h2>
      <div className="flex gap-7">
        <ProductImageInput
          currentCount={images.length}
          maxCount={maxCount}
          onImageUpload={onUpload}
        />

        <div className="flex gap-4 flex-wrap">
          {images.map((image, index) => (
            <div key={index} className="relative w-42 h-42">
              <Image
                src={image.preview}
                alt={title}
                fill
                className="object-cover rounded"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute -top-2 -right-2 w-6.5 h-6.5 rounded-full bg-gray-950 text-white"
              >
                <Delete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
