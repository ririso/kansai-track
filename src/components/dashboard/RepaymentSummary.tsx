import { TOTAL_SCHOLARSHIP_AMOUNT } from "@/app/constants/scholarship";
import { estimateYearsToRepayLoan } from "@/utils/estimateYearsToRepayLoan";
import { calculateCompletionDate } from "@/utils/calculateCompletionDate";
import { CalendarIcon, DollarSign, LineChart, PiggyBank } from "lucide-react";
import { Card, CardContent } from "../ui/shadcn/card";

// Propsの型を定義
type Props = {
  totalCreditAmount: number;
};

export default function RepaymentSummary({ totalCreditAmount }: Props) {
  const remainingAmount = TOTAL_SCHOLARSHIP_AMOUNT - totalCreditAmount;
  const completionDate = calculateCompletionDate(totalCreditAmount);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
      <Card className="border-0 card-hover animate-fade-in bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">総返済額</p>
              <p className="text-2xl font-bold text-gray-900">
                ¥{TOTAL_SCHOLARSHIP_AMOUNT.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 card-hover animate-fade-in bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">残額</p>
              <p className="text-2xl font-bold text-gray-900">
                ¥{remainingAmount.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <PiggyBank className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 card-hover animate-fade-in bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                次回支払い
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {remainingAmount.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {/* {nextPaymentDate}まで */}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <CalendarIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 card-hover animate-fade-in bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">完済予定</p>
              <p className="text-lg font-bold text-gray-900">{completionDate}</p>
              <p className="text-xs text-gray-500 mt-1">
                あと{estimateYearsToRepayLoan(totalCreditAmount)}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <LineChart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
