import Image from 'next/image';

const categories = [
  { id: 'culture', name: '문화 · 예술' },
  { id: 'food', name: '식음료' },
  { id: 'tour', name: '투어' },
  { id: 'sightseeing', name: '관광' },
  { id: 'wellness', name: '웰빙' },
];

interface CategoryFilterProps {
  selectedCategory: string;
  sortOrder: 'latest' | 'price_asc' | 'price_desc';
  onCategoryClick: (categoryName: string) => void;
  onSortChange: (sort: 'latest' | 'price_asc' | 'price_desc') => void;
}

export function CategoryFilter({ 
  selectedCategory, 
  sortOrder, 
  onCategoryClick, 
  onSortChange 
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8">
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 w-full sm:w-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.name)}
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
          onChange={(e) => onSortChange(e.target.value as 'latest' | 'price_asc' | 'price_desc')}
          className="appearance-none w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 pr-8 sm:pr-10 rounded-[12px] sm:rounded-[15px] border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap text-14-m sm:text-16-m cursor-pointer"
        >
          <option value="latest">최신순</option>
          <option value="price_asc">가격 낮은 순</option>
          <option value="price_desc">가격 높은 순</option>
        </select>
        <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-10-m sm:text-12-m pointer-events-none">▼</span>
      </div>
    </div>
  );
}