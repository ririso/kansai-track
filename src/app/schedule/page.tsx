"use client";
import CSVUploader from "@/components/csv/CsvUploader";
import RepaymentCount from "@/components/repayment/RepaymentCount";
import { RepaymentScheduleDetail } from "@/components/repayment/RepaymentScheduleDetail";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { ArrowLeft, Download, Filter, Search } from "lucide-react";
import Link from "next/link";

export default function SchedulePage() {
  const { schedules, isLoading, error, totalCreditAmount, totalScheduleCount } =
    useRepaymentSchedule();

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">ダッシュボードに戻る</span>
        </Link>
        <RepaymentCount />

        <main className="flex-1 p-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* ページタイトル */}
            <div className="mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                返済スケジュール管理
              </h2>
              <p className="text-gray-600">
                今後の返済予定と過去の支払い履歴を確認できます。
              </p>
            </div>

            {/* メインコンテンツ */}

            <Card className="border-0 shadow-custom animate-fade-in">
              <CardHeader className="bg-white border-b border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="text-gray-800 text-xl">
                      返済履歴一覧
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      全{totalScheduleCount}件のスケジュール （総額: ¥
                      {totalCreditAmount.toLocaleString()})
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="日付や金額で検索..."
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>

                    <CSVUploader />
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      フィルター
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      CSVダウンロード
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <RepaymentScheduleDetail />

              <CardContent className="p-6">
                {/* 検索・フィルター */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full sm:w-[140px] border-gray-300">
                        <SelectValue placeholder="ステータス" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべて</SelectItem>
                        <SelectItem value="completed">完了</SelectItem>
                        <SelectItem value="scheduled">予定</SelectItem>
                        <SelectItem value="overdue">遅延</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full sm:w-[140px] border-gray-300">
                        <SelectValue placeholder="期間" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべて</SelectItem>
                        <SelectItem value="this-month">今月</SelectItem>
                        <SelectItem value="next-month">来月</SelectItem>
                        <SelectItem value="this-year">今年</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* ページネーション */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                  <p className="text-sm text-gray-600">
                    {totalScheduleCount}件中 1-
                    {Math.min(20, totalScheduleCount)}件を表示
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-gray-300 text-gray-400 bg-transparent"
                    >
                      前へ
                    </Button>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-blue-600 text-white border-blue-600"
                      >
                        1
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        2
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        3
                      </Button>
                      <span className="text-gray-500 px-2">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        10
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      次へ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 注意事項 */}
            <Card className="border-0 shadow-custom mt-6 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">i</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">ご注意</h3>
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
      </>
    </div>
  );
}
