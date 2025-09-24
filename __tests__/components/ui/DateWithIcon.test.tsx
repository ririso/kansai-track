import { DateWithIcon } from "@/components/ui/DateWithIcon";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// lucide-reactアイコンをモック
jest.mock("lucide-react", () => ({
  CalendarIcon: (props: any) => <svg data-testid="calendar-icon" {...props} />,
}));

describe("DateWithIcon component", () => {
  it("基本的な日付とアイコンが表示される", () => {
    render(<DateWithIcon date="2024-01-15" />);

    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    expect(screen.getByText("2024-01-15")).toBeInTheDocument();
  });

  it("日付がnullの場合デフォルトプレースホルダーが表示される", () => {
    render(<DateWithIcon date={null} />);

    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("日付がundefinedの場合デフォルトプレースホルダーが表示される", () => {
    render(<DateWithIcon date={undefined} />);

    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("空文字の場合デフォルトプレースホルダーが表示される", () => {
    render(<DateWithIcon date="" />);

    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("カスタムプレースホルダーが表示される", () => {
    render(<DateWithIcon date={null} placeholder="未設定" />);

    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    expect(screen.getByText("未設定")).toBeInTheDocument();
  });

  it("カスタムクラス名が適用される", () => {
    render(<DateWithIcon date="2024-01-15" className="custom-date-class" />);

    const container = screen.getByTestId("calendar-icon").parentElement;
    expect(container).toHaveClass("custom-date-class");
  });

  it("デフォルトクラスが適用される", () => {
    render(<DateWithIcon date="2024-01-15" />);

    const container = screen.getByTestId("calendar-icon").parentElement;
    expect(container).toHaveClass("flex", "items-center", "gap-2");
  });

  it("アイコンのスタイルが正しく適用される", () => {
    render(<DateWithIcon date="2024-01-15" />);

    const icon = screen.getByTestId("calendar-icon");
    expect(icon).toHaveClass("h-4", "w-4", "text-gray-500");
  });

  it("日付テキストのスタイルが正しく適用される", () => {
    render(<DateWithIcon date="2024-01-15" />);

    const dateText = screen.getByText("2024-01-15");
    expect(dateText).toHaveClass("text-gray-800");
  });

  it("日本語の日付が正しく表示される", () => {
    render(<DateWithIcon date="2024年1月15日" />);

    expect(screen.getByText("2024年1月15日")).toBeInTheDocument();
  });

  it("時刻付きの日付が正しく表示される", () => {
    render(<DateWithIcon date="2024-01-15 10:30:00" />);

    expect(screen.getByText("2024-01-15 10:30:00")).toBeInTheDocument();
  });

  describe("様々な日付形式のテスト", () => {
    const dateFormats = [
      "2024-01-15",
      "2024/01/15",
      "2024.01.15",
      "Jan 15, 2024",
      "15 Jan 2024"
    ];

    dateFormats.forEach(dateFormat => {
      it(`${dateFormat}形式の日付が正しく表示される`, () => {
        render(<DateWithIcon date={dateFormat} />);

        expect(screen.getByText(dateFormat)).toBeInTheDocument();
        expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
      });
    });
  });

  describe("プレースホルダーのバリエーションテスト", () => {
    const placeholderTests = [
      { placeholder: "未設定", expected: "未設定" },
      { placeholder: "N/A", expected: "N/A" },
      { placeholder: "---", expected: "---" },
      { placeholder: "TBD", expected: "TBD" }
    ];

    placeholderTests.forEach(({ placeholder, expected }) => {
      it(`カスタムプレースホルダー "${placeholder}" が正しく表示される`, () => {
        render(<DateWithIcon date={null} placeholder={placeholder} />);

        expect(screen.getByText(expected)).toBeInTheDocument();
      });
    });
  });

  describe("統合テスト", () => {
    it("完全なDateWithIconが正しく表示される", () => {
      render(
        <DateWithIcon
          date="2024-01-15"
          placeholder="未設定"
          className="custom-class"
        />
      );

      // 基本要素の存在確認
      const container = screen.getByTestId("calendar-icon").parentElement;
      expect(container).toBeInTheDocument();

      // アイコン確認
      expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();

      // 日付テキスト確認
      expect(screen.getByText("2024-01-15")).toBeInTheDocument();

      // クラス適用確認
      expect(container).toHaveClass("flex", "items-center", "gap-2", "custom-class");

      // アイコンスタイル確認
      const icon = screen.getByTestId("calendar-icon");
      expect(icon).toHaveClass("h-4", "w-4", "text-gray-500");

      // テキストスタイル確認
      const dateText = screen.getByText("2024-01-15");
      expect(dateText).toHaveClass("text-gray-800");
    });

    it("null日付でのカスタムプレースホルダー表示が正しく動作する", () => {
      render(
        <DateWithIcon
          date={null}
          placeholder="データなし"
          className="null-date-class"
        />
      );

      // 基本構造確認
      const container = screen.getByTestId("calendar-icon").parentElement;
      expect(container).toHaveClass("null-date-class");

      // アイコン確認
      expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();

      // プレースホルダー確認
      expect(screen.getByText("データなし")).toBeInTheDocument();
    });
  });
});