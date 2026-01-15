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
    <div className="flex justify-between items-center gap-3 mb-8">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.name)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-[15px] whitespace-nowrap flex-shrink-0
              transition-all duration-200
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
            <span className="text-[14px] font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* 가격 정렬 드롭다운 */}
<div className="relative flex items-center flex-shrink-0">
  <select
    value={sortOrder}
    onChange={(e) => onSortChange(e.target.value as 'latest' | 'price_asc' | 'price_desc')}
    className="appearance-none bg-transparent border-none text-gray-700 text-[14px] font-medium cursor-pointer focus:outline-none"
  >
    <option value="latest">가격</option>
    <option value="price_asc">가격 낮은 순</option>
    <option value="price_desc">가격 높은 순</option>
  </select>
  <span className="text-gray-700 text-[10px] pointer-events-none -ml-12">▼</span>
</div>
    </div>
  );
}