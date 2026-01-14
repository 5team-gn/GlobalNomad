import type { MyActivity } from "@/types/MyExperienceTypes";
import Star from "@/public/icon_star.svg";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { deleteMyActivity } from "../activities-detail/api/deleteMyActivity";
import { ApiError } from "@/lib/api/apiFetch";

interface Props {
  experience: MyActivity;
  onDeleteSuccess?: (id: number) => void;
}

export default function MyExperienceCard({ experience, onDeleteSuccess }: Props) {
  const handleDelete = async () => {
    if (!confirm("이 체험을 삭제하시겠습니까?")) return;

    try {
      await deleteMyActivity(experience.id);
      toast.success("체험이 성공적으로 삭제 되었습니다")
      if(onDeleteSuccess) {
        onDeleteSuccess(experience.id)
      }
    } catch (error) {
      const status =error.response?.status;
      const serverMessage = error.response?.data?.message;

      switch (status) {
        case 400:
          toast.error(serverMessage || "예약 신청이 있어 삭제할 수 없습니다.")
          break;
        case 403:
          toast.error("삭제 권한이 없습니다.")
          break;
        case 404:
          toast.error("이미 삭제되었거나 존재하지 않은 체험입니다.")
          break;
      
        default:
          toast.error(`삭제중 알 수없는 오류가 발생했습니다`)
      }
      console. error(`삭제 실패 [${status}]:`,serverMessage)
    }
  };

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
          <Link href={`/myactivities/${experience.id}/edit`}>
            <button
              type="submit"
              className="border border-gray-50 rounded-lg text-14-m px-2.5 py-1.5 text-gray-600 cursor-pointer"
            >
              수정하기
            </button>
          </Link>
          <button type="button" onClick={handleDelete} className="bg-gray-50 border border-gray-50 rounded-lg text-14-m px-2.5 py-1.5 text-gray-600 cursor-pointer">
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
