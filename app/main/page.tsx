'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { SearchInput } from '@/components/input/searchinput';
import CardLayout from '@/components/card/CardLayout';
import { Button, ButtonLabel } from '@/components/button/Button';

// 체험 데이터 타입
interface Activity {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
}

// 더미 데이터
const popularActivities: Activity[] = [
  {
    id: 1,
    title: '함께 배우면 즐거운 스트릿 댄스',
    rating: 4.9,
    reviewCount: 2513,
    price: 38000,
    image: '/mainpageimage2.png',
  },
  {
    id: 2,
    title: '언덕과 사랑이 담긴데이...',
    rating: 3.8,
    reviewCount: 516,
    price: 35000,
    image: '/mainpageimage3.png',
  },
  {
    id: 3,
    title: 'VR 케릭 만들기 체험 3D',
    rating: 4.9,
    reviewCount: 2513,
    price: 38000,
    image: '/mainpageimage4.png',
  },
  {
    id: 4,
    title: '거리 속에서 얻을까지',
    rating: 4.7,
    reviewCount: 2127,
    price: 45000,
    image: '/mainpageimage5.png',
  },
];

const allActivities: Activity[] = [
  {
    id: 5,
    title: '피크닉 패키지',
    rating: 3.8,
    reviewCount: 516,
    price: 42800,
    image: '/mainpageimage6.png',
  },
  {
    id: 6,
    title: '액자가 마음에서 4개정',
    rating: 3.2,
    reviewCount: 127,
    price: 217000,
    image: '/mainpageimage7.png',
  },
  {
    id: 7,
    title: '부산달력 펀앤 관광과 체험',
    rating: 5.0,
    reviewCount: 39,
    price: 6000,
    image: '/mainpageimage8.png',
  },
  {
    id: 8,
    title: '경기가 파스너비',
    rating: 4.1,
    reviewCount: 198,
    price: 35000,
    image: '/mainpageimage9.png',
  },
  {
    id: 9,
    title: '바른과 자각과 커피',
    rating: 3.7,
    reviewCount: 83,
    price: 1000,
    image: '/mainpageimage10.png',
  },
  {
    id: 10,
    title: '디자인 일러기 구경하기',
    rating: 4.2,
    reviewCount: 92,
    price: 1000,
    image: '/mainpageimage11.png',
  },
  {
    id: 11,
    title: '세상에서 가장 안전한 서핑',
    rating: 5.0,
    reviewCount: 8,
    price: 1000,
    image: '/mainpageimage12.png',
  },
  {
    id: 12,
    title: '이향 가이드가 함께하는 솔',
    rating: 5.0,
    reviewCount: 3,
    price: 1000,
    image: '/mainpageimage13.png',
  },
];

const categories = [
  { id: 'all', name: '전체' },
  { id: 'culture', name: '문화 · 예술' },
  { id: 'food', name: '식음료' },
  { id: 'sports', name: '스포츠' },
  { id: 'tour', name: '투어' },
  { id: 'sightseeing', name: '관광' },
  { id: 'wellness', name: '웰빙' },
];

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-white">
        {/* 히어로 섹션 - 박스형 */}
        <section className="py-[60px]">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* 이미지 박스 */}
            <div className="relative w-full max-w-[1120px] mx-auto mb-[60px]">
              <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden">
                <Image
                  src="/mainpageimage1.png"
                  alt="히어로 이미지"
                  fill
                  className="object-cover"
                  priority
                />
                {/* 텍스트 오버레이 */}
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
                  <h1 className="text-48-b text-white mb-3">
                    함께 배우면 즐거운 스트릿 댄스
                  </h1>
                  <p className="text-16-m text-white flex items-center gap-2">
                    1주일 안에 배우는 BEST <span className="text-20-m">🔥</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 검색 영역 */}
            <div className="text-center">
              <h2 className="text-32-b text-gray-950 mb-[40px]">
                무엇을 체험하고 싶으신가요?
              </h2>
              
              {/* 검색바 컨테이너 - 흰색 배경 + 그림자 */}
              <div className="max-w-[1040px] mx-auto">
                <div className="relative bg-white rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                  <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="내가 원하는 체험은"
                    className="h-[70px] rounded-[16px] pr-[160px] border-0"
                  />
                  
                  {/* 검색 버튼 */}
                  <Button
                    variant="primary"
                    size="lg"
                    className="absolute right-[8px] top-1/2 -translate-y-1/2 h-[56px] px-[32px] rounded-[12px]"
                  >
                    <ButtonLabel>검색하기</ButtonLabel>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-6 py-16 bg-white">
          {/* 인기 체험 섹션 */}
          <section className="mb-16 relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-32-b">🔥</span>
              <h2 className="text-32-b text-gray-950">인기 체험</h2>
            </div>

            {/* 스크롤 가능한 카드 레이아웃 */}
            <div className="relative">
              <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                <div className="flex gap-6" style={{ width: 'max-content' }}>
                  {popularActivities.map((activity) => (
                    <Link
                      key={activity.id}
                      href={`/activities/${activity.id}`}
                      className="group block flex-shrink-0"
                      style={{ width: '262px' }}
                    >
                      {/* 이미지 컨테이너 - 262×290 */}
                      <div className="relative rounded-[24px] overflow-hidden mb-[-60px]" style={{ width: '262px', height: '290px' }}>
                        <Image
                          src={activity.image}
                          alt={activity.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* 텍스트 박스 (이미지 위에 겹침) - 262×136 */}
                      <div className="relative bg-white rounded-[16px] shadow-md px-4 py-3 space-y-1" style={{ width: '262px', height: '136px' }}>
                        {/* 제목 */}
                        <h3 className="text-16-m text-gray-950 line-clamp-2 leading-tight">
                          {activity.title}
                        </h3>
                        
                        {/* 별점 */}
                        <div className="flex items-center gap-1">
                          <span className="text-14-m text-gray-700">⭐</span>
                          <span className="text-14-m text-gray-900">
                            {activity.rating} ({activity.reviewCount})
                          </span>
                        </div>
                        
                        {/* 가격 */}
                        <p className="text-18-b text-gray-950 pt-1">
                          ₩ {activity.price.toLocaleString()}{' '}
                          <span className="text-14-m text-gray-700">/ 인</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* 화살표 버튼 - 카드와 겹침 */}
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                aria-label="다음"
              >
                →
              </button>
            </div>
          </section>

          {/* 모든 체험 섹션 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-32-b">🌈</span>
              <h2 className="text-32-b text-gray-950">모든 체험</h2>
            </div>

            {/* 카테고리 필터 */}
            <div className="flex justify-between items-center gap-3 mb-8">
              {/* 카테고리 버튼들 */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-[12px] whitespace-nowrap
                      transition-colors text-14-m
                      ${
                        selectedCategory === category.id
                          ? 'bg-primary-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Image 
                      src={`/icons/category-${category.id}.png`}
                      alt={category.name}
                      width={20}
                      height={20}
                    />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
              
              {/* 가격 필터 */}
              <button className="flex items-center gap-2 px-4 py-2 rounded-[12px] border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap text-14-m">
                <span>가격</span>
                <span>▼</span>
              </button>
            </div>

            {/* 체험 목록 */}
            <CardLayout className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allActivities.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/activities/${activity.id}`}
                  className="group block"
                  style={{ width: '262px' }}
                >
                  {/* 이미지 컨테이너 - 262×290 */}
                  <div className="relative rounded-[24px] overflow-hidden mb-[-60px]" style={{ width: '262px', height: '290px' }}>
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* 텍스트 박스 (이미지 위에 겹침) - 262×136 */}
                  <div className="relative bg-white rounded-[16px] shadow-md px-4 py-3 space-y-1" style={{ width: '262px', height: '136px' }}>
                    {/* 제목 */}
                    <h3 className="text-16-m text-gray-950 line-clamp-2 leading-tight">
                      {activity.title}
                    </h3>
                    
                    {/* 별점 */}
                    <div className="flex items-center gap-1">
                      <span className="text-14-m text-gray-700">⭐</span>
                      <span className="text-14-m text-gray-900">
                        {activity.rating} ({activity.reviewCount})
                      </span>
                    </div>
                    
                    {/* 가격 */}
                    <p className="text-18-b text-gray-950 pt-1">
                      ₩ {activity.price.toLocaleString()}{' '}
                      <span className="text-14-m text-gray-700">/ 인</span>
                    </p>
                  </div>
                </Link>
              ))}
            </CardLayout>

            {/* 페이지네이션 */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <button className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-gray-200 text-gray-400 hover:bg-gray-50">
                ‹
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-[8px] bg-primary-500 text-white">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-gray-200 text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-gray-200 text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-gray-200 text-gray-700 hover:bg-gray-50">
                ›
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}