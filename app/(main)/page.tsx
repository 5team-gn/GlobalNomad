'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SearchInput } from '@/components/input/searchinput';
import CardLayout from '@/components/card/CardLayout';
import { Button } from '@/components/button/Button';
import { getActivities, getPopularActivities } from '@/lib/api/activities';
import type { ActivityListItem } from '@/types/activities/activity.types';

// 카테고리 - 영어 id로 매칭
const categories = [
  { id: 'culture', name: '문화 · 예술'},
  { id: 'food', name: '식음료'},
  { id: 'tour', name: '투어'},
  { id: 'sightseeing', name: '관광'},
  { id: 'wellness', name: '웰빙'},
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

      <main className="flex-1 bg-white">
        {/* 히어로 섹션 */}
        <section className="py-[60px]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="relative w-full max-w-[327px] sm:max-w-[1120px] mx-auto mb-[40px] sm:mb-[60px]">
              <div className="relative w-full h-[181px] sm:h-[500px] rounded-[16px] sm:rounded-[24px] overflow-hidden">
                <Image
                  src="/mainpageimage1.png"
                  alt="히어로 이미지"
                  fill
                  sizes="(max-width: 375px) 327px, 1120px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-end pb-[40px] sm:pb-[80px]">
                  <h1 
                    className="text-white mb-1 sm:mb-2 text-[20px] sm:text-[32px] px-4 text-center"
                    style={{
                      fontFamily: 'Pretendard',
                      fontWeight: 700,
                      lineHeight: '1.3',
                      letterSpacing: '-0.025em'
                    }}
                  >
                    함께 배우면 즐거운 스트릿 댄스
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
                    1주일 안에 배우는 BEST <span className="text-[16px] sm:text-[20px]">🔥</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 검색 영역 */}
            <div className="text-center">
              <h2 className="text-20-b sm:text-32-b text-gray-950 mb-[30px] sm:mb-[40px] px-4">
                무엇을 체험하고 싶으신가요?
              </h2>

              <div className="max-w-[327px] sm:max-w-[1040px] mx-auto px-4 sm:px-0">
                <div className="relative bg-white rounded-[12px] sm:rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                  <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSearch();
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
                    onClick={handleSearch}
                    className="absolute right-[4px] sm:right-[8px] top-1/2 -translate-y-1/2 h-[48px] sm:h-[56px] px-[20px] sm:px-[32px] rounded-[8px] sm:rounded-[12px] text-14-m sm:text-16-m text-white"
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
              <span className="text-24-b sm:text-32-b">🔥</span>
              <h2 className="text-24-b sm:text-32-b text-gray-950">인기 체험</h2>
            </div>

            {isLoadingPopular ? (
              <div className="flex items-center justify-center h-[400px]">
                <p className="text-gray-500">로딩 중...</p>
              </div>
            ) : (
              <div className="relative">
                {showLeftArrow && (
                  <button
                    onClick={() => handleScroll('left')}
                    className="hidden sm:flex absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-50 transition-colors z-10"
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
                  <div className="flex gap-3 sm:gap-6" style={{ width: 'max-content', paddingLeft: '8px', paddingRight: '8px' }}>
                    {popularActivities.map((activity) => (
                      <Link
                        key={activity.id}
                        href={`/activities/${activity.id}`}
                        className="group block flex-shrink-0 w-[calc(50vw-20px)] sm:w-[262px]"
                      >
                        <div
                          className="relative rounded-[24px] overflow-hidden mb-[-40px] sm:mb-[-60px] w-full aspect-[262/290]"
                        >
                          <Image
                            src={activity.bannerImageUrl}
                            alt={activity.title}
                            fill
                            sizes="(max-width: 640px) 50vw, 262px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div
                          className="relative bg-white rounded-[16px] shadow-md w-full aspect-[262/136] p-3 sm:p-4 flex flex-col justify-center gap-1"
                        >
                          <h3 
                            className="text-gray-950 line-clamp-2 text-[14px] sm:text-[18px]"
                            style={{
                              fontFamily: 'Pretendard',
                              fontWeight: 700,
                              lineHeight: '1.4',
                              letterSpacing: '-0.025em',
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
                            <span className="text-[12px] sm:text-[14px]">⭐</span>
                            <span 
                              className="text-gray-900 text-[12px] sm:text-[14px]"
                              style={{
                                fontFamily: 'Pretendard',
                                fontWeight: 600
                              }}
                            >
                              {activity.rating || 0} ({activity.reviewCount || 0})
                            </span>
                          </div>

                          <p 
                            className="text-gray-950 text-[14px] sm:text-[18px]"
                            style={{
                              fontFamily: 'Pretendard',
                              fontWeight: 700,
                              lineHeight: '1.4',
                              letterSpacing: '-0.025em'
                            }}
                          >
                            ₩ {activity.price.toLocaleString()}{' '}
                            <span 
                              className="text-gray-700 text-[12px] sm:text-[14px]"
                              style={{
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
                    className="hidden sm:flex absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-50 transition-colors z-10"
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8">
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 w-full sm:w-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`
                      flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[12px] sm:rounded-[15px] whitespace-nowrap flex-shrink-0
                      transition-all duration-200 text-14-m sm:text-16-m
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
                      width={16}
                      height={16}
                      className="sm:w-[20px] sm:h-[20px]"
                    />
                    <span className="text-[13px] sm:text-[16px]">{category.name}</span>
                  </button>
                ))}
              </div>

              {/* 가격 정렬 드롭다운 */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={sortOrder}
                  onChange={(e) => handleSortChange(e.target.value as 'latest' | 'price_asc' | 'price_desc')}
                  className="appearance-none w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 pr-8 sm:pr-10 rounded-[12px] sm:rounded-[15px] border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap text-14-m sm:text-16-m cursor-pointer"
                >
                  <option value="latest">최신순</option>
                  <option value="price_asc">가격 낮은 순</option>
                  <option value="price_desc">가격 높은 순</option>
                </select>
                <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-10-m sm:text-12-m pointer-events-none">▼</span>
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
              <CardLayout className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {allActivities.map((activity) => (
                  <Link
                    key={activity.id}
                    href={`/activities/${activity.id}`}
                    className="group block w-full"
                  >
                    <div
                      className="relative rounded-[24px] overflow-hidden mb-[-40px] sm:mb-[-60px] w-full aspect-[262/290]"
                    >
                      <Image
                        src={activity.bannerImageUrl}
                        alt={activity.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div
                      className="relative bg-white rounded-[16px] shadow-md w-full aspect-[262/136] p-3 sm:p-4 flex flex-col justify-center gap-1"
                    >
                      <h3 
                        className="text-gray-950 line-clamp-2 text-[14px] sm:text-[18px]"
                        style={{
                          fontFamily: 'Pretendard',
                          fontWeight: 700,
                          lineHeight: '1.4',
                          letterSpacing: '-0.025em',
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
                        <span className="text-[12px] sm:text-[14px]">⭐</span>
                        <span 
                          className="text-gray-900 text-[12px] sm:text-[14px]"
                          style={{
                            fontFamily: 'Pretendard',
                            fontWeight: 600
                          }}
                        >
                          {activity.rating || 0} ({activity.reviewCount || 0})
                        </span>
                      </div>

                      <p 
                        className="text-gray-950 text-[14px] sm:text-[18px]"
                        style={{
                          fontFamily: 'Pretendard',
                          fontWeight: 700,
                          lineHeight: '1.4',
                          letterSpacing: '-0.025em'
                        }}
                      >
                        ₩ {activity.price.toLocaleString()}{' '}
                        <span 
                          className="text-gray-700 text-[12px] sm:text-[14px]"
                          style={{
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