import { Card, CardContent } from "@/components/ui/shadcn/card";
import { CreditCard, FileText, RefreshCw } from "lucide-react";

export function RecentActivity() {
  // NOTE: このコンポーネントはバックアップファイルです
  // 本番では useRepaymentSchedule context や API から実データを取得する必要があります
  // 現在はダミーデータを使用しています
  const activities = [
    {
      id: "1",
      icon: <CreditCard className="h-4 w-4" />,
      title: "支払い完了",
      description: "5月分の返済が完了しました",
      date: "2025年5月10日",
    },
    {
      id: "2",
      icon: <FileText className="h-4 w-4" />,
      title: "返済証明書発行",
      description: "2024年度の返済証明書が発行されました",
      date: "2025年4月15日",
    },
    {
      id: "3",
      icon: <RefreshCw className="h-4 w-4" />,
      title: "返済計画更新",
      description: "返済計画が更新されました",
      date: "2025年4月1日",
    },
    {
      id: "4",
      icon: <CreditCard className="h-4 w-4" />,
      title: "支払い完了",
      description: "4月分の返済が完了しました",
      date: "2025年4月10日",
    },
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border">
                {activity.icon}
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <div className="ml-auto text-xs text-muted-foreground">
                {activity.date}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
