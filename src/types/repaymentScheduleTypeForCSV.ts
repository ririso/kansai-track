import { PaymentCategory } from "./enums/paymentCategory";
import { PaymentMethod } from "./enums/paymentMethod";
import { RepaymentStatus } from "./enums/repaymentStatus";

export type repaymentScheduleTypeForCSV = {
  id: string;
  amount: number;
  paidDate: string;
  scheduledDate: string;
  status: RepaymentStatus;
  beforeStatus: RepaymentStatus;
  paymentMethod: PaymentMethod;
  paymentCategory: PaymentCategory;
  hasCSVUpdate: boolean;
};
