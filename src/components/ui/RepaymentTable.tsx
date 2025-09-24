import { RepaymentScheduleType } from "@/types/repaymentScheduleType";
import { DateWithIcon } from "./DateWithIcon";
import { RepaymentStatusBadge } from "./RepaymentStatusBadge";
import { DummyRow } from "../repayment/DummyRow";

interface RepaymentTableProps {
  schedules: RepaymentScheduleType[];
  showDummyRows?: boolean;
  itemsPerPage?: number;
  tableFixed?: boolean;
  className?: string;
}

export function RepaymentTable({
  schedules,
  showDummyRows = false,
  itemsPerPage = 5,
  tableFixed = false,
  className = ""
}: RepaymentTableProps) {
  const emptyRowCount = showDummyRows ? Math.max(0, itemsPerPage - schedules.length) : 0;
  const tableClasses = `w-full caption-bottom text-sm ${tableFixed ? 'table-fixed' : ''}`;

  return (
    <div className={`rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <table className={tableClasses}>
        <thead className="[&_tr]:border-b bg-gray-50">
          <tr className="border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-semibold text-gray-700 [&:has([role=checkbox])]:pr-0">
              支払い予定日
            </th>
            <th className="h-12 px-4 text-left align-middle font-semibold text-gray-700 [&:has([role=checkbox])]:pr-0">
              支払い日
            </th>
            <th className="h-12 px-4 text-left align-middle font-semibold text-gray-700 [&:has([role=checkbox])]:pr-0">
              金額(円)
            </th>
            <th className="h-12 px-4 text-left align-middle font-semibold text-gray-700 [&:has([role=checkbox])]:pr-0">
              ステータス
            </th>
            <th className="h-12 px-4 text-left align-middle font-semibold text-gray-700 [&:has([role=checkbox])]:pr-0">
              支払い方法
            </th>
            <th className="h-12 px-4 text-left align-middle font-semibold text-gray-700 [&:has([role=checkbox])]:pr-0">
              支払い区分
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {/* 実データ行 */}
          {schedules.map((schedule: RepaymentScheduleType) => (
            <tr
              key={schedule.id}
              className="border-b transition-colors hover:bg-blue-50 data-[state=selected]:bg-muted"
            >
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                <DateWithIcon date={schedule.scheduledDate} />
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                <DateWithIcon date={schedule.paidDate} />
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <span className="text-gray-900 font-bold">
                  {schedule.amount.toLocaleString()}
                </span>
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <RepaymentStatusBadge status={schedule.status} />
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <span className="text-gray-700">
                  {schedule.paymentMethod || "未設定"}
                </span>
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <span className="text-gray-700">
                  {schedule.paymentCategory}
                </span>
              </td>
            </tr>
          ))}

          {/* 高さを揃えるためのダミー行 */}
          {showDummyRows && emptyRowCount > 0 && (
            <DummyRow emptyRowCount={emptyRowCount} />
          )}
        </tbody>
      </table>
    </div>
  );
}