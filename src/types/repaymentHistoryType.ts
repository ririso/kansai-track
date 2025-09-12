import { RepaymentStatus } from "./enums/repaymentStatus";

export type RepaymentHistoryType = {
  id: string;
  amount: number;
  status: RepaymentStatus;
  beforeStatus: RepaymentStatus;
  updatedAt: string; //todo 型を確認する
  note: string;
};
