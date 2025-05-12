import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { Card, CardContent } from "@/components/ui/shadcn/card";

export function PaymentHistory() {
  // TODO
  // DBから取得するよう修正する
  // propsで渡されるべきもの
  const payments = [
    {
      id: "1",
      date: "2025年5月10日",
      amount: "¥15,000",
      status: "完了",
      method: "銀行振込",
    },
    {
      id: "2",
      date: "2025年4月10日",
      amount: "¥15,000",
      status: "完了",
      method: "銀行振込",
    },
    {
      id: "3",
      date: "2025年3月10日",
      amount: "¥15,000",
      status: "完了",
      method: "銀行振込",
    },
    {
      id: "4",
      date: "2025年2月10日",
      amount: "¥15,000",
      status: "完了",
      method: "銀行振込",
    },
  ];

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <Card key={payment.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-4">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="/placeholder.svg?height=36&width=36"
                  alt="Avatar"
                />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {payment.date}
                </p>
                <p className="text-sm text-muted-foreground">
                  {payment.method}
                </p>
              </div>
              <div className="ml-auto flex flex-col items-end gap-1">
                <p className="text-sm font-medium leading-none">
                  {payment.amount}
                </p>
                <p className="text-xs text-emerald-500">{payment.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
