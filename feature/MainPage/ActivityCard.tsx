import Image from 'next/image';
import Link from 'next/link';
import type { ActivityListItem } from '@/types/activities/activity.types';

interface ActivityCardProps {
  activity: ActivityListItem;
  variant?: 'popular' | 'normal';
  className?: string;
}

export function ActivityCard({ activity, variant = 'normal', className = '' }: ActivityCardProps) {
  const isPopular = variant === 'popular';

  return (
    <Link
      href={`/activities/${activity.id}`}
      className={`group block ${className}`}
    >
      <div
        className={`relative rounded-[20px] sm:rounded-[24px] overflow-hidden w-full ${
          isPopular 
            ? 'mb-[-30px] sm:mb-[-60px] h-[145px] sm:h-[290px]' 
            : 'mb-[-40px] sm:mb-[-60px] aspect-[262/290]'
        }`}
      >
        <Image
          src={activity.bannerImageUrl}
          alt={activity.title}
          fill
          sizes={isPopular ? "(max-width: 640px) 131px, 262px" : "(max-width: 640px) 50vw, 262px"}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div
        className={`relative bg-white rounded-[20px] sm:rounded-[24px] shadow-md w-full flex flex-col justify-center ${
          isPopular
            ? 'h-[68px] sm:h-[136px] p-2 sm:p-4 gap-0.5 sm:gap-1'
            : 'aspect-[262/136] p-3 sm:p-4 gap-1'
        }`}
      >
        <h3 
          className={`text-gray-950 ${
            isPopular ? 'text-[11px] sm:text-[18px]' : 'text-[14px] sm:text-[18px]'
          }`}
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 700,
            letterSpacing: '-0.025em',
          }}
          title={activity.title}
        >
          {activity.title.length > (isPopular ? 12 : 15) 
            ? `${activity.title.substring(0, isPopular ? 12 : 15)}...` 
            : activity.title}
        </h3>

        <div className={`flex items-center ${isPopular ? 'gap-0.5 sm:gap-1' : 'gap-1'}`}>
          <Image 
            src="/icon_star_on.svg"
            alt="star rating"
            width={isPopular ? 10 : 12}
            height={isPopular ? 10 : 12}
            className="sm:w-[14px] sm:h-[14px] flex-shrink-0"
          />
          <span 
            className={`text-gray-900 ${isPopular ? 'text-[10px] sm:text-[14px]' : 'text-[12px] sm:text-[14px]'}`}
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 600
            }}
          >
            {activity.rating || 0}{' '}
            <span className="text-gray-500">
              ({activity.reviewCount || 0})
            </span>
          </span>
        </div>

        <p 
          className={`text-gray-950 ${isPopular ? 'text-[11px] sm:text-[18px]' : 'text-[14px] sm:text-[18px]'}`}
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 700,
            lineHeight: isPopular ? '1.3' : '1.4',
            letterSpacing: '-0.025em'
          }}
        >
          ₩ {activity.price.toLocaleString()}{' '}
          <span 
            className={`text-gray-700 ${isPopular ? 'text-[10px] sm:text-[14px]' : 'text-[12px] sm:text-[14px]'}`}
            style={{
              fontWeight: 600
            }}
          >
            / 인
          </span>
        </p>
      </div>
    </Link>
  );
}