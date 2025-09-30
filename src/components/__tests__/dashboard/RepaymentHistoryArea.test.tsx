import RepaymentHistoryArea from "@/components/dashboard/RepaymentHistoryArea";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// lucide-reactアイコンをモック
jest.mock("lucide-react", () => ({
  Receipt: () => <svg data-testid="receipt-icon" />,
  Link: ({ children, href, ...props }: any) => (
    <a data-testid="link-icon" href={href} {...props}>
      {children}
    </a>
  ),
}));

// Buttonコンポーネントをモック
jest.mock("@/components/ui/shadcn/button", () => ({
  Button: ({ children, variant, size, className, ...props }: any) => (
    <button
      data-testid="button"
      data-variant={variant}
      data-size={size}
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Cardコンポーネントをモック
jest.mock("@/components/ui/shadcn/card", () => ({
  Card: ({ children, className, ...props }: any) => (
    <div data-testid="card" className={className} {...props}>
      {children}
    </div>
  ),
  CardContent: ({ children, ...props }: any) => (
    <div data-testid="card-content" {...props}>
      {children}
    </div>
  ),
  CardDescription: ({ children, className, ...props }: any) => (
    <p data-testid="card-description" className={className} {...props}>
      {children}
    </p>
  ),
  CardHeader: ({ children, className, ...props }: any) => (
    <div data-testid="card-header" className={className} {...props}>
      {children}
    </div>
  ),
  CardTitle: ({ children, className, ...props }: any) => (
    <h3 data-testid="card-title" className={className} {...props}>
      {children}
    </h3>
  ),
}));

// RepaymentHistoryコンポーネントをモック
jest.mock("@/components/dashboard/RepaymentHistory", () => ({
  RepaymentHistory: () => <div data-testid="repayment-history">Repayment History Content</div>,
}));

// Next.js Linkは使用されていないため削除

describe("RepaymentHistoryArea component", () => {
  it("支払い履歴エリアが表示される", () => {
    render(<RepaymentHistoryArea />);

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("card-header")).toBeInTheDocument();
    expect(screen.getByTestId("card-content")).toBeInTheDocument();
  });

  it("タイトルと説明が正しく表示される", () => {
    render(<RepaymentHistoryArea />);

    const title = screen.getByTestId("card-title");
    const description = screen.getByTestId("card-description");

    expect(title).toHaveTextContent("支払い履歴");
    expect(description).toHaveTextContent("過去の支払い記録");
  });

  it("管理ボタンが表示される", () => {
    render(<RepaymentHistoryArea />);

    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("管理");
    expect(button).toHaveAttribute("data-variant", "outline");
    expect(button).toHaveAttribute("data-size", "sm");
  });

  it("管理ボタンのスタイルが適用される", () => {
    render(<RepaymentHistoryArea />);

    const button = screen.getByTestId("button");
    expect(button).toHaveClass(
      "border-blue-200",
      "text-blue-600",
      "hover:bg-blue-50",
      "bg-transparent"
    );
  });

  it("Receiptアイコンが表示される", () => {
    render(<RepaymentHistoryArea />);

    expect(screen.getByTestId("receipt-icon")).toBeInTheDocument();
  });

  it("Linkアイコンが正しく表示される", () => {
    render(<RepaymentHistoryArea />);

    const link = screen.getByTestId("link-icon");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/payments");
  });

  it("RepaymentHistoryコンポーネントが含まれる", () => {
    render(<RepaymentHistoryArea />);

    expect(screen.getByTestId("repayment-history")).toBeInTheDocument();
    expect(screen.getByText("Repayment History Content")).toBeInTheDocument();
  });

  it("カードの基本スタイルが適用される", () => {
    render(<RepaymentHistoryArea />);

    const card = screen.getByTestId("card");
    expect(card).toHaveClass(
      "border-0",
      "shadow-custom",
      "animate-fade-in",
      "bg-white"
    );
  });

  it("ヘッダーのレイアウトが正しい", () => {
    render(<RepaymentHistoryArea />);

    const header = screen.getByTestId("card-header");
    expect(header).toHaveClass(
      "flex",
      "flex-row",
      "items-center",
      "justify-between"
    );
  });

  it("タイトルのスタイルが適用される", () => {
    render(<RepaymentHistoryArea />);

    const title = screen.getByTestId("card-title");
    expect(title).toHaveClass("text-gray-800");
  });

  it("説明のスタイルが適用される", () => {
    render(<RepaymentHistoryArea />);

    const description = screen.getByTestId("card-description");
    expect(description).toHaveClass("text-gray-600");
  });

  describe("レイアウト構造のテスト", () => {
    it("ヘッダー内の要素が正しく配置される", () => {
      render(<RepaymentHistoryArea />);

      const header = screen.getByTestId("card-header");
      const title = screen.getByTestId("card-title");
      const description = screen.getByTestId("card-description");
      const link = screen.getByTestId("link-icon");

      // ヘッダー内にタイトル・説明・リンクが含まれている
      expect(header).toContainElement(title);
      expect(header).toContainElement(description);
      expect(header).toContainElement(link);
    });

    it("コンテンツエリア内にRepaymentHistoryが含まれる", () => {
      render(<RepaymentHistoryArea />);

      const content = screen.getByTestId("card-content");
      const history = screen.getByTestId("repayment-history");

      expect(content).toContainElement(history);
    });

    it("ボタン内にアイコンとテキストが含まれる", () => {
      render(<RepaymentHistoryArea />);

      const button = screen.getByTestId("button");
      const icon = screen.getByTestId("receipt-icon");

      expect(button).toContainElement(icon);
      expect(button).toHaveTextContent("管理");
    });
  });

  describe("アクセシビリティテスト", () => {
    it("適切なHTML要素が使用される", () => {
      render(<RepaymentHistoryArea />);

      const title = screen.getByTestId("card-title");
      const description = screen.getByTestId("card-description");

      expect(title.tagName).toBe("H3");
      expect(description.tagName).toBe("P");
    });

    it("リンクが適切に設定される", () => {
      render(<RepaymentHistoryArea />);

      const link = screen.getByTestId("link-icon");
      expect(link).toHaveAttribute("href", "/payments");
    });

    it("ボタンが適切な属性を持つ", () => {
      render(<RepaymentHistoryArea />);

      const button = screen.getByTestId("button");
      expect(button.tagName).toBe("BUTTON");
      expect(button).toHaveAttribute("data-variant", "outline");
      expect(button).toHaveAttribute("data-size", "sm");
    });
  });

  describe("統合テスト", () => {
    it("完全なコンポーネント構造が正しく表示される", () => {
      render(<RepaymentHistoryArea />);

      // 全ての主要要素が存在する
      expect(screen.getByTestId("card")).toBeInTheDocument();
      expect(screen.getByTestId("card-header")).toBeInTheDocument();
      expect(screen.getByTestId("card-title")).toBeInTheDocument();
      expect(screen.getByTestId("card-description")).toBeInTheDocument();
      expect(screen.getByTestId("link-icon")).toBeInTheDocument();
      expect(screen.getByTestId("button")).toBeInTheDocument();
      expect(screen.getByTestId("card-content")).toBeInTheDocument();
      expect(screen.getByTestId("repayment-history")).toBeInTheDocument();

      // アイコンが存在する
      expect(screen.getByTestId("receipt-icon")).toBeInTheDocument();

      // テキストコンテンツが正しい
      expect(screen.getByText("支払い履歴")).toBeInTheDocument();
      expect(screen.getByText("過去の支払い記録")).toBeInTheDocument();
      expect(screen.getByText("管理")).toBeInTheDocument();
    });

    it("管理リンクボタンが完全に機能する", () => {
      render(<RepaymentHistoryArea />);

      const link = screen.getByTestId("link-icon");
      const button = screen.getByTestId("button");
      const icon = screen.getByTestId("receipt-icon");

      // リンクがボタンを包含している
      expect(link).toContainElement(button);

      // ボタンがアイコンを含んでいる
      expect(button).toContainElement(icon);

      // 正しいパスに設定されている
      expect(link).toHaveAttribute("href", "/payments");

      // ボタンのスタイルが適用されている
      expect(button).toHaveClass("border-blue-200", "text-blue-600");
    });
  });
});