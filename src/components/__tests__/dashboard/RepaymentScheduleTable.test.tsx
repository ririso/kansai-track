import { RepaymentSchedule } from "@/components/dashboard/RepaymentScheduleTable";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// lucide-reactアイコンをモック
jest.mock("lucide-react", () => ({
  CalendarIcon: () => <svg data-testid="calendar-icon" />,
}));

// Badgeコンポーネントをモック
jest.mock("@/components/ui/shadcn/badge", () => ({
  Badge: ({ children, variant, className, ...props }: any) => (
    <span
      data-testid="badge"
      data-variant={variant}
      className={className}
      {...props}
    >
      {children}
    </span>
  ),
}));

// RepaymentStatusをモック
jest.mock("@/types/enums/repaymentStatus", () => ({
  RepaymentStatus: {
    Completed: "完了",
    Delayed: "遅延",
    Pending: "未完了",
  },
}));

// getClosestSchedulesをモック
const mockSchedules = [
  {
    id: "1",
    scheduledDate: "2024-01-15",
    paidDate: "2024-01-15",
    amount: 50000,
    status: "完了",
    paymentMethod: "クレジットカード",
    paymentCategory: "生活費",
  },
  {
    id: "2",
    scheduledDate: "2024-01-25",
    paidDate: null,
    amount: 75000,
    status: "遅延",
    paymentMethod: "銀行振込",
    paymentCategory: "住宅費",
  },
  {
    id: "3",
    scheduledDate: "2024-02-05",
    paidDate: null,
    amount: 30000,
    status: "未完了",
    paymentMethod: null,
    paymentCategory: "食費",
  },
];

jest.mock("@/lib/getClosestSchedules", () => ({
  getClosestSchedules: jest.fn(() => mockSchedules),
}));

// RepaymentContextをモック
const mockRepaymentScheduleContext = {
  schedules: mockSchedules,
  isLoading: false,
  error: null,
};

jest.mock("@/contexts/RepaymentContext", () => ({
  useRepaymentSchedule: jest.fn(() => mockRepaymentScheduleContext),
}));

describe("RepaymentScheduleTable component", () => {
  beforeEach(() => {
    const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
    const { getClosestSchedules } = require("@/lib/getClosestSchedules");

    useRepaymentSchedule.mockReturnValue(mockRepaymentScheduleContext);
    getClosestSchedules.mockReturnValue(mockSchedules);
  });

  it("スケジュールテーブルが表示される", () => {
    render(<RepaymentSchedule />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    const rowgroups = screen.getAllByRole("rowgroup");
    expect(rowgroups).toHaveLength(2); // thead と tbody
  });

  it("テーブルヘッダーが正しく表示される", () => {
    render(<RepaymentSchedule />);

    expect(screen.getByText("支払い予定日")).toBeInTheDocument();
    expect(screen.getByText("支払い日")).toBeInTheDocument();
    expect(screen.getByText("金額(円)")).toBeInTheDocument();
    expect(screen.getByText("ステータス")).toBeInTheDocument();
    expect(screen.getByText("支払い方法")).toBeInTheDocument();
    expect(screen.getByText("支払い区分")).toBeInTheDocument();
  });

  it("スケジュールデータが正しく表示される", () => {
    render(<RepaymentSchedule />);

    // 日付の表示（複数存在する場合はgetAllByTextを使用）
    expect(screen.getAllByText("2024-01-15")).toHaveLength(2); // 予定日と支払い日
    expect(screen.getByText("2024-01-25")).toBeInTheDocument();
    expect(screen.getByText("2024-02-05")).toBeInTheDocument();

    // 金額の表示
    expect(screen.getByText("50,000")).toBeInTheDocument();
    expect(screen.getByText("75,000")).toBeInTheDocument();
    expect(screen.getByText("30,000")).toBeInTheDocument();

    // ステータスの表示
    expect(screen.getByText("完了")).toBeInTheDocument();
    expect(screen.getByText("遅延")).toBeInTheDocument();
    expect(screen.getByText("未完了")).toBeInTheDocument();

    // 支払い方法の表示
    expect(screen.getByText("クレジットカード")).toBeInTheDocument();
    expect(screen.getByText("銀行振込")).toBeInTheDocument();
    expect(screen.getByText("未設定")).toBeInTheDocument();

    // 支払い区分の表示
    expect(screen.getByText("生活費")).toBeInTheDocument();
    expect(screen.getByText("住宅費")).toBeInTheDocument();
    expect(screen.getByText("食費")).toBeInTheDocument();
  });

  it("カレンダーアイコンが表示される", () => {
    render(<RepaymentSchedule />);

    const calendarIcons = screen.getAllByTestId("calendar-icon");
    expect(calendarIcons).toHaveLength(6); // 各行に2つずつ（予定日と支払い日）
  });

  it("Badgeコンポーネントが表示される", () => {
    render(<RepaymentSchedule />);

    const badges = screen.getAllByTestId("badge");
    expect(badges).toHaveLength(3); // 各行に1つずつ

    badges.forEach(badge => {
      expect(badge).toHaveAttribute("data-variant", "outline");
    });
  });

  it("空の値に対してハイフンが表示される", () => {
    render(<RepaymentSchedule />);

    const dashes = screen.getAllByText("-");
    expect(dashes).toHaveLength(2); // paidDateがnullの場合
  });

  it("テーブルのスタイルが適用される", () => {
    render(<RepaymentSchedule />);

    const table = screen.getByRole("table");
    const tableContainer = table.parentElement;

    expect(tableContainer).toHaveClass(
      "rounded-lg",
      "border",
      "border-gray-200",
      "overflow-hidden"
    );

    expect(table).toHaveClass("w-full", "caption-bottom", "text-sm");
  });

  it("ヘッダーのスタイルが適用される", () => {
    render(<RepaymentSchedule />);

    const rowgroups = screen.getAllByRole("rowgroup");
    const thead = rowgroups[0]; // 最初のrowgroupはthead
    expect(thead).toHaveClass("[&_tr]:border-b", "bg-gray-50");

    const headerCells = screen.getAllByRole("columnheader");
    headerCells.forEach(cell => {
      expect(cell).toHaveClass(
        "h-12",
        "px-4",
        "text-left",
        "align-middle",
        "font-semibold",
        "text-gray-700"
      );
    });
  });

  it("行のスタイルが適用される", () => {
    render(<RepaymentSchedule />);

    const rowgroups = screen.getAllByRole("rowgroup");
    const tbody = rowgroups[1]; // 2番目のrowgroupはtbody
    const rows = tbody.querySelectorAll("tr");

    rows.forEach(row => {
      expect(row).toHaveClass(
        "border-b",
        "transition-colors",
        "hover:bg-blue-50"
      );
    });
  });

  it("ローディング状態が表示される", () => {
    const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
    useRepaymentSchedule.mockReturnValue({
      ...mockRepaymentScheduleContext,
      isLoading: true,
    });

    render(<RepaymentSchedule />);

    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("エラー状態が表示される", () => {
    const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
    useRepaymentSchedule.mockReturnValue({
      ...mockRepaymentScheduleContext,
      error: "データの取得に失敗しました",
    });

    render(<RepaymentSchedule />);

    expect(screen.getByText("エラー: データの取得に失敗しました")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("getClosestSchedulesが正しく呼び出される", () => {
    const { getClosestSchedules } = require("@/lib/getClosestSchedules");

    render(<RepaymentSchedule />);

    expect(getClosestSchedules).toHaveBeenCalledWith(
      mockSchedules,
      expect.any(Date),
      5
    );
  });

  describe("ステータス別のスタイリング", () => {
    it("完了ステータスのスタイルが適用される", () => {
      render(<RepaymentSchedule />);

      const badges = screen.getAllByTestId("badge");
      const completedBadge = badges.find(badge => badge.textContent === "完了");

      expect(completedBadge).toHaveClass(
        "bg-green-50",
        "text-green-700",
        "border-green-200",
        "hover:bg-green-50"
      );
    });

    it("遅延ステータスのスタイルが適用される", () => {
      render(<RepaymentSchedule />);

      const badges = screen.getAllByTestId("badge");
      const delayedBadge = badges.find(badge => badge.textContent === "遅延");

      expect(delayedBadge).toHaveClass(
        "bg-red-50",
        "text-red-700",
        "border-red-200",
        "hover:bg-red-50"
      );
    });

    it("未完了ステータスのスタイルが適用される", () => {
      render(<RepaymentSchedule />);

      const badges = screen.getAllByTestId("badge");
      const pendingBadge = badges.find(badge => badge.textContent === "未完了");

      expect(pendingBadge).toHaveClass(
        "bg-orange-50",
        "text-orange-700",
        "border-orange-200",
        "hover:bg-orange-50"
      );
    });
  });

  describe("データ形式のテスト", () => {
    it("大きな金額でも正しく表示される", () => {
      const { getClosestSchedules } = require("@/lib/getClosestSchedules");
      getClosestSchedules.mockReturnValue([
        {
          id: "large",
          scheduledDate: "2024-01-01",
          paidDate: "2024-01-01",
          amount: 1234567,
          status: "完了",
          paymentMethod: "振込",
          paymentCategory: "その他",
        },
      ]);

      render(<RepaymentSchedule />);

      expect(screen.getByText("1,234,567")).toBeInTheDocument();
    });

    it("空のスケジュールでも正しく動作する", () => {
      const { getClosestSchedules } = require("@/lib/getClosestSchedules");
      getClosestSchedules.mockReturnValue([]);

      render(<RepaymentSchedule />);

      expect(screen.getByRole("table")).toBeInTheDocument();
      const rowgroups = screen.getAllByRole("rowgroup");
      expect(rowgroups).toHaveLength(2);

      const tbody = rowgroups[1]; // 2番目のrowgroupはtbody
      expect(tbody.children).toHaveLength(0);
    });
  });

  describe("統合テスト", () => {
    it("完全なテーブル構造が正しく表示される", () => {
      render(<RepaymentSchedule />);

      // テーブル全体の存在確認
      expect(screen.getByRole("table")).toBeInTheDocument();

      // ヘッダーの確認
      const headerCells = screen.getAllByRole("columnheader");
      expect(headerCells).toHaveLength(6);

      // データ行の確認
      const rowgroups = screen.getAllByRole("rowgroup");
      const tbody = rowgroups[1]; // 2番目のrowgroupはtbody
      const dataRows = tbody.querySelectorAll("tr");
      expect(dataRows).toHaveLength(3);

      // 各行のセル数確認
      dataRows.forEach(row => {
        const cells = row.querySelectorAll("td");
        expect(cells).toHaveLength(6);
      });
    });

    it("アイコンとデータが正しく関連付けられる", () => {
      render(<RepaymentSchedule />);

      const rowgroups = screen.getAllByRole("rowgroup");
      const tbody = rowgroups[1]; // 2番目のrowgroupはtbody
      const rows = tbody.querySelectorAll("tr");

      // 各行に予定日と支払い日のアイコンが表示される
      rows.forEach(row => {
        const calendarIcons = row.querySelectorAll('[data-testid="calendar-icon"]');
        expect(calendarIcons).toHaveLength(2);
      });
    });
  });
});