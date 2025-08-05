"use client";

// import { DeletePaymentModal } from "@/components/delete-payment-modal";
// import { EditPaymentModal } from "@/components/edit-payment-modal";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ViewPaymentModal } from "@/components/view-payment-modal";
// import { formatCurrency, formatDate } from "@/lib/utils";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { formatJapaneseDate } from "@/utils/formatJapaneseDate";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/shadcn/button";
import { DropdownMenuTrigger } from "./ui/shadcn/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/shadcn/table";

// 型定義
// type Payment = {
//   id: string;
//   date: Date;
//   amount: number;
//   status: string;
//   method: string;
//   description: string;
//   transactionId: string;
// };

export function PaymentTable() {
  const { schedules, isLoading, error, totalCreditAmount } =
    useRepaymentSchedule();

  // const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  // const [deletingPayment, setDeletingPayment] = useState<Payment | null>(null);
  // const [viewingPayment, setViewingPayment] = useState<Payment | null>(null);

  // const getStatusBadge = (status: string) => {
  //   switch (status) {
  //     case "完了":
  //       return (
  //         <Badge className="bg-freee-green-50 text-freee-green-700 border-freee-green-200 hover:bg-freee-green-50">
  //           完了
  //         </Badge>
  //       );
  //     case "保留":
  //       return (
  //         <Badge className="bg-freee-orange-50 text-freee-orange-700 border-freee-orange-200 hover:bg-freee-orange-50">
  //           保留
  //         </Badge>
  //       );
  //     case "失敗":
  //       return (
  //         <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">
  //           失敗
  //         </Badge>
  //       );
  //     default:
  //       return (
  //         <Badge className="bg-freee-gray-50 text-freee-gray-700 border-freee-gray-200 hover:bg-freee-gray-50">
  //           {status}
  //         </Badge>
  //       );
  //   }
  // };

  return (
    <>
      <div className="rounded-lg border border-freee-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-freee-gray-50 hover:bg-freee-gray-50">
              <TableHead className="text-freee-gray-700 font-medium">
                支払い日
              </TableHead>
              <TableHead className="text-freee-gray-700 font-medium">
                説明
              </TableHead>
              <TableHead className="text-freee-gray-700 font-medium">
                金額
              </TableHead>
              <TableHead className="text-freee-gray-700 font-medium">
                ステータス
              </TableHead>
              <TableHead className="text-freee-gray-700 font-medium">
                支払い方法
              </TableHead>
              <TableHead className="text-freee-gray-700 font-medium w-[50px]">
                操作
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((repayment) => (
              <TableRow
                key={repayment.id}
                className="hover:bg-freee-gray-50 transition-colors"
              >
                <TableCell className="text-freee-gray-800 font-medium">
                  {formatJapaneseDate(repayment.paidDate)}
                </TableCell>
                <TableCell className="text-freee-gray-800 font-medium">
                  {/* {repayment.transactionName} */}
                  paymentMethod
                </TableCell>
                <TableCell className="text-freee-gray-900 font-bold">
                  ¥{repayment.amount.toLocaleString()}
                </TableCell>
                {/* <TableCell>{getStatusBadge(repayment.status)}</TableCell> */}
                <TableCell>{repayment.id}</TableCell>

                <TableCell className="text-freee-gray-700 max-w-[200px] truncate">
                  {/* {repayment.transactionName}
                   */}
                  transactionName
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-freee-gray-500 hover:text-freee-gray-700"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    {/* <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem
                        onClick={() => setViewingPayment(payment)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        詳細表示
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setEditingPayment(payment)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        編集
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingPayment(payment)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        削除
                      </DropdownMenuItem>
                    </DropdownMenuContent> */}
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ページネーション */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-freee-gray-600">
          {/* {repayments.length}件中 1-{Math.min(10, repayments.length)}件を表示 */}
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled
            className="border-freee-gray-300 text-freee-gray-700"
          >
            前へ
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-freee-gray-300 text-freee-gray-700 hover:bg-freee-gray-50"
          >
            次へ
          </Button>
        </div>
      </div>

      {/* モーダル
      {editingPayment && (
        <EditPaymentModal
          payment={editingPayment}
          onClose={() => setEditingPayment(null)}
        />
      )}
      {deletingPayment && (
        <DeletePaymentModal
          payment={deletingPayment}
          onClose={() => setDeletingPayment(null)}
        />
      )}
      {viewingPayment && (
        <ViewPaymentModal
          payment={viewingPayment}
          onClose={() => setViewingPayment(null)}
        />
      )} */}
    </>
  );
}
