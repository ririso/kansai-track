// Pagination.tsx
import { Button } from "@/components/ui/shadcn/button";

type Props = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  totalCount,
  itemsPerPage,
  onPageChange,
}: Props) {
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
      <p className="text-sm text-gray-600">
        {totalCount}件中 {startIndex + 1}-
        {Math.min(startIndex + itemsPerPage, totalCount)}件を表示
      </p>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          前へ
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page)}
            className={`${
              page === currentPage
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            }`}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          次へ
        </Button>
      </div>
    </div>
  );
}
