"use client";

import { Button } from "@/components/ui/shadcn/button";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

type PaymentContentProps = {
  amount: number;
  dueDate: Date;
  onComplete: () => void;
};

export function PaymentContent({
  amount,
  dueDate,
  onComplete,
}: PaymentContentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setIsComplete(true);
    onComplete();
  };

  if (isComplete) {
    return (
      <div className="text-center">
        <CheckCircle className="mx-auto mb-4 text-green-500 w-12 h-12" />
        {/* <p>{formatCurrency(amount)}の支払いが完了しました。</p> */}
        <p>{amount}の支払いが完了しました。</p>
      </div>
    );
  }

  return (
    <div>
      {/* <p>{formatCurrency(amount)} を支払います（期限：{dueDate.toLocaleDateString("ja-JP")}）</p> */}
      <p>
        {amount} を支払います（期限：{dueDate.toLocaleDateString("ja-JP")}）
      </p>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={onComplete}>
          キャンセル
        </Button>
        <Button onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? "処理中..." : "支払いを確定する"}
        </Button>
      </div>
    </div>
  );
}
