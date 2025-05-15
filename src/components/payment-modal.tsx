"use client";

import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { Label } from "@/components/ui/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle, CreditCard } from "lucide-react";
import { useState } from "react";

type PaymentModalProps = {
  amount: number;
  dueDate: Date;
};

export function PaymentModal({ amount, dueDate }: PaymentModalProps) {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    // 実際のプロジェクトではここでAPIを呼び出して支払い処理を行う
    例: await fetch("/api/scholarship/make-payment", {
      method: "POST",
      body: JSON.stringify({ amount, method: paymentMethod }),
    });

    // 処理完了を模擬するための遅延
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsProcessing(false);
    setIsComplete(true);
  };

  const resetAndClose = () => {
    setIsComplete(false);
    setOpen(false);
  };

  const formattedDate = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dueDate);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full max-w-xs">
          <CreditCard className="mr-2 h-4 w-4" />
          今月の支払いを行う
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {!isComplete ? (
          <>
            <DialogHeader>
              <DialogTitle>支払い確認</DialogTitle>
              <DialogDescription>
                {formattedDate}までに支払う必要がある{formatCurrency(amount)}
                の支払いを行います。
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  金額
                </Label>
                <div className="col-span-3 font-medium">
                  {formatCurrency(amount)}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="due-date" className="text-right">
                  期限
                </Label>
                <div className="col-span-3">{formattedDate}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="payment-method" className="text-right">
                  支払い方法
                </Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="支払い方法を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">銀行振込</SelectItem>
                    <SelectItem value="credit">クレジットカード</SelectItem>
                    <SelectItem value="convenience">コンビニ支払い</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? "処理中..." : "支払いを確定する"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <DialogTitle className="text-xl mb-2">支払い完了</DialogTitle>
              <DialogDescription className="mb-6">
                {formatCurrency(amount)}の支払いが正常に処理されました。
                ご入金ありがとうございます。
              </DialogDescription>
              <Button onClick={resetAndClose}>閉じる</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
