import { SortDirection } from "@/types/enums/sortDirection";
import { SortAsc, SortDesc } from "lucide-react";

type SortButtonProps = {
  sortDirection: SortDirection;
  onChangeDirection: (next: SortDirection) => void;
};

export default function SortButton({
  sortDirection,
  onChangeDirection,
}: SortButtonProps) {
  const handleClick = () => {
    const nextDirection =
      sortDirection === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;
    onChangeDirection(nextDirection);
  };

  return (
    <button
      type="button"
      className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100 transition"
      onClick={handleClick}
    >
      {sortDirection === SortDirection.ASC ? (
        <>
          <SortAsc className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-blue-600">昇順</span>
        </>
      ) : (
        <>
          <SortDesc className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-600">降順</span>
        </>
      )}
    </button>
  );
}
