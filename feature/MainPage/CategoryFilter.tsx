import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

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

const sortOptions = [
  { value: 'latest', label: '가격' },
  { value: 'price_asc', label: '가격 낮은 순' },
  { value: 'price_desc', label: '가격 높은 순' },
] as const;

export function CategoryFilter({ 
  selectedCategory, 
  sortOrder, 
  onCategoryClick, 
  onSortChange 
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = sortOptions.find(option => option.value === sortOrder)?.label || '가격';

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: 'latest' | 'price_asc' | 'price_desc') => {
    onSortChange(value);
    setIsOpen(false);
  };

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

      {/* 커스텀 드롭다운 */}
      <div className="relative flex-shrink-0" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 text-gray-700 text-[14px] font-medium cursor-pointer hover:text-gray-900"
        >
          {selectedLabel}
          <span className="text-[10px]">▼</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-[8px] shadow-lg py-1 z-10 min-w-[140px]">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors ${
                  sortOrder === option.value ? 'text-primary-500 font-semibold' : 'text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}