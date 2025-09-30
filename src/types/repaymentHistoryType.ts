import { RepaymentStatus } from "./enums/repaymentStatus";

export type RepaymentHistoryType = {
  id: string;
  amount: number;
  status: RepaymentStatus;
  beforeStatus: RepaymentStatus;
  updatedAt: string | null; // ISO 8601形式の文字列またはnull
  note: string;
  paymentCategory?: string;
};
