import { RepaymentHistoryHeader } from "@/components/repayment/RepaymentHistoryHeader";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { RepaymentPeriodFilter } from "@/types/enums/repaymentPeriodFilter";
import { RepaymentStatusFilter } from "@/types/enums/repaymentStatusFilter";
import { SortDirection } from "@/types/enums/sortDirection";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// lucide-reactアイコンをモック
jest.mock("lucide-react", () => ({
  Search: () => <svg data-testid="search-icon" />,
}));

// Cardコンポーネントをモック
jest.mock("@/components/ui/shadcn/card", () => ({
  CardHeader: ({ children, className, ...props }: any) => (
    <div data-testid="card-header" className={className} {...props}>
      {children}
    </div>
  ),
  CardTitle: ({ children, className, ...props }: any) => (
    <h2 data-testid="card-title" className={className} {...props}>
      {children}
    </h2>
  ),
  CardDescription: ({ children, className, ...props }: any) => (
    <p data-testid="card-description" className={className} {...props}>
      {children}
    </p>
  ),
}));

// Inputコンポーネントをモック
jest.mock("@/components/ui/shadcn/input", () => ({
  Input: ({ className, ...props }: any) => (
    <input data-testid="search-input" className={className} {...props} />
  ),
}));

// 子コンポーネントをモック
jest.mock("@/components/repayment/PeriodFilter", () => ({
  PeriodFilter: ({ value, onChangeValue }: any) => (
    <div data-testid="period-filter" data-value={value}>
      <button onClick={() => onChangeValue("THIS_MONTH")}>Period Filter</button>
    </div>
  ),
}));

jest.mock("@/components/repayment/SortButton", () => ({
  __esModule: true,
  default: ({ sortDirection, onChangeDirection }: any) => (
    <div data-testid="sort-button" data-direction={sortDirection}>
      <button onClick={() => onChangeDirection("ASC")}>Sort Button</button>
    </div>
  ),
}));

jest.mock("@/components/repayment/StatusFilter", () => ({
  StatusFilter: ({ value, onChangeValue }: any) => (
    <div data-testid="status-filter" data-value={value}>
      <button onClick={() => onChangeValue("COMPLETED")}>Status Filter</button>
    </div>
  ),
}));

jest.mock("@/components/features/csv", () => ({
  CsvUploader: () => <div data-testid="csv-uploader">CSV Uploader</div>,
}));

// Enumをモック
jest.mock("@/types/enums/repaymentStatusFilter", () => ({
  RepaymentStatusFilter: {
    ALL: "ALL",
    COMPLETED: "COMPLETED",
    SCHEDULED: "SCHEDULED",
    DELAYED: "DELAYED",
  },
}));

jest.mock("@/types/enums/repaymentPeriodFilter", () => ({
  RepaymentPeriodFilter: {
    ALL: "ALL",
    THIS_MONTH: "THIS_MONTH",
    NEXT_MONTH: "NEXT_MONTH",
    THIS_YEAR: "THIS_YEAR",
  },
}));

jest.mock("@/types/enums/sortDirection", () => ({
  SortDirection: {
    ASC: "ASC",
    DESC: "DESC",
  },
}));

jest.mock("@/lib/constants", () => ({
  RESET_PAGE: 1,
}));

// テスト用のデフォルトprops
const defaultProps = {
  totalScheduleCount: 25,
  totalCreditAmount: 1500000,
  searchTerm: "",
  setSearchTerm: jest.fn(),
  statusFilter: "ALL" as any,
  setStatusFilter: jest.fn(),
  periodFilter: RepaymentPeriodFilter.ALL,
  setPeriodFilter: jest.fn(),
  sortDirection: "DESC" as any,
  setSortDirection: jest.fn(),
  setCurrentPage: jest.fn(),
};

describe("RepaymentHistoryHeader component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("ヘッダー要素が表示される", () => {
    render(<RepaymentHistoryHeader {...defaultProps} />);

    expect(screen.getByTestId("card-header")).toBeInTheDocument();
    expect(screen.getByTestId("card-title")).toBeInTheDocument();
    expect(screen.getByTestId("card-description")).toBeInTheDocument();
  });

  it("タイトルが正しく表示される", () => {
    render(<RepaymentHistoryHeader {...defaultProps} />);

    expect(screen.getByTestId("card-title")).toHaveTextContent("返済履歴一覧");
  });

  it("スケジュール数と総額が表示される", () => {
    render(<RepaymentHistoryHeader {...defaultProps} />);

    const description = screen.getByTestId("card-description");
    expect(description).toHaveTextContent("全25件のスケジュール");
    expect(description).toHaveTextContent("総額: ¥1,500,000");
  });

  it("検索バーが表示される", () => {
    render(<RepaymentHistoryHeader {...defaultProps} />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("検索バーに正しいプレースホルダーが設定される", () => {
    render(<RepaymentHistoryHeader {...defaultProps} />);

    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toHaveAttribute("placeholder", "日付や金額で検索...");
  });

  it("検索バーの値が変更される", () => {
    render(<RepaymentHistoryHeader {...defaultProps} />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "2024-01" } });

    expect(defaultProps.setSearchTerm).toHaveBeenCalledWith("2024-01");
  });

  it("すべてのフィルターコンポーネントが表示される", () => {
    render(<RepaymentHistoryHeader {...defaultProps} />);

    expect(screen.getByTestId("period-filter")).toBeInTheDocument();
    expect(screen.getByTestId("status-filter")).toBeInTheDocument();
    expect(screen.getByTestId("sort-button")).toBeInTheDocument();
    expect(screen.getByTestId("csv-uploader")).toBeInTheDocument();
  });

  it("期間フィルターが正しく動作する", () => {
    render(<RepaymentHistoryHeader {...defaultProps} />);

    const periodFilter = screen.getByTestId("period-filter");
    const button = periodFilter.querySelector("button");
    fireEvent.click(button!);

    expect(defaultProps.setPeriodFilter).toHaveBeenCalledWith("THIS_MONTH");
    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1);
  });

  it("ステータスフィルターが正しく動作する", () => {
    render(<RepaymentHistoryHeader {...defaultProps} />);

    const statusFilter = screen.getByTestId("status-filter");
    const button = statusFilter.querySelector("button");
    fireEvent.click(button!);

    expect(defaultProps.setStatusFilter).toHaveBeenCalledWith("COMPLETED");
    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1);
  });

  it("ソートボタンが正しく動作する", () => {
    render(<RepaymentHistoryHeader {...defaultProps} />);

    const sortButton = screen.getByTestId("sort-button");
    const button = sortButton.querySelector("button");
    fireEvent.click(button!);

    expect(defaultProps.setSortDirection).toHaveBeenCalledWith("ASC");
    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1);
  });

  it("検索バーのスタイルが適用される", () => {
    render(<RepaymentHistoryHeader {...defaultProps} />);

    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toHaveClass(
      "pl-10",
      "border-gray-300",
      "focus:border-blue-500",
      "focus:ring-2",
      "focus:ring-blue-200"
    );
  });

  it("ヘッダーのレイアウトスタイルが適用される", () => {
    render(<RepaymentHistoryHeader {...defaultProps} />);

    const header = screen.getByTestId("card-header");
    expect(header).toHaveClass(
      "bg-white",
      "border-b",
      "border-gray-100",
      "flex",
      "flex-col",
      "sm:flex-row",
      "sm:items-center",
      "sm:justify-between",
      "gap-4"
    );
  });

  it("現在の検索語が表示される", () => {
    const propsWithSearch = {
      ...defaultProps,
      searchTerm: "test search",
    };

    render(<RepaymentHistoryHeader {...propsWithSearch} />);

    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toHaveValue("test search");
  });

  describe("フィルター値の表示", () => {
    it("期間フィルターの値が正しく表示される", () => {
      const propsWithPeriodFilter = {
        ...defaultProps,
        periodFilter: RepaymentPeriodFilter.THIS_MONTH,
      };

      render(<RepaymentHistoryHeader {...propsWithPeriodFilter} />);

      const periodFilter = screen.getByTestId("period-filter");
      expect(periodFilter).toHaveAttribute("data-value", "THIS_MONTH");
    });

    it("ステータスフィルターの値が正しく表示される", () => {
      const propsWithStatusFilter = {
        ...defaultProps,
        statusFilter: RepaymentStatusFilter.COMPLETED,
      };

      render(<RepaymentHistoryHeader {...propsWithStatusFilter} />);

      const statusFilter = screen.getByTestId("status-filter");
      expect(statusFilter).toHaveAttribute("data-value", "COMPLETED");
    });

    it("ソートボタンの値が正しく表示される", () => {
      const propsWithSort = {
        ...defaultProps,
        sortDirection: SortDirection.ASC,
      };

      render(<RepaymentHistoryHeader {...propsWithSort} />);

      const sortButton = screen.getByTestId("sort-button");
      expect(sortButton).toHaveAttribute("data-direction", "ASC");
    });
  });

  describe("データ形式のテスト", () => {
    it("大きな金額でも正しく表示される", () => {
      const propsWithLargeAmount = {
        ...defaultProps,
        totalCreditAmount: 12345678,
      };

      render(<RepaymentHistoryHeader {...propsWithLargeAmount} />);

      const description = screen.getByTestId("card-description");
      expect(description).toHaveTextContent("総額: ¥12,345,678");
    });

    it("0件のスケジュールでも正しく表示される", () => {
      const propsWithZeroCount = {
        ...defaultProps,
        totalScheduleCount: 0,
      };

      render(<RepaymentHistoryHeader {...propsWithZeroCount} />);

      const description = screen.getByTestId("card-description");
      expect(description).toHaveTextContent("全0件のスケジュール");
    });

    it("0円の総額でも正しく表示される", () => {
      const propsWithZeroAmount = {
        ...defaultProps,
        totalCreditAmount: 0,
      };

      render(<RepaymentHistoryHeader {...propsWithZeroAmount} />);

      const description = screen.getByTestId("card-description");
      expect(description).toHaveTextContent("総額: ¥0");
    });
  });

  describe("統合テスト", () => {
    it("完全なヘッダー構造が正しく表示される", () => {
      render(<RepaymentHistoryHeader {...defaultProps} />);

      // 全ての主要要素が存在する
      expect(screen.getByTestId("card-header")).toBeInTheDocument();
      expect(screen.getByTestId("card-title")).toBeInTheDocument();
      expect(screen.getByTestId("card-description")).toBeInTheDocument();
      expect(screen.getByTestId("search-input")).toBeInTheDocument();
      expect(screen.getByTestId("search-icon")).toBeInTheDocument();
      expect(screen.getByTestId("period-filter")).toBeInTheDocument();
      expect(screen.getByTestId("status-filter")).toBeInTheDocument();
      expect(screen.getByTestId("sort-button")).toBeInTheDocument();
      expect(screen.getByTestId("csv-uploader")).toBeInTheDocument();

      // テキストコンテンツが正しい
      expect(screen.getByText("返済履歴一覧")).toBeInTheDocument();
      expect(screen.getByText("全25件のスケジュール（総額: ¥1,500,000）")).toBeInTheDocument();
    });

    it("すべてのフィルター操作が連携して動作する", () => {
      render(<RepaymentHistoryHeader {...defaultProps} />);

      // 検索
      const searchInput = screen.getByTestId("search-input");
      fireEvent.change(searchInput, { target: { value: "test" } });
      expect(defaultProps.setSearchTerm).toHaveBeenCalledWith("test");

      // 期間フィルター
      const periodButton = screen.getByTestId("period-filter").querySelector("button");
      fireEvent.click(periodButton!);
      expect(defaultProps.setPeriodFilter).toHaveBeenCalledWith("THIS_MONTH");

      // ステータスフィルター
      const statusButton = screen.getByTestId("status-filter").querySelector("button");
      fireEvent.click(statusButton!);
      expect(defaultProps.setStatusFilter).toHaveBeenCalledWith("COMPLETED");

      // ソート
      const sortButton = screen.getByTestId("sort-button").querySelector("button");
      fireEvent.click(sortButton!);
      expect(defaultProps.setSortDirection).toHaveBeenCalledWith("ASC");

      // すべての操作でページがリセットされる
      expect(defaultProps.setCurrentPage).toHaveBeenCalledTimes(3);
      expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1);
    });
  });
});