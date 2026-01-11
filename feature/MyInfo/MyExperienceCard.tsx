import type { MyActivity } from "@/types/MyExperienceTypes";
import Star from "@/public/icon_star.svg";
import Image from "next/image";
import Link from "next/link";

interface Props {
  experience: MyActivity;
}

export default function MyExperienceCard({ experience }: Props) {
  return (
    <div className="flex w-full justify-between rounded-2xl border border-gray-200 p-6">
      <div className="flex flex-col justify-between">
        <h3 className="text-16-b">{experience.title}</h3>

        <div className="flex items-center gap-1 text-gray-600">
          <Star />
          <p>{experience.rating}</p>
          <p>({experience.reviewCount})</p>
        </div>
        <div>
          <p className="text-16-b">
            \{experience.price.toLocaleString()}
            <span className="text-gray-400"> /인</span>
          </p>
        </div>

        <div className="flex gap-2">
          <Link href={`/myinfo/experiences/${experience.id}/edit`}>
            <button type="submit" className="border border-gray-50 rounded-lg text-14-m px-2.5 py-1.5 text-gray-600 cursor-pointer">
              수정하기
            </button>
          </Link>
          <button className="bg-gray-50 border border-gray-50 rounded-lg text-14-m px-2.5 py-1.5 text-gray-600 cursor-pointer">
            삭제하기
          </button>
        </div>
      </div>

      <Image
        src={experience.bannerImageUrl}
        alt={experience.title}
        width={128}
        height={128}
        className="rounded-2xl object-cover"
        sizes="128px"
      />
    </div>
  );
}
