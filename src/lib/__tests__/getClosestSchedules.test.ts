import { getClosestSchedules } from "../getClosestSchedules";
import { RepaymentScheduleType } from "@/types/repaymentScheduleType";
import { RepaymentStatus } from "@/types/enums/repaymentStatus";
import { PaymentMethod } from "@/types/enums/paymentMethod";
import { PaymentCategory } from "@/types/enums/paymentCategory";

const createMockSchedule = (id: string, scheduledDate: string): RepaymentScheduleType => ({
  id,
  amount: 15000,
  scheduledDate,
  paidDate: null,
  status: RepaymentStatus.Scheduled,
  paymentMethod: PaymentMethod.BankTransfer,
  paymentCategory: PaymentCategory.Normal,
});

describe("getClosestSchedules", () => {
  const mockSchedules: RepaymentScheduleType[] = [
    createMockSchedule("1", "2024-01-10"),
    createMockSchedule("2", "2024-02-10"),
    createMockSchedule("3", "2024-03-10"),
    createMockSchedule("4", "2024-04-10"),
    createMockSchedule("5", "2024-05-10"),
    createMockSchedule("6", "2024-06-10"),
  ];

  it("指定した日付に最も近いスケジュールを中心に指定数返す", () => {
    const targetDate = new Date("2024-03-15");
    const result = getClosestSchedules(mockSchedules, targetDate, 3);

    expect(result).toHaveLength(3);
    expect(result[0].id).toBe("2"); // 2024-02-10
    expect(result[1].id).toBe("3"); // 2024-03-10 (最も近い)
    expect(result[2].id).toBe("4"); // 2024-04-10
  });

  it("配列の最初の要素が最も近い場合も正しく動作する", () => {
    const targetDate = new Date("2024-01-05");
    const result = getClosestSchedules(mockSchedules, targetDate, 3);

    expect(result).toHaveLength(3);
    expect(result[0].id).toBe("1"); // 2024-01-10 (最も近い)
    expect(result[1].id).toBe("2"); // 2024-02-10
    expect(result[2].id).toBe("3"); // 2024-03-10
  });

  it("配列の最後の要素が最も近い場合も正しく動作する", () => {
    const targetDate = new Date("2024-06-15");
    const result = getClosestSchedules(mockSchedules, targetDate, 3);

    expect(result).toHaveLength(3);
    expect(result[0].id).toBe("4"); // 2024-04-10
    expect(result[1].id).toBe("5"); // 2024-05-10
    expect(result[2].id).toBe("6"); // 2024-06-10 (最も近い)
  });

  it("要求する表示数が配列長より大きい場合は全て返す", () => {
    const targetDate = new Date("2024-03-15");
    const result = getClosestSchedules(mockSchedules, targetDate, 10);

    expect(result).toHaveLength(6);
    expect(result.map(s => s.id)).toEqual(["1", "2", "3", "4", "5", "6"]);
  });

  it("空の配列の場合は空配列を返す", () => {
    const targetDate = new Date("2024-03-15");
    const result = getClosestSchedules([], targetDate, 3);

    expect(result).toHaveLength(0);
  });

  it("1つの要素のみの場合は正しく動作する", () => {
    const singleSchedule = [createMockSchedule("1", "2024-03-10")];
    const targetDate = new Date("2024-03-15");
    const result = getClosestSchedules(singleSchedule, targetDate, 3);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("日付が完全に一致する場合も正しく動作する", () => {
    const targetDate = new Date("2024-03-10");
    const result = getClosestSchedules(mockSchedules, targetDate, 3);

    expect(result).toHaveLength(3);
    expect(result[1].id).toBe("3"); // 完全一致
    expect(result[1].scheduledDate).toBe("2024-03-10");
  });
});