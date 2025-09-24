import { Badge } from "@/components/ui/shadcn/badge";
import { cn } from "@/lib/utils";
import { RepaymentStatus } from "@/types/enums/repaymentStatus";

interface RepaymentStatusBadgeProps {
  status: string;
  className?: string;
}

export function RepaymentStatusBadge({
  status,
  className
}: RepaymentStatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case RepaymentStatus.Completed:
        return "bg-green-50 text-green-700 border-green-200 hover:bg-green-50";
      case RepaymentStatus.Delayed:
        return "bg-red-50 text-red-700 border-red-200 hover:bg-red-50";
      default:
        return "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50";
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "border",
        getStatusStyles(status),
        className
      )}
    >
      {status}
    </Badge>
  );
}