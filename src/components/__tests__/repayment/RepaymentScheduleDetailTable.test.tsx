import { RepaymentScheduleDetail } from "@/components/repayment/RepaymentScheduleDetailTable";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RepaymentStatus } from "@/types/enums/repaymentStatus";
import { PaymentMethod } from "@/types/enums/paymentMethod";
import { PaymentCategory } from "@/types/enums/paymentCategory";

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

// DummyRowコンポーネントをモック
jest.mock("@/components/repayment/DummyRow", () => ({
  DummyRow: ({ emptyRowCount }: any) => (
    <tr data-testid="dummy-row" data-empty-count={emptyRowCount}>
      <td colSpan={6}>Dummy Row ({emptyRowCount} rows)</td>
    </tr>
  ),
}));

// RepaymentStatusをモック
jest.mock("@/types/enums/repaymentStatus", () => ({
  RepaymentStatus: {
    Completed: "完了",
    Delayed: "遅延",
    Scheduled: "予定",
  },
}));

// テスト用のサンプルデータ
const mockSchedules = [
  {
    id: "1",
    scheduledDate: "2024-01-15",
    paidDate: "2024-01-15",
    amount: 50000,
    status: RepaymentStatus.Completed,
    paymentMethod: PaymentMethod.Cash,
    paymentCategory: PaymentCategory.Normal,
  },
  {
    id: "2",
    scheduledDate: "2024-01-25",
    paidDate: null,
    amount: 75000,
    status: RepaymentStatus.Delayed,
    paymentMethod: PaymentMethod.BankTransfer,
    paymentCategory: PaymentCategory.Special,
  },
  {
    id: "3",
    scheduledDate: "2024-02-05",
    paidDate: null,
    amount: 30000,
    status: RepaymentStatus.Scheduled,
    paymentMethod: null,
    paymentCategory: PaymentCategory.Normal,
  },
];

describe("RepaymentScheduleDetail component", () => {
  const defaultProps = {
    paginatedSchedules: mockSchedules,
    itemsPerPage: 5,
  };

  it("テーブルが表示される", () => {
    render(<RepaymentScheduleDetail {...defaultProps} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    const rowgroups = screen.getAllByRole("rowgroup");
    expect(rowgroups).toHaveLength(2); // thead と tbody
  });

  it("テーブルヘッダーが正しく表示される", () => {
    render(<RepaymentScheduleDetail {...defaultProps} />);

    expect(screen.getByText("支払い予定日")).toBeInTheDocument();
    expect(screen.getByText("支払い日")).toBeInTheDocument();
    expect(screen.getByText("金額(円)")).toBeInTheDocument();
    expect(screen.getByText("ステータス")).toBeInTheDocument();
    expect(screen.getByText("支払い方法")).toBeInTheDocument();
    expect(screen.getByText("支払い区分")).toBeInTheDocument();
  });

  it("スケジュールデータが正しく表示される", () => {
    render(<RepaymentScheduleDetail {...defaultProps} />);

    // 日付の表示（複数存在する場合があるのでgetAllByTextを使用）
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
    expect(screen.getByText("予定")).toBeInTheDocument();

    // 支払い方法の表示
    expect(screen.getByText("手渡し")).toBeInTheDocument();
    expect(screen.getByText("銀行振込")).toBeInTheDocument();
    expect(screen.getByText("未設定")).toBeInTheDocument();

    // 支払い区分の表示
    expect(screen.getAllByText("通常")).toHaveLength(2);
    expect(screen.getByText("特別")).toBeInTheDocument();
  });

  it("カレンダーアイコンが表示される", () => {
    render(<RepaymentScheduleDetail {...defaultProps} />);

    const calendarIcons = screen.getAllByTestId("calendar-icon");
    expect(calendarIcons).toHaveLength(6); // 各行に2つずつ（予定日と支払い日）
  });

  it("Badgeコンポーネントが表示される", () => {
    render(<RepaymentScheduleDetail {...defaultProps} />);

    const badges = screen.getAllByTestId("badge");
    expect(badges).toHaveLength(3); // 各行に1つずつ

    badges.forEach(badge => {
      expect(badge).toHaveAttribute("data-variant", "outline");
    });
  });

  it("空の値に対してハイフンが表示される", () => {
    render(<RepaymentScheduleDetail {...defaultProps} />);

    const dashes = screen.getAllByText("-");
    expect(dashes).toHaveLength(2); // paidDateがnullの場合
  });

  it("DummyRowが正しく表示される", () => {
    render(<RepaymentScheduleDetail {...defaultProps} />);

    const dummyRow = screen.getByTestId("dummy-row");
    expect(dummyRow).toBeInTheDocument();
    expect(dummyRow).toHaveAttribute("data-empty-count", "2"); // 5 - 3 = 2
  });

  it("テーブルのスタイルが適用される", () => {
    render(<RepaymentScheduleDetail {...defaultProps} />);

    const table = screen.getByRole("table");
    const tableContainer = table.parentElement;

    expect(tableContainer).toHaveClass(
      "rounded-lg",
      "border",
      "border-gray-200",
      "overflow-hidden"
    );

    expect(table).toHaveClass("w-full", "caption-bottom", "text-sm", "table-fixed");
  });

  it("ヘッダーのスタイルが適用される", () => {
    render(<RepaymentScheduleDetail {...defaultProps} />);

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
    render(<RepaymentScheduleDetail {...defaultProps} />);

    const rowgroups = screen.getAllByRole("rowgroup");
    const tbody = rowgroups[1]; // 2番目のrowgroupはtbody
    const allRows = tbody.querySelectorAll("tr");
    const dataRows = Array.from(allRows).filter(row => !row.hasAttribute("data-testid")); // DummyRowを除外

    dataRows.forEach(row => {
      expect(row).toHaveClass(
        "border-b",
        "transition-colors",
        "hover:bg-blue-50"
      );
    });
  });

  it("空のスケジュールでも正しく動作する", () => {
    const propsWithEmptySchedules = {
      paginatedSchedules: [],
      itemsPerPage: 5,
    };

    render(<RepaymentScheduleDetail {...propsWithEmptySchedules} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    const rowgroups = screen.getAllByRole("rowgroup");
    expect(rowgroups).toHaveLength(2);

    // DummyRowが全行数分表示される
    const dummyRow = screen.getByTestId("dummy-row");
    expect(dummyRow).toHaveAttribute("data-empty-count", "5");
  });

  describe("ステータス別のスタイリング", () => {
    it("完了ステータスのスタイルが適用される", () => {
      render(<RepaymentScheduleDetail {...defaultProps} />);

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
      render(<RepaymentScheduleDetail {...defaultProps} />);

      const badges = screen.getAllByTestId("badge");
      const delayedBadge = badges.find(badge => badge.textContent === "遅延");

      expect(delayedBadge).toHaveClass(
        "bg-red-50",
        "text-red-700",
        "border-red-200",
        "hover:bg-red-50"
      );
    });

    it("予定ステータスのスタイルが適用される", () => {
      render(<RepaymentScheduleDetail {...defaultProps} />);

      const badges = screen.getAllByTestId("badge");
      const scheduledBadge = badges.find(badge => badge.textContent === "予定");

      expect(scheduledBadge).toHaveClass(
        "bg-orange-50",
        "text-orange-700",
        "border-orange-200",
        "hover:bg-orange-50"
      );
    });
  });

  describe("データ形式のテスト", () => {
    it("大きな金額でも正しく表示される", () => {
      const scheduleWithLargeAmount = [
        {
          id: "large",
          scheduledDate: "2024-01-01",
          paidDate: "2024-01-01",
          amount: 1234567,
          status: RepaymentStatus.Completed,
          paymentMethod: PaymentMethod.BankTransfer,
          paymentCategory: PaymentCategory.Normal,
        },
      ];

      render(
        <RepaymentScheduleDetail
          paginatedSchedules={scheduleWithLargeAmount}
          itemsPerPage={5}
        />
      );

      expect(screen.getByText("1,234,567")).toBeInTheDocument();
    });

    it("異なるitemsPerPageでもDummyRowが正しく計算される", () => {
      const propsWithDifferentItemsPerPage = {
        paginatedSchedules: mockSchedules.slice(0, 2), // 2件のデータ
        itemsPerPage: 7,
      };

      render(<RepaymentScheduleDetail {...propsWithDifferentItemsPerPage} />);

      const dummyRow = screen.getByTestId("dummy-row");
      expect(dummyRow).toHaveAttribute("data-empty-count", "5"); // 7 - 2 = 5
    });

    it("フルページのデータでもDummyRowが正しく計算される", () => {
      const fullPageSchedules = Array.from({ length: 5 }, (_, i) => ({
        id: `${i + 1}`,
        scheduledDate: `2024-01-${(i + 1).toString().padStart(2, '0')}`,
        paidDate: null,
        amount: 10000 * (i + 1),
        status: RepaymentStatus.Scheduled,
        paymentMethod: PaymentMethod.BankTransfer,
        paymentCategory: PaymentCategory.Normal,
      }));

      render(
        <RepaymentScheduleDetail
          paginatedSchedules={fullPageSchedules}
          itemsPerPage={5}
        />
      );

      const dummyRow = screen.getByTestId("dummy-row");
      expect(dummyRow).toHaveAttribute("data-empty-count", "0"); // 5 - 5 = 0
    });
  });

  describe("統合テスト", () => {
    it("完全なテーブル構造が正しく表示される", () => {
      render(<RepaymentScheduleDetail {...defaultProps} />);

      // テーブル全体の存在確認
      expect(screen.getByRole("table")).toBeInTheDocument();

      // ヘッダーの確認
      const headerCells = screen.getAllByRole("columnheader");
      expect(headerCells).toHaveLength(6);

      // データ行の確認（DummyRowを除外）
      const rowgroups = screen.getAllByRole("rowgroup");
      const tbody = rowgroups[1];
      const allRows = tbody.querySelectorAll("tr");
      const allTableRows = tbody.querySelectorAll("tr");
      const dataRows = Array.from(allTableRows).filter(row => !row.hasAttribute("data-testid"));

      expect(dataRows).toHaveLength(3); // 実データ行
      expect(allRows).toHaveLength(4); // 実データ行 + DummyRow

      // 各データ行のセル数確認
      dataRows.forEach(row => {
        const cells = row.querySelectorAll("td");
        expect(cells).toHaveLength(6);
      });
    });

    it("アイコンとデータが正しく関連付けられる", () => {
      render(<RepaymentScheduleDetail {...defaultProps} />);

      const rowgroups = screen.getAllByRole("rowgroup");
      const tbody = rowgroups[1];
      const allTableRows = tbody.querySelectorAll("tr");
      const dataRows = Array.from(allTableRows).filter(row => !row.hasAttribute("data-testid"));

      // 各データ行に予定日と支払い日のアイコンが表示される
      dataRows.forEach(row => {
        const calendarIcons = row.querySelectorAll('[data-testid="calendar-icon"]');
        expect(calendarIcons).toHaveLength(2);
      });
    });

    it("すべてのスケジュールデータが正しい順序で表示される", () => {
      render(<RepaymentScheduleDetail {...defaultProps} />);

      const rowgroups = screen.getAllByRole("rowgroup");
      const tbody = rowgroups[1];
      const allTableRows = tbody.querySelectorAll("tr");
      const dataRows = Array.from(allTableRows).filter(row => !row.hasAttribute("data-testid"));

      // データの順序通りに表示されている
      expect(dataRows[0]).toHaveTextContent("50,000");
      expect(dataRows[1]).toHaveTextContent("75,000");
      expect(dataRows[2]).toHaveTextContent("30,000");
    });
  });
});