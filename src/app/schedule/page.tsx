"use client";
import ReturnLink from "@/components/common/ReturnLink";
import ScheduleMain from "@/components/page/schedule/ScheduleMain";
import RepaymentCount from "@/components/repayment/RepaymentCount";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";

export default function SchedulePage() {
  const { schedules, isLoading, error, totalCreditAmount, totalScheduleCount } =
    useRepaymentSchedule();

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <>
        <div className="grid gap-6">
          <ReturnLink href="/dashboard" label="ダッシュボードに戻る" />
          <RepaymentCount />

          <main className="flex-1 p-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  返済スケジュール管理
                </h2>
                <p className="text-gray-600">
                  今後の返済予定と過去の支払い履歴を確認できます。
                </p>
              </div>

              <ScheduleMain />

              {/* 注意事項 */}
              <Card className="border-0 shadow-custom mt-6 animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">i</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        ご注意
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 支払い期限の7日前にメール通知をお送りします</li>
                        <li>
                          • 支払い方法の変更は各支払い予定日の10日前まで可能です
                        </li>
                        <li>• 遅延がある場合は、お早めにお支払いください</li>
                        <li>
                          •
                          ご不明な点がございましたら、サポートまでお問い合わせください
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </>
    </div>
  );
}
