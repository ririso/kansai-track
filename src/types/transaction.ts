export interface Transaction {
  paidDate: string; // 日付
  transactionName: string; // 内容
  credit: number; // 支払い金額
  note?: string; // メモは存在しない場合があるので
}
