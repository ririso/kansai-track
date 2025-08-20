import { TOTAL_SCHOLARSHIP_AMOUNT } from "@/app/constants/scholarship";
import { calculateRepaymentProgress } from "@/utils/calculateRepaymentProgress";
import { Progress } from "@radix-ui/react-progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/shadcn/card";

// Propsの型を定義
type Props = {
  totalCreditAmount: number;
};

export default function RepaymentProgress({ totalCreditAmount }: Props) {
  const repaymentProgress = calculateRepaymentProgress(totalCreditAmount);

  return (
    <Card className="border-0 shadow-custom animate-fade-in  bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-800">返済進捗状況</CardTitle>
            <CardDescription className="text-gray-600">
              これまでに{repaymentProgress}%返済済み
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">
              {repaymentProgress}%
            </p>
            <p className="text-sm text-gray-500">完了</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Progress value={repaymentProgress} className="h-3 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${repaymentProgress}%` }}
              />
            </Progress>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>¥{0}</span>
            <span className="font-medium text-blue-600">
              ¥{(TOTAL_SCHOLARSHIP_AMOUNT / 2).toLocaleString()}
            </span>
            <span>¥{TOTAL_SCHOLARSHIP_AMOUNT.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
