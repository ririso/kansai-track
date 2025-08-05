"use client";

import { getRepaymentSchedule } from "@/lib/api/getRepaymentSchedule";
import { RepaymentScheduleType } from "@/types/repaymentScheduleType";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type RepaymentContextType = {
  schedules: RepaymentScheduleType[];
  isLoading: boolean;
  error: string | null;
  totalCreditAmount: number;
};

const RepaymentContext = createContext<RepaymentContextType | undefined>(
  undefined
);

export const RepaymentProvider = ({ children }: { children: ReactNode }) => {
  const [schedules, setSchedules] = useState<RepaymentScheduleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCreditAmount, setTotalCreditAmount] = useState<number>(0);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const repaymentSchedules = await getRepaymentSchedule();
        setSchedules(repaymentSchedules);

        const total = repaymentSchedules.reduce(
          (sum: number, item: { amount: number }) => sum + (item.amount ?? 0),
          0
        );
        setTotalCreditAmount(total);
      } catch (err: any) {
        setError(err.message || "取得失敗");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <RepaymentContext.Provider
      value={{ schedules, isLoading, error, totalCreditAmount }}
    >
      {children}
    </RepaymentContext.Provider>
  );
};

export const useRepaymentSchedule = () => {
  const context = useContext(RepaymentContext);
  if (!context)
    throw new Error(
      "useRepaymentSchedule must be used within a RepaymentProvider"
    );
  return context;
};
