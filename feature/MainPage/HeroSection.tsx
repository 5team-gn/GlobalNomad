"use client";

import Image from 'next/image';
import { SearchInput } from '@/components/input/searchinput';
import { Button } from '@/components/button/Button';
import { ActivityListItem } from '@/types/activities/activity.types';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  randomActivity: ActivityListItem | null;
}

export function HeroSection({ searchQuery, onSearchChange, onSearch, randomActivity }: HeroSectionProps) {
  // 데이터가 없을 때는 빈 값을 사용하여 하드코딩 문구 노출 방지
  const displayTitle = randomActivity?.title || "";
  const displayImage = randomActivity?.bannerImageUrl || "";

  return (
    <section className="py-[60px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="relative w-full max-w-[327px] sm:max-w-[1120px] mx-auto mb-[40px] sm:mb-[60px]">
          {/* 배경을 연한 회색으로 설정하여 로딩 전 빈 공간 느낌을 줄임 */}
          <div className="relative w-full h-[181px] sm:h-[500px] rounded-[16px] sm:rounded-[24px] overflow-hidden bg-gray-100">
            
            {/* 1. 이미지가 존재할 때만 렌더링하며 페이드인 효과 적용 */}
            {displayImage && (
              <Image
                src={displayImage}
                alt={displayTitle}
                fill
                sizes="(max-width: 375px) 327px, 1120px"
                className="object-cover animate-in fade-in duration-1000"
                priority
              />
            )}

            {/* 2. 랜덤 데이터가 로드된 후에만 텍스트 영역을 노출 (깜빡임 방지 핵심) */}
            {randomActivity && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end pb-[40px] sm:pb-[80px] animate-in fade-in slide-in-from-bottom-2 duration-700">
                <h1 
                  className="text-white mb-1 sm:mb-2 text-[20px] sm:text-[32px] px-4 text-center"
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 700,
                    lineHeight: '1.3',
                    letterSpacing: '-0.025em'
                  }}
                >
                  {displayTitle}
                </h1>
                <p 
                  className="text-white flex items-center gap-2 text-[14px] sm:text-[16px]"
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 600,
                    lineHeight: '26px',
                    textAlign: 'center'
                  }}
                >
                  지금 가장 핫한 인기 체험 <span className="text-[16px] sm:text-[20px]">🔥</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 검색 영역 (검색창은 데이터 로딩과 상관없이 바로 보여줍니다) */}
        <div className="text-center">
          <h2 className="text-20-b sm:text-32-b text-gray-950 mb-[30px] sm:mb-[40px] px-4">
            무엇을 체험하고 싶으신가요?
          </h2>

          <div className="max-w-[327px] sm:max-w-[1040px] mx-auto px-4 sm:px-0">
            <div className="relative bg-white rounded-[12px] sm:rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
              <SearchInput
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') onSearch();
                }}
                placeholder="내가 원하는 체험은"
                className="h-[56px] sm:h-[70px] rounded-[12px] sm:rounded-[16px] pr-[100px] sm:pr-[160px] border-0 text-[14px] sm:text-[18px]"
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 500,
                  lineHeight: '100%',
                  letterSpacing: '-0.025em'
                }}
              />
              <Button
                variant="primary"
                size="lg"
                onClick={onSearch}
                className="absolute right-[4px] sm:right-[8px] top-1/2 -translate-y-1/2 h-[48px] sm:h-[56px] px-[20px] sm:px-[32px] rounded-[8px] sm:rounded-[12px] text-14-m sm:text-16-m text-white"
              >
                검색하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}