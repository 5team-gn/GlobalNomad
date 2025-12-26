import Image from "next/image";

export default function ActivityHeaderGallery({ mock }: { mock: any }) {
  return (
    <div className="overflow-hidden rounded-[30px]">
      {/* 
        MO(<md): 세로 스택
        TB/PC(>=md): 가로 2열 (메인 왼쪽 + 서브 오른쪽) 동일
      */}
      <div className="flex flex-col md:flex-row gap-[8px] min-w-0">
        {/* ✅ 메인 배너: 항상 렌더 */}
        <div className="relative w-full md:flex-1 min-w-0 h-[260px] md:h-[400px]">
          <Image
            src={mock.bannerImageUrl}
            alt={mock.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 60vw, 790px"
          />
        </div>

        {/* ✅ 서브 이미지: MO에서는 아래로 내려오고, md+에서는 오른쪽에 고정폭 */}
        <div
          data-count={mock.subImages.length}
          className="
            w-full
            md:w-[329px] md:flex-none
            grid gap-[8px]
            grid-cols-2
            data-[count=1]:grid-cols-1
            data-[count=2]:grid-cols-2
              md:data-[count=2]:grid-cols-1
    md:data-[count=3]:grid-cols-2
    md:data-[count=4]:grid-cols-2
          "
        >
          {mock.subImages.slice(0, 4).map((img: any, i: number) => (
            <div
              key={img.imageUrl ?? i}
              className="relative h-[120px] md:h-[196px]"
            >
              <Image
                src={img.imageUrl}
                alt={`${mock.title}-${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 767px) 50vw, 165px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
