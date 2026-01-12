'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { SearchInput } from '@/components/input/searchinput';
import CardLayout from '@/components/card/CardLayout';
import { Button } from '@/components/button/Button';
import { getActivities, getPopularActivities } from '@/lib/api/activities';
import type { ActivityListItem } from '@/types/activities/activity.types';

// 카테고리 - 영어 id로 매칭
const categories = [
  { id: 'culture', name: '문화 · 예술', icon: '🎨' },
  { id: 'food', name: '식음료', icon: '🍽️' },
  { id: 'tour', name: '투어', icon: '🗺️' },
  { id: 'sightseeing', name: '관광', icon: '🏛️' },
  { id: 'wellness', name: '웰빙', icon: '🧘' },
];

export default function MainPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState<'latest' | 'price_asc' | 'price_desc'>('latest');
  const [popularActivities, setPopularActivities] = useState<ActivityListItem[]>([]);
  const [allActivities, setAllActivities] = useState<ActivityListItem[]>([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);
  const [isLoadingAll, setIsLoadingAll] = useState(true);
  
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // 인기 체험 스크롤
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // 스크롤 위치 감지
  const handleScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // 왼쪽 화살표: 스크롤이 0보다 크면 표시
    setShowLeftArrow(scrollLeft > 0);
    
    // 오른쪽 화살표: 스크롤이 끝까지 가지 않았으면 표시
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScrollPosition);
    // 초기 상태 확인
    handleScrollPosition();

    return () => {
      container.removeEventListener('scroll', handleScrollPosition);
    };
  }, [popularActivities]);

  // 인기 체험 로드 (무한 스크롤)
  const loadPopularActivities = useCallback(async () => {
    try {
      setIsLoadingPopular(true);
      console.log('🔥 인기 체험 로딩...');

      const response = await getPopularActivities(undefined, 8);
      console.log('✅ 인기 체험 응답:', response);

      if (response?.activities) {
        setPopularActivities(response.activities);
      }
    } catch (error) {
      console.error('❌ 인기 체험 로드 실패:', error);
    } finally {
      setIsLoadingPopular(false);
    }
  }, []);

  // 모든 체험 로드
  const loadAllActivities = useCallback(async (page: number = 1) => {
    try {
      setIsLoadingAll(true);
      console.log('🛼 모든 체험 로딩...', { page, category: selectedCategory, sort: sortOrder });

      const response = await getActivities({
        method: 'offset',
        page,
        size: 8,
        sort: sortOrder,
        category: selectedCategory || undefined,
      });

      console.log('✅ 모든 체험 응답:', response);

      if (response?.activities) {
        setAllActivities(response.activities);
        const total = Math.ceil((response.totalCount || 0) / 8);
        setTotalPages(total);
      }
    } catch (error) {
      console.error('❌ 체험 목록 로드 실패:', error);
      // 에러 시 빈 배열로 초기화
      setAllActivities([]);
      setTotalPages(1);
    } finally {
      setIsLoadingAll(false);
    }
  }, [selectedCategory, sortOrder]);

  // 초기 데이터 로드
  useEffect(() => {
    loadPopularActivities();
    loadAllActivities(1);
  }, [loadPopularActivities, loadAllActivities]);

  // 카테고리 또는 정렬 변경 시
  useEffect(() => {
    setCurrentPage(1);
    loadAllActivities(1);
  }, [selectedCategory, sortOrder, loadAllActivities]);

  // 카테고리 선택
  const handleCategoryClick = (categoryName: string) => {
    // 검색어 초기화
    setSearchQuery('');
    // 카테고리 토글 (한글 name 사용)
    setSelectedCategory(categoryName === selectedCategory ? '' : categoryName);
  };

  // 정렬 변경
  const handleSortChange = (sort: 'latest' | 'price_asc' | 'price_desc') => {
    // 검색어 초기화
    setSearchQuery('');
    setSortOrder(sort);
  };

  // 검색 실행
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    // 카테고리 및 정렬 초기화
    setSelectedCategory('');
    setSortOrder('latest');
    setCurrentPage(1);

    try {
      setIsLoadingAll(true);
      console.log('🔍 검색 중...', { keyword: searchQuery });

      const response = await getActivities({
        method: 'offset',
        page: 1,
        size: 8,
        sort: 'latest',
        keyword: searchQuery,
      });

      console.log('✅ 검색 결과:', response);

      if (response?.activities) {
        setAllActivities(response.activities);
        const total = Math.ceil((response.totalCount || 0) / 8);
        setTotalPages(total);
      }
    } catch (error) {
      console.error('❌ 검색 실패:', error);
      setAllActivities([]);
      setTotalPages(1);
    } finally {
      setIsLoadingAll(false);
    }
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    
    // 검색어가 있으면 검색으로, 없으면 일반 로드
    if (searchQuery.trim()) {
      // 검색 페이지네이션
      getActivities({
        method: 'offset',
        page,
        size: 8,
        sort: 'latest',
        keyword: searchQuery,
      }).then(response => {
        if (response?.activities) {
          setAllActivities(response.activities);
        }
      });
    } else {
      loadAllActivities(page);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 인기 체험 스크롤
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 300;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    
    if (direction === 'right') {
      scrollContainerRef.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth',
      });
    } else {
      scrollContainerRef.current.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-white">
        {/* 히어로 섹션 */}
        <section className="py-[60px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="relative w-full max-w-[1120px] mx-auto mb-[60px]">
              <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden">
                <Image
                  src="/mainpageimage1.png"
                  alt="히어로 이미지"
                  fill
                  sizes="(max-width: 1200px) 100vw, 1120px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-end pb-[80px]">
                  <h1 
                    className="text-white mb-2"
                    style={{
                      fontFamily: 'Pretendard',
                      fontSize: '32px',
                      fontWeight: 700,
                      lineHeight: '38px',
                      letterSpacing: '-0.025em',
                      textAlign: 'center'
                    }}
                  >
                    함께 배우면 즐거운 스트릿 댄스
                  </h1>
                  <p 
                    className="text-white flex items-center gap-2"
                    style={{
                      fontFamily: 'Pretendard',
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: '26px',
                      textAlign: 'center'
                    }}
                  >
                    1주일 안에 배우는 BEST <span style={{ fontSize: '20px' }}>🔥</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 검색 영역 */}
            <div className="text-center">
              <h2 className="text-32-b text-gray-950 mb-[40px]">
                무엇을 체험하고 싶으신가요?
              </h2>

              <div className="max-w-[1040px] mx-auto">
                <div className="relative bg-white rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                  <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSearch();
                    }}
                    placeholder="내가 원하는 체험은"
                    className="h-[70px] rounded-[16px] pr-[160px] border-0"
                    style={{
                      fontFamily: 'Pretendard',
                      fontSize: '18px',
                      fontWeight: 500,
                      lineHeight: '100%',
                      letterSpacing: '-0.025em'
                    }}
                  />

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleSearch}
                    className="absolute right-[8px] top-1/2 -translate-y-1/2 h-[56px] px-[32px] rounded-[12px]"
                  >
                    검색하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-6 py-16 bg-white">
          {/* 인기 체험 섹션 (무한 스크롤) */}
          <section className="mb-16 relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-32-b">🔥</span>
              <h2 className="text-32-b text-gray-950">인기 체험</h2>
            </div>

            {isLoadingPopular ? (
              <div className="flex items-center justify-center h-[400px]">
                <p className="text-gray-500">로딩 중...</p>
              </div>
            ) : (
              <div className="relative" style={{ maxWidth: 'calc(262px * 4 + 24px * 3)', margin: '0 auto' }}>
                {showLeftArrow && (
                  <button
                    onClick={() => handleScroll('left')}
                    className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                    style={{ left: '-24px' }}
                    aria-label="이전"
                  >
                    ←
                  </button>
                )}

                <div 
                  ref={scrollContainerRef}
                  className="overflow-x-auto pb-4 scrollbar-hide"
                  style={{ 
                    scrollbarWidth: 'none', 
                    msOverflowStyle: 'none'
                  }}
                >
                  <div className="flex gap-6" style={{ width: 'max-content' }}>
                    {popularActivities.map((activity) => (
                      <Link
                        key={activity.id}
                        href={`/activities/${activity.id}`}
                        className="group block flex-shrink-0"
                        style={{ width: '262px' }}
                      >
                        <div
                          className="relative rounded-[24px] overflow-hidden mb-[-60px]"
                          style={{ width: '262px', height: '290px' }}
                        >
                          <Image
                            src={activity.bannerImageUrl}
                            alt={activity.title}
                            fill
                            sizes="262px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div
                          className="relative bg-white rounded-[16px] shadow-md"
                          style={{ 
                            width: '262px', 
                            height: '136px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '5px'
                          }}
                        >
                          <h3 
                            className="text-gray-950 line-clamp-2"
                            style={{
                              fontFamily: 'Pretendard',
                              fontSize: '18px',
                              fontWeight: 700,
                              lineHeight: '26px',
                              letterSpacing: '-0.025em',
                              minHeight: '52px',
                              maxHeight: '52px',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              wordBreak: 'break-word'
                            }}
                          >
                            {activity.title}
                          </h3>

                          <div className="flex items-center gap-1">
                            <span style={{ fontSize: '14px' }}>⭐</span>
                            <span 
                              className="text-gray-900"
                              style={{
                                fontFamily: 'Pretendard',
                                fontSize: '14px',
                                fontWeight: 600,
                                lineHeight: '26px'
                              }}
                            >
                              {activity.rating || 0} ({activity.reviewCount || 0})
                            </span>
                          </div>

                          <p 
                            className="text-gray-950"
                            style={{
                              fontFamily: 'Pretendard',
                              fontSize: '18px',
                              fontWeight: 700,
                              lineHeight: '26px',
                              letterSpacing: '-0.025em'
                            }}
                          >
                            ₩ {activity.price.toLocaleString()}{' '}
                            <span 
                              className="text-gray-700"
                              style={{
                                fontSize: '14px',
                                fontWeight: 600
                              }}
                            >
                              / 인
                            </span>
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {showRightArrow && (
                  <button
                    onClick={() => handleScroll('right')}
                    className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                    style={{ right: '-24px' }}
                    aria-label="다음"
                  >
                    →
                  </button>
                )}
              </div>
            )}
          </section>

          {/* 모든 체험 섹션 (페이지네이션) */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-32-b">🛼</span>
              <h2 className="text-32-b text-gray-950">모든 체험</h2>
            </div>

            {/* 카테고리 필터 + 가격 정렬 */}
            <div className="flex justify-between items-center gap-3 mb-8">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-[15px] whitespace-nowrap
                      transition-all duration-200 text-16-m
                      ${
                        selectedCategory === category.name
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-primary-200'
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

              {/* 가격 정렬 드롭다운 */}
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => handleSortChange(e.target.value as 'latest' | 'price_asc' | 'price_desc')}
                  className="appearance-none px-4 py-2 pr-10 rounded-[15px] border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap text-16-m cursor-pointer"
                >
                  <option value="latest">최신순</option>
                  <option value="price_asc">가격 낮은 순</option>
                  <option value="price_desc">가격 높은 순</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-12-m pointer-events-none">▼</span>
              </div>
            </div>

            {/* 체험 목록 */}
            {isLoadingAll ? (
              <div className="flex items-center justify-center h-[400px]">
                <p className="text-gray-500">로딩 중...</p>
              </div>
            ) : allActivities.length === 0 ? (
              <div className="flex items-center justify-center h-[400px]">
                <p className="text-gray-500">체험이 없습니다.</p>
              </div>
            ) : (
              <CardLayout className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {allActivities.map((activity) => (
                  <Link
                    key={activity.id}
                    href={`/activities/${activity.id}`}
                    className="group block"
                    style={{ width: '262px' }}
                  >
                    <div
                      className="relative rounded-[24px] overflow-hidden mb-[-60px]"
                      style={{ width: '262px', height: '290px' }}
                    >
                      <Image
                        src={activity.bannerImageUrl}
                        alt={activity.title}
                        fill
                        sizes="262px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div
                      className="relative bg-white rounded-[16px] shadow-md"
                      style={{ 
                        width: '262px', 
                        height: '136px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '5px'
                      }}
                    >
                      <h3 
                        className="text-gray-950 line-clamp-2"
                        style={{
                          fontFamily: 'Pretendard',
                          fontSize: '18px',
                          fontWeight: 700,
                          lineHeight: '26px',
                          letterSpacing: '-0.025em',
                          minHeight: '52px',
                          maxHeight: '52px',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          wordBreak: 'break-word'
                        }}
                      >
                        {activity.title}
                      </h3>

                      <div className="flex items-center gap-1">
                        <span style={{ fontSize: '14px' }}>⭐</span>
                        <span 
                          className="text-gray-900"
                          style={{
                            fontFamily: 'Pretendard',
                            fontSize: '14px',
                            fontWeight: 600,
                            lineHeight: '26px'
                          }}
                        >
                          {activity.rating || 0} ({activity.reviewCount || 0})
                        </span>
                      </div>

                      <p 
                        className="text-gray-950"
                        style={{
                          fontFamily: 'Pretendard',
                          fontSize: '18px',
                          fontWeight: 700,
                          lineHeight: '26px',
                          letterSpacing: '-0.025em'
                        }}
                      >
                        ₩ {activity.price.toLocaleString()}{' '}
                        <span 
                          className="text-gray-700"
                          style={{
                            fontSize: '14px',
                            fontWeight: 600
                          }}
                        >
                          / 인
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
              </CardLayout>
            )}

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 flex items-center justify-center rounded-[8px] border border-gray-200 transition-colors ${
                    currentPage === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  ‹
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 flex items-center justify-center rounded-[8px] transition-colors ${
                        currentPage === pageNum
                          ? 'bg-primary-500 text-white'
                          : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 flex items-center justify-center rounded-[8px] border border-gray-200 transition-colors ${
                    currentPage === totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  ›
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}