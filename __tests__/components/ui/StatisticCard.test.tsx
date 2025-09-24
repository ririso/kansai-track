import { StatisticCard } from "@/components/ui/StatisticCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DollarSign, AlertTriangle, CheckCircle, Clock } from "lucide-react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// Cardコンポーネントをモック
jest.mock("@/components/ui/shadcn/card", () => ({
  Card: ({ children, className, ...props }: any) => (
    <div data-testid="card" className={className} {...props}>
      {children}
    </div>
  ),
  CardContent: ({ children, className, ...props }: any) => (
    <div data-testid="card-content" className={className} {...props}>
      {children}
    </div>
  ),
}));

// lucide-reactアイコンをモック
jest.mock("lucide-react", () => ({
  DollarSign: (props: any) => <svg data-testid="dollar-sign-icon" {...props} />,
  AlertTriangle: (props: any) => <svg data-testid="alert-triangle-icon" {...props} />,
  CheckCircle: (props: any) => <svg data-testid="check-circle-icon" {...props} />,
  Clock: (props: any) => <svg data-testid="clock-icon" {...props} />,
}));

describe("StatisticCard component", () => {
  it("基本的な統計カードが表示される", () => {
    render(
      <StatisticCard
        title="総返済額"
        value="¥1,950,000"
        icon={DollarSign}
        iconColor="blue"
      />
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("card-content")).toBeInTheDocument();
    expect(screen.getByText("総返済額")).toBeInTheDocument();
    expect(screen.getByText("¥1,950,000")).toBeInTheDocument();
    expect(screen.getByTestId("dollar-sign-icon")).toBeInTheDocument();
  });

  it("数値の値が正しく表示される", () => {
    render(
      <StatisticCard
        title="総スケジュール数"
        value={42}
        icon={CheckCircle}
        iconColor="green"
      />
    );

    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("青色アイコンのスタイルが適用される", () => {
    render(
      <StatisticCard
        title="テストタイトル"
        value="テスト値"
        icon={DollarSign}
        iconColor="blue"
      />
    );

    const iconContainer = screen.getByTestId("dollar-sign-icon").parentElement;
    expect(iconContainer).toHaveClass("bg-blue-100", "text-blue-600");
  });

  it("緑色アイコンのスタイルが適用される", () => {
    render(
      <StatisticCard
        title="完了済み"
        value="5件"
        icon={CheckCircle}
        iconColor="green"
      />
    );

    const iconContainer = screen.getByTestId("check-circle-icon").parentElement;
    expect(iconContainer).toHaveClass("bg-green-100", "text-green-600");
  });

  it("オレンジ色アイコンのスタイルが適用される", () => {
    render(
      <StatisticCard
        title="予定"
        value="3件"
        icon={Clock}
        iconColor="orange"
      />
    );

    const iconContainer = screen.getByTestId("clock-icon").parentElement;
    expect(iconContainer).toHaveClass("bg-orange-100", "text-orange-600");
  });

  it("赤色アイコンのスタイルが適用される", () => {
    render(
      <StatisticCard
        title="遅延"
        value="1件"
        icon={AlertTriangle}
        iconColor="red"
      />
    );

    const iconContainer = screen.getByTestId("alert-triangle-icon").parentElement;
    expect(iconContainer).toHaveClass("bg-red-100", "text-red-600");
  });

  it("カスタム値の色が適用される", () => {
    render(
      <StatisticCard
        title="カスタムカラー"
        value="カスタム値"
        icon={DollarSign}
        iconColor="blue"
        valueColor="text-purple-600"
      />
    );

    const valueElement = screen.getByText("カスタム値");
    expect(valueElement).toHaveClass("text-purple-600");
  });

  it("デフォルト値の色が適用される", () => {
    render(
      <StatisticCard
        title="デフォルトカラー"
        value="デフォルト値"
        icon={CheckCircle}
        iconColor="green"
      />
    );

    const valueElement = screen.getByText("デフォルト値");
    expect(valueElement).toHaveClass("text-green-600");
  });

  it("サブタイトルが表示される", () => {
    render(
      <StatisticCard
        title="完済予定"
        value=""
        icon={DollarSign}
        iconColor="blue"
        subtitle="あと2年3ヶ月"
      />
    );

    expect(screen.getByText("あと2年3ヶ月")).toBeInTheDocument();
    const subtitleElement = screen.getByText("あと2年3ヶ月");
    expect(subtitleElement).toHaveClass("text-xs", "text-gray-500", "mt-1");
  });

  it("サブタイトルがない場合は表示されない", () => {
    render(
      <StatisticCard
        title="サブタイトルなし"
        value="値"
        icon={DollarSign}
        iconColor="blue"
      />
    );

    const subtitleElements = screen.queryAllByText(/あと/);
    expect(subtitleElements).toHaveLength(0);
  });

  it("カスタムクラス名が適用される", () => {
    render(
      <StatisticCard
        title="カスタムクラス"
        value="値"
        icon={DollarSign}
        iconColor="blue"
        className="custom-card-class"
      />
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("custom-card-class");
  });

  it("デフォルトのカードクラスが適用される", () => {
    render(
      <StatisticCard
        title="デフォルトクラス"
        value="値"
        icon={DollarSign}
        iconColor="blue"
      />
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("border-0", "card-hover", "animate-fade-in", "bg-white");
  });

  it("タイトルのスタイルが正しく適用される", () => {
    render(
      <StatisticCard
        title="スタイルテスト"
        value="値"
        icon={DollarSign}
        iconColor="blue"
      />
    );

    const titleElement = screen.getByText("スタイルテスト");
    expect(titleElement).toHaveClass("text-sm", "font-medium", "text-gray-600", "mb-1");
  });

  it("値のスタイルが正しく適用される", () => {
    render(
      <StatisticCard
        title="値スタイルテスト"
        value="テスト値"
        icon={DollarSign}
        iconColor="blue"
      />
    );

    const valueElement = screen.getByText("テスト値");
    expect(valueElement).toHaveClass("text-2xl", "font-bold");
  });

  it("アイコンコンテナのスタイルが正しく適用される", () => {
    render(
      <StatisticCard
        title="アイコンスタイルテスト"
        value="値"
        icon={DollarSign}
        iconColor="blue"
      />
    );

    const iconContainer = screen.getByTestId("dollar-sign-icon").parentElement;
    expect(iconContainer).toHaveClass(
      "h-12",
      "w-12",
      "rounded-full",
      "flex",
      "items-center",
      "justify-center"
    );
  });

  it("アイコンのサイズが正しく適用される", () => {
    render(
      <StatisticCard
        title="アイコンサイズテスト"
        value="値"
        icon={DollarSign}
        iconColor="blue"
      />
    );

    const icon = screen.getByTestId("dollar-sign-icon");
    expect(icon).toHaveClass("h-6", "w-6");
  });

  it("レイアウト構造が正しい", () => {
    render(
      <StatisticCard
        title="レイアウトテスト"
        value="値"
        icon={DollarSign}
        iconColor="blue"
        subtitle="サブタイトル"
      />
    );

    // カード内の構造を確認
    const card = screen.getByTestId("card");
    const cardContent = screen.getByTestId("card-content");

    expect(card).toContainElement(cardContent);
    expect(cardContent).toHaveClass("pt-6");

    // flex レイアウトの確認
    const flexContainer = cardContent.querySelector("div");
    expect(flexContainer).toHaveClass("flex", "items-center", "justify-between");
  });

  describe("アイコン色バリエーション", () => {
    const colorTests = [
      { color: "blue" as const, bgClass: "bg-blue-100", textClass: "text-blue-600" },
      { color: "green" as const, bgClass: "bg-green-100", textClass: "text-green-600" },
      { color: "orange" as const, bgClass: "bg-orange-100", textClass: "text-orange-600" },
      { color: "red" as const, bgClass: "bg-red-100", textClass: "text-red-600" },
    ];

    colorTests.forEach(({ color, bgClass, textClass }) => {
      it(`${color}色のアイコンスタイルが正しく適用される`, () => {
        render(
          <StatisticCard
            title={`${color}テスト`}
            value="値"
            icon={DollarSign}
            iconColor={color}
          />
        );

        const iconContainer = screen.getByTestId("dollar-sign-icon").parentElement;
        expect(iconContainer).toHaveClass(bgClass, textClass);
      });
    });
  });

  describe("統合テスト", () => {
    it("完全な統計カードが正しく表示される", () => {
      render(
        <StatisticCard
          title="完全テスト"
          value="¥1,000,000"
          icon={DollarSign}
          iconColor="green"
          valueColor="text-green-600"
          subtitle="サブタイトル付き"
          className="custom-class"
        />
      );

      // 全ての要素が存在することを確認
      expect(screen.getByTestId("card")).toBeInTheDocument();
      expect(screen.getByText("完全テスト")).toBeInTheDocument();
      expect(screen.getByText("¥1,000,000")).toBeInTheDocument();
      expect(screen.getByText("サブタイトル付き")).toBeInTheDocument();
      expect(screen.getByTestId("dollar-sign-icon")).toBeInTheDocument();

      // スタイルが正しく適用されていることを確認
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("custom-class");

      const valueElement = screen.getByText("¥1,000,000");
      expect(valueElement).toHaveClass("text-green-600");

      const iconContainer = screen.getByTestId("dollar-sign-icon").parentElement;
      expect(iconContainer).toHaveClass("bg-green-100", "text-green-600");
    });
  });
});