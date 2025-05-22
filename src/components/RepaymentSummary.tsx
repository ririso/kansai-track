import { DollarSign, PiggyBank } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/shadcn/card";

// Propsの型を定義
type Props = {
  totalCreditAmount: number;
};

export default function RepaymentSummary({ totalCreditAmount }: Props) {
  const totalScholarshipAmount = 2500000; // 固定値
  const remainingBalance = totalScholarshipAmount - totalCreditAmount;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">総返済額</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ¥{totalScholarshipAmount.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">奨学金の総額</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">残額</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ¥{remainingBalance.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">残りの返済額</p>
        </CardContent>
      </Card>
    </>
  );
}
