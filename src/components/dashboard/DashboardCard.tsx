import { RepaymentSchedule } from "@/components/dashboard/RepaymentSchedule";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import Link from "next/link";

export default function DashboardCard() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2 border-0 shadow-custom animate-fade-in bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-gray-800">返済スケジュール</CardTitle>
            <CardDescription className="text-gray-600">
              今後の返済予定
            </CardDescription>
          </div>
          <Link href="/schedule">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              すべて表示
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <RepaymentSchedule />
        </CardContent>
      </Card>
    </div>
  );
}
