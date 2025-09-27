import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { cn } from "@/lib/utils";
import { RepaymentStatus } from "@/types/enums/repaymentStatus";
import { Badge } from "../ui/shadcn/badge";
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
                  {repaymentHistory.updatedAt
                    ? new Date(repaymentHistory.updatedAt).toLocaleDateString(
                        "ja-JP",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )
                    : "-"}
                </p>
                <div className="flex items-center gap-1 text-xs">
                  <Badge
                    variant="outline"
                    className={cn(
                      "border",
                      repaymentHistory.beforeStatus ===
                        RepaymentStatus.Completed
                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                        : repaymentHistory.beforeStatus ===
                            RepaymentStatus.Delayed
                          ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-50"
                          : "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50"
                    )}
                  >
                    {repaymentHistory.beforeStatus}
                  </Badge>
                  <span>から</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border",
                      repaymentHistory.status === RepaymentStatus.Completed
                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                        : repaymentHistory.status === RepaymentStatus.Delayed
                          ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-50"
                          : "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50"
                    )}
                  >
                    {repaymentHistory.status}
                  </Badge>
                  <span>に変更</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">
                  ¥{repaymentHistory.amount.toLocaleString()}
                </p>
                {repaymentHistory.paymentCategory && (
                  <p className="text-xs text-blue-600 font-medium mb-1">
                    区分: {repaymentHistory.paymentCategory}
                  </p>
                )}
                {/* <p className="text-xs text-green-600 font-medium">
                  変更前ステータス：{repaymentHistory.beforeStatus}
                </p> */}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
