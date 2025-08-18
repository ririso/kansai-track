import { PaymentCategory } from "./enums/paymentCategory";
import { PaymentMethod } from "./enums/paymentMethod";
import { RepaymentStatus } from "./enums/repaymentStatus";

export type RepaymentScheduleType = {
  id: string;
  amount: number;
  paidDate: string;
  scheduledDate: string;
  status: RepaymentStatus;
  paymentMethod: PaymentMethod;
  paymentCategory: PaymentCategory;
};
