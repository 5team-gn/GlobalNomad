"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import CardLayout from "@/components/card/CardLayout";
import { getActivities, getPopularActivities } from "@/lib/api/activities";
import type { ActivityListItem } from "@/types/activities/activity.types";
import Roller from "@/public/rollerskate.svg";

// feature/MainPage 컴포넌트들
import { HeroSection } from "@/feature/MainPage/HeroSection";
import { ActivityCard } from "@/feature/MainPage/ActivityCard";
import { CategoryFilter } from "@/feature/MainPage/CategoryFilter";
import { Pagination } from "@/feature/MainPage/Pagination";

export default function MainPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState<
    "latest" | "price_asc" | "price_desc"
  >("latest");
  const [popularActivities, setPopularActivities] = useState<
    ActivityListItem[]
  >([]);
  const [allActivities, setAllActivities] = useState<ActivityListItem[]>([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);
  const [isLoadingAll, setIsLoadingAll] = useState(true);
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
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScrollPosition);
    handleScrollPosition();
    return () => container.removeEventListener("scroll", handleScrollPosition);
  }, [popularActivities]);

  // 인기 체험 로드
  const loadPopularActivities = useCallback(async () => {
    try {
      setIsLoadingPopular(true);
      const response = await getPopularActivities(undefined, 8);
      if (response?.activities) setPopularActivities(response.activities);
    } catch (error) {
      console.error("인기 체험 로드 실패:", error);
    } finally {
      setIsLoadingPopular(false);
    }
  }, []);

  // 모든 체험 로드
  const loadAllActivities = useCallback(
    async (page: number = 1) => {
      try {
        setIsLoadingAll(true);
        const response = await getActivities({
          method: "offset",
          page,
          size: 8,
          sort: sortOrder,
          category: selectedCategory || undefined,
        });
        if (response?.activities) {
          setAllActivities(response.activities);
          setTotalPages(Math.ceil((response.totalCount || 0) / 8));
        }
      } catch (error) {
        console.error("체험 목록 로드 실패:", error);
        setAllActivities([]);
        setTotalPages(1);
      } finally {
        setIsLoadingAll(false);
      }
    },
    [selectedCategory, sortOrder]
  );

  useEffect(() => {
    loadPopularActivities();
    loadAllActivities(1);
  }, [loadPopularActivities, loadAllActivities]);

  useEffect(() => {
    setCurrentPage(1);
    loadAllActivities(1);
  }, [selectedCategory, sortOrder, loadAllActivities]);

  // 카테고리 선택
  const handleCategoryClick = (categoryName: string) => {
    setSearchQuery("");
    setSelectedCategory(categoryName === selectedCategory ? "" : categoryName);
  };

  // 정렬 변경
  const handleSortChange = (sort: "latest" | "price_asc" | "price_desc") => {
    setSearchQuery("");
    setSortOrder(sort);
  };

  // 검색 실행
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSelectedCategory("");
    setSortOrder("latest");
    setCurrentPage(1);

    try {
      setIsLoadingAll(true);
      const response = await getActivities({
        method: "offset",
        page: 1,
        size: 8,
        sort: "latest",
        keyword: searchQuery,
      });
      if (response?.activities) {
        setAllActivities(response.activities);
        setTotalPages(Math.ceil((response.totalCount || 0) / 8));
      }
    } catch (error) {
      console.error("검색 실패:", error);
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

    if (searchQuery.trim()) {
      getActivities({
        method: "offset",
        page,
        size: 8,
        sort: "latest",
        keyword: searchQuery,
      }).then((response) => {
        if (response?.activities) setAllActivities(response.activities);
      });
    } else {
      loadAllActivities(page);
    }

    //window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 스크롤
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.scrollTo({
      left:
        direction === "right"
          ? currentScroll + scrollAmount
          : currentScroll - scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-white">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
        />

        <div className="max-w-[1200px] mx-auto px-6 py-16 bg-white">
          {/* 인기 체험 */}
          <section className="mb-16 relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-24-b sm:text-32-b">🔥</span>
              <h2 className="text-24-b sm:text-32-b text-gray-950">
                인기 체험
              </h2>
            </div>

            {isLoadingPopular ? (
              <div className="flex items-center justify-center h-[400px]">
                <p className="text-gray-500">로딩 중...</p>
              </div>
            ) : (
              <div className="relative">
                {showLeftArrow && (
                  <button
                    onClick={() => handleScroll("left")}
                    className="hidden sm:flex absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-50 transition-colors z-10"
                    style={{ left: "-24px" }}
                    aria-label="이전"
                  >
                    ←
                  </button>
                )}

                <div
                  ref={scrollContainerRef}
                  className="overflow-x-auto pb-4 scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div
                    className="flex gap-3 sm:gap-6"
                    style={{
                      width: "max-content",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    {popularActivities.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        variant="popular"
                        className="flex-shrink-0 w-[131px] sm:w-[262px]"
                      />
                    ))}
                  </div>
                </div>

                {showRightArrow && (
                  <button
                    onClick={() => handleScroll("right")}
                    className="hidden sm:flex absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-50 transition-colors z-10"
                    style={{ right: "-24px" }}
                    aria-label="다음"
                  >
                    →
                  </button>
                )}
              </div>
            )}
          </section>

          {/* 모든 체험 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 shrink-0">
                <Roller width="100%" height="100%" />
              </div>
              <h2 className="text-32-b text-gray-950">모든 체험</h2>
            </div>

            <CategoryFilter
              selectedCategory={selectedCategory}
              sortOrder={sortOrder}
              onCategoryClick={handleCategoryClick}
              onSortChange={handleSortChange}
            />

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
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    variant="normal"
                    className="w-full"
                  />
                ))}
              </CardLayout>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
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
