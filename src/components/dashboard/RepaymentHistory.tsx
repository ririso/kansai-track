import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { Card, CardContent } from "../ui/shadcn/card";

export function RepaymentHistory() {
  const { repaymentHistories } = useRepaymentSchedule();

  return (
    <div className="space-y-3">
      {repaymentHistories.map((repaymentHistory) => (
        <Card
          key={repaymentHistory.id}
          className="border-gray-200 hover:border-blue-200 hover:shadow-custom transition-all duration-200"
        >
          <CardContent className="p-6 pt-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {repaymentHistory.updatedAt || "-"}
                </p>
                <p className="text-sm text-gray-600">
                  {repaymentHistory.newStatus || "-"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">
                  ¥{repaymentHistory.amount.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 font-medium">
                  {repaymentHistory.newStatus}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
