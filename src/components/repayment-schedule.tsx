import { Badge } from "@/components/ui/shadcn/budge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { CalendarIcon } from "lucide-react";

export function RepaymentSchedule() {
  // TODO
  // DBから取得するよう修正する
  // propsで渡されるべきもの
  const schedules = [
    {
      id: "1",
      date: "2025年6月10日",
      amount: "¥15,000",
      status: "予定",
      remaining: "¥2,085,000",
    },
    {
      id: "2",
      date: "2025年7月10日",
      amount: "¥15,000",
      status: "予定",
      remaining: "¥2,070,000",
    },
    {
      id: "3",
      date: "2025年8月10日",
      amount: "¥15,000",
      status: "予定",
      remaining: "¥2,055,000",
    },
    {
      id: "4",
      date: "2025年9月10日",
      amount: "¥15,000",
      status: "予定",
      remaining: "¥2,040,000",
    },
    {
      id: "5",
      date: "2025年10月10日",
      amount: "¥15,000",
      status: "予定",
      remaining: "¥2,025,000",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>日付</TableHead>
          <TableHead>金額</TableHead>
          <TableHead>ステータス</TableHead>
          <TableHead className="text-right">残額</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedules.map((schedule) => (
          <TableRow key={schedule.id}>
            <TableCell className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              {schedule.date}
            </TableCell>
            <TableCell>{schedule.amount}</TableCell>
            <TableCell>
              <Badge variant="outline">{schedule.status}</Badge>
            </TableCell>
            <TableCell className="text-right">{schedule.remaining}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
