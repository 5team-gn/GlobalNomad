interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
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
            onClick={() => onPageChange(pageNum)}
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
        onClick={() => onPageChange(currentPage + 1)}
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
  );
}