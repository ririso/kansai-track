import { Badge } from "@/components/ui/shadcn/budge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { RepaymentScheduleProps } from "@/types/repaymentScheduleProps";
import { CalendarIcon } from "lucide-react";

type Props = {
  repaymentSchedule: RepaymentScheduleProps;
};

export function RepaymentSchedule({ repaymentSchedule }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="text-gray-700">支払い予定日</TableHead>
            <TableHead className="text-gray-700">金額</TableHead>
            <TableHead className="text-gray-700">支払い方法</TableHead>
            <TableHead className="text-gray-700">ステータス</TableHead>
            <TableHead className="text-gray-700">支払い日</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repaymentSchedule.map((schedule) => (
            <TableRow
              key={schedule.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="flex items-center gap-2 text-gray-800">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                {schedule.scheduledDate}
              </TableCell>
              <TableCell className="text-gray-900 font-medium">
                ¥{schedule.amount.toLocaleString()}
              </TableCell>
              <TableCell className="text-gray-900 font-medium">
                {schedule.paymentMethod}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    schedule.status === "完了"
                      ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                      : schedule.status === "未払い"
                        ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-50"
                        : "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50"
                  }
                >
                  {schedule.status}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center gap-2 text-gray-800">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                {schedule.paidDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
