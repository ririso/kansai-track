"use client";

import { fetchRepaymentHistory } from "@/lib/api/getRepaymentHistory";
import { getRepaymentSchedule } from "@/lib/api/getRepaymentSchedule";
import { RepaymentStatus } from "@/types/enums/repaymentStatus";
import { RepaymentHistoryType } from "@/types/repaymentHistoryType";
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
  repaymentHistories: RepaymentHistoryType[];
  isLoading: boolean;
  error: string | null;
  totalCreditAmount: number;
  totalScheduleCount: number;
  completedScheduleCount: number;
  scheduledScheduleCount: number;
  delayedScheduleCount: number;
};

const RepaymentContext = createContext<RepaymentContextType | undefined>(
  undefined
);

export const RepaymentProvider = ({ children }: { children: ReactNode }) => {
  const [schedules, setSchedules] = useState<RepaymentScheduleType[]>([]);
  const [repaymentHistories, setRepaymentHistories] = useState<
    RepaymentHistoryType[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCreditAmount, setTotalCreditAmount] = useState<number>(0);
  const [totalScheduleCount, setTotalScheduleCount] = useState<number>(0);
  const [completedScheduleCount, setCompletedScheduleCount] =
    useState<number>(0);
  const [scheduledScheduleCount, setScheduledScheduleCount] =
    useState<number>(0);
  const [delayedScheduleCount, setDelayedScheduleCount] = useState<number>(0);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const repaymentSchedules: RepaymentScheduleType[] =
          await getRepaymentSchedule();
        setSchedules(repaymentSchedules);

        const totalAmount = repaymentSchedules.reduce(
          (sum: number, item: { amount: number }) => sum + (item.amount ?? 0),
          0
        );
        // 合計金額の算出
        setTotalCreditAmount(totalAmount);
        // スケジュールの総数
        setTotalScheduleCount(repaymentSchedules.length);

        // 各スケジュールのステータスをカウント
        const completedCount = repaymentSchedules.filter(
          (repaymentSchedule) =>
            repaymentSchedule.status === RepaymentStatus.Completed
        ).length;

        const scheduledCount = repaymentSchedules.filter(
          (repaymentSchedule) =>
            repaymentSchedule.status === RepaymentStatus.Scheduled
        ).length;

        const delayedCount = repaymentSchedules.filter(
          (repaymentSchedule) =>
            repaymentSchedule.status === RepaymentStatus.Delayed
        ).length;

        const repaymentHistories: RepaymentHistoryType[] =
          await fetchRepaymentHistory();

        setRepaymentHistories(repaymentHistories);
        setCompletedScheduleCount(completedCount);
        setScheduledScheduleCount(scheduledCount);
        setDelayedScheduleCount(delayedCount);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "取得失敗";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <RepaymentContext.Provider
      value={{
        schedules,
        repaymentHistories,
        isLoading,
        error,
        totalCreditAmount,
        totalScheduleCount,
        completedScheduleCount,
        scheduledScheduleCount,
        delayedScheduleCount,
      }}
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
