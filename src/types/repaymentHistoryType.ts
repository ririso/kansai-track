import { RepaymentStatus } from "./enums/repaymentStatus";

export type RepaymentHistoryType = {
  id: string;
  amount: number;
  newStatus: RepaymentStatus;
  oldStatus: RepaymentStatus;
  updatedAt: string; //todo 型を確認する
  note: string;
};
