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
  schedule: RepaymentScheduleType[];
  isLoading: boolean;
  error: string | null;
};

const RepaymentContext = createContext<RepaymentContextType | undefined>(
  undefined
);

export const RepaymentProvider = ({ children }: { children: ReactNode }) => {
  const [schedule, setSchedule] = useState<RepaymentScheduleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const items = await getRepaymentSchedule();
        setSchedule(items);
      } catch (err: any) {
        setError(err.message || "取得失敗");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <RepaymentContext.Provider value={{ schedule, isLoading, error }}>
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
