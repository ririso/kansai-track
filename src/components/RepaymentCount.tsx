import { TOTAL_SCHOLARSHIP_AMOUNT } from "@/app/constants/scholarship";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { AlertTriangle, CalendarIcon, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "./ui/shadcn/card";

// Propsの型を定義
type Props = {
  totalCreditAmount: number;
};

export default function RepaymentCount() {
  const { schedules, isLoading, error, totalCreditAmount } =
    useRepaymentSchedule();
  const remainingAmount = TOTAL_SCHOLARSHIP_AMOUNT - totalCreditAmount;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
      <Card className="border-0 card-hover animate-fade-in bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                総スケジュール数
              </p>
              <p className="text-2xl font-bold text-gray-900">100</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <CalendarIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 card-hover animate-fade-in bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">完了済み</p>
              <p className="text-2xl font-bold text-green-600">10件</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 card-hover animate-fade-in bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">予定</p>
              <p className="text-2xl font-bold text-orange-600">{100}件</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 card-hover animate-fade-in bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">遅延</p>
              <p className="text-2xl font-bold text-red-600">{10}件</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <AlertTriangle className="text-red-600 font-bold text-lg" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
