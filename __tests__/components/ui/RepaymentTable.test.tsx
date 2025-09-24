import { RepaymentTable } from "@/components/ui/RepaymentTable";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// DateWithIconコンポーネントをモック
jest.mock("@/components/ui/DateWithIcon", () => ({
  DateWithIcon: ({ date, ...props }: any) => (
    <div data-testid="date-with-icon" data-date={date} {...props}>
      {date || "-"}
    </div>
  ),
}));

// RepaymentStatusBadgeコンポーネントをモック
jest.mock("@/components/ui/RepaymentStatusBadge", () => ({
  RepaymentStatusBadge: ({ status, ...props }: any) => (
    <span data-testid="status-badge" data-status={status} {...props}>
      {status}
    </span>
  ),
}));

// DummyRowコンポーネントをモック
jest.mock("@/components/repayment/DummyRow", () => ({
  DummyRow: ({ emptyRowCount }: any) => (
    <tr data-testid="dummy-row" data-empty-count={emptyRowCount}>
      <td colSpan={6}>Dummy rows: {emptyRowCount}</td>
    </tr>
  ),
}));

// テスト用のサンプルデータ
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
    status: "予定",
    paymentMethod: null,
    paymentCategory: "食費",
  },
];

describe("RepaymentTable component", () => {
  it("基本的なテーブルが表示される", () => {
    render(<RepaymentTable schedules={mockSchedules} />);

    // テーブル構造の確認
    expect(screen.getByRole("table")).toBeInTheDocument();

    // ヘッダーの確認
    expect(screen.getByText("支払い予定日")).toBeInTheDocument();
    expect(screen.getByText("支払い日")).toBeInTheDocument();
    expect(screen.getByText("金額(円)")).toBeInTheDocument();
    expect(screen.getByText("ステータス")).toBeInTheDocument();
    expect(screen.getByText("支払い方法")).toBeInTheDocument();
    expect(screen.getByText("支払い区分")).toBeInTheDocument();
  });

  it("スケジュールデータが正しく表示される", () => {
    render(<RepaymentTable schedules={mockSchedules} />);

    // 各行のデータ確認
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4); // ヘッダー + 3データ行

    // 金額の表示確認
    expect(screen.getByText("50,000")).toBeInTheDocument();
    expect(screen.getByText("75,000")).toBeInTheDocument();
    expect(screen.getByText("30,000")).toBeInTheDocument();

    // 支払い方法の表示確認
    expect(screen.getByText("クレジットカード")).toBeInTheDocument();
    expect(screen.getByText("銀行振込")).toBeInTheDocument();
    expect(screen.getByText("未設定")).toBeInTheDocument(); // nullの場合

    // 支払い区分の表示確認
    expect(screen.getByText("生活費")).toBeInTheDocument();
    expect(screen.getByText("住宅費")).toBeInTheDocument();
    expect(screen.getByText("食費")).toBeInTheDocument();
  });

  it("DateWithIconコンポーネントが呼び出される", () => {
    render(<RepaymentTable schedules={mockSchedules} />);

    const dateComponents = screen.getAllByTestId("date-with-icon");
    expect(dateComponents).toHaveLength(6); // 3行 × 2カラム（予定日・支払い日）

    // 各日付データの確認
    expect(dateComponents[0]).toHaveAttribute("data-date", "2024-01-15");
    expect(dateComponents[1]).toHaveAttribute("data-date", "2024-01-15");
    expect(dateComponents[2]).toHaveAttribute("data-date", "2024-01-25");
    expect(dateComponents[3]).not.toHaveAttribute("data-date"); // nullの場合属性は設定されない
  });

  it("RepaymentStatusBadgeコンポーネントが呼び出される", () => {
    render(<RepaymentTable schedules={mockSchedules} />);

    const statusBadges = screen.getAllByTestId("status-badge");
    expect(statusBadges).toHaveLength(3);

    // 各ステータスの確認
    expect(statusBadges[0]).toHaveAttribute("data-status", "完了");
    expect(statusBadges[1]).toHaveAttribute("data-status", "遅延");
    expect(statusBadges[2]).toHaveAttribute("data-status", "予定");
  });

  it("ダミー行が表示されない（デフォルト）", () => {
    render(<RepaymentTable schedules={mockSchedules} />);

    const dummyRow = screen.queryByTestId("dummy-row");
    expect(dummyRow).not.toBeInTheDocument();
  });

  it("ダミー行が表示される", () => {
    render(
      <RepaymentTable
        schedules={mockSchedules.slice(0, 2)} // 2件のみ
        showDummyRows={true}
        itemsPerPage={5}
      />
    );

    const dummyRow = screen.getByTestId("dummy-row");
    expect(dummyRow).toBeInTheDocument();
    expect(dummyRow).toHaveAttribute("data-empty-count", "3"); // 5 - 2 = 3
  });

  it("table-fixedクラスが適用される", () => {
    render(<RepaymentTable schedules={mockSchedules} tableFixed={true} />);

    const table = screen.getByRole("table");
    expect(table).toHaveClass("table-fixed");
  });

  it("table-fixedクラスが適用されない（デフォルト）", () => {
    render(<RepaymentTable schedules={mockSchedules} />);

    const table = screen.getByRole("table");
    expect(table).not.toHaveClass("table-fixed");
  });

  it("カスタムクラス名が適用される", () => {
    render(<RepaymentTable schedules={mockSchedules} className="custom-table-class" />);

    const container = screen.getByRole("table").parentElement;
    expect(container).toHaveClass("custom-table-class");
  });

  it("デフォルトクラスが適用される", () => {
    render(<RepaymentTable schedules={mockSchedules} />);

    const container = screen.getByRole("table").parentElement;
    expect(container).toHaveClass("rounded-lg", "border", "border-gray-200", "overflow-hidden");
  });

  it("空のスケジュールでも正しく動作する", () => {
    render(<RepaymentTable schedules={[]} />);

    // ヘッダーは表示される
    expect(screen.getByText("支払い予定日")).toBeInTheDocument();

    // データ行は表示されない
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1); // ヘッダーのみ
  });

  it("空のスケジュールでダミー行が表示される", () => {
    render(
      <RepaymentTable
        schedules={[]}
        showDummyRows={true}
        itemsPerPage={3}
      />
    );

    const dummyRow = screen.getByTestId("dummy-row");
    expect(dummyRow).toBeInTheDocument();
    expect(dummyRow).toHaveAttribute("data-empty-count", "3");
  });

  describe("テーブル構造のテスト", () => {
    it("ヘッダー行のスタイルが正しく適用される", () => {
      render(<RepaymentTable schedules={mockSchedules} />);

      const rows = screen.getAllByRole("row");
      const headerRow = rows[0]; // 最初の行がヘッダー
      expect(headerRow).toHaveClass(
        "border-b",
        "transition-colors",
        "hover:bg-gray-50",
        "data-[state=selected]:bg-muted"
      );
    });

    it("ヘッダーセルのスタイルが正しく適用される", () => {
      render(<RepaymentTable schedules={mockSchedules} />);

      const firstHeader = screen.getByText("支払い予定日");
      expect(firstHeader).toHaveClass(
        "h-12",
        "px-4",
        "text-left",
        "align-middle",
        "font-semibold",
        "text-gray-700"
      );
    });

    it("データ行のスタイルが正しく適用される", () => {
      render(<RepaymentTable schedules={[mockSchedules[0]]} />);

      const dataRows = screen.getAllByRole("row");
      const dataRow = dataRows[1]; // ヘッダーの次の行
      expect(dataRow).toHaveClass(
        "border-b",
        "transition-colors",
        "hover:bg-blue-50",
        "data-[state=selected]:bg-muted"
      );
    });
  });

  describe("異なる設定でのテスト", () => {
    it("すべてのオプションを有効にしたテーブルが正しく動作する", () => {
      render(
        <RepaymentTable
          schedules={mockSchedules.slice(0, 1)} // 1件のみ
          showDummyRows={true}
          itemsPerPage={3}
          tableFixed={true}
          className="full-option-table"
        />
      );

      // 基本構造確認
      const table = screen.getByRole("table");
      expect(table).toHaveClass("table-fixed");

      const container = table.parentElement;
      expect(container).toHaveClass("full-option-table");

      // データ確認
      expect(screen.getByText("50,000")).toBeInTheDocument();

      // ダミー行確認
      const dummyRow = screen.getByTestId("dummy-row");
      expect(dummyRow).toHaveAttribute("data-empty-count", "2"); // 3 - 1 = 2
    });
  });

  describe("統合テスト", () => {
    it("完全なテーブルが正しく表示・動作する", () => {
      render(
        <RepaymentTable
          schedules={mockSchedules}
          showDummyRows={false}
          tableFixed={false}
          className="integration-test-table"
        />
      );

      // 基本構造確認
      expect(screen.getByRole("table")).toBeInTheDocument();

      // ヘッダー確認（6列）
      const headers = ["支払い予定日", "支払い日", "金額(円)", "ステータス", "支払い方法", "支払い区分"];
      headers.forEach(header => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });

      // データ行確認（3行）
      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(4); // ヘッダー + 3データ行

      // 子コンポーネントの呼び出し確認
      expect(screen.getAllByTestId("date-with-icon")).toHaveLength(6);
      expect(screen.getAllByTestId("status-badge")).toHaveLength(3);

      // スタイル確認
      const container = screen.getByRole("table").parentElement;
      expect(container).toHaveClass("integration-test-table");
    });
  });
});