import { Badge } from "@/components/ui/shadcn/budge";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { cn } from "@/lib/utils";
import { RepaymentScheduleType } from "@/types/repaymentScheduleType";
import { CalendarIcon } from "lucide-react";

type Props = {
  repaymentSchedules: RepaymentScheduleType[];
};

export function RepaymentScheduleDetail() {
  const { schedules, isLoading, error, totalCreditAmount } =
    useRepaymentSchedule();

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b bg-gray-50">
          <tr className="border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-semibold text-gray-700 [&:has([role=checkbox])]:pr-0">
              支払い日
            </th>
            <th className="h-12 px-4 text-left align-middle font-semibold text-gray-700 [&:has([role=checkbox])]:pr-0">
              金額
            </th>
            <th className="h-12 px-4 text-left align-middle font-semibold text-gray-700 [&:has([role=checkbox])]:pr-0">
              ステータス
            </th>
            <th className="h-12 px-4 text-left align-middle font-semibold text-gray-700 [&:has([role=checkbox])]:pr-0">
              支払い方法
            </th>
            <th className="h-12 px-4 text-right align-middle font-semibold text-gray-700 [&:has([role=checkbox])]:pr-0">
              残額
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {schedules.map((schedule: any) => (
            <tr
              key={schedule.id}
              className="border-b transition-colors hover:bg-blue-50 data-[state=selected]:bg-muted"
            >
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-800">{schedule.date}</span>
                </div>
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <span className="text-gray-900 font-bold">
                  {schedule.amount}
                </span>
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <Badge
                  variant="outline"
                  className={cn(
                    "border",
                    schedule.status === "完了"
                      ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                      : schedule.status === "遅延"
                        ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-50"
                        : "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50"
                  )}
                >
                  {schedule.status}
                </Badge>
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <span className="text-gray-700">
                  {schedule.method || "未設定"}
                </span>
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                <span className="text-gray-900 font-semibold">
                  {schedule.remaining}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
