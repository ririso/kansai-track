import { Progress } from "@/components/ui/shadcn/progress";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// Radix UIのProgressをモック
jest.mock("@radix-ui/react-progress", () => ({
  Root: ({ children, className, value, ...props }: any) => (
    <div
      data-testid="progress-root"
      data-value={value}
      className={className}
      role="progressbar"
      aria-valuenow={value}
      {...props}
    >
      {children}
    </div>
  ),
  Indicator: ({ className, style, ...props }: any) => (
    <div
      data-testid="progress-indicator"
      className={className}
      style={style}
      {...props}
    />
  ),
}));

describe("Progress component", () => {
  it("基本的なプログレスバーが表示される", () => {
    render(<Progress data-testid="progress" />);

    const progress = screen.getByTestId("progress");
    expect(progress).toBeInTheDocument();
  });

  it("Radix UIコンポーネントが使用されている", () => {
    render(<Progress />);

    expect(screen.getByTestId("progress-root")).toBeInTheDocument();
    expect(screen.getByTestId("progress-indicator")).toBeInTheDocument();
  });

  it("基本スタイルが適用される", () => {
    render(<Progress data-testid="progress" />);

    const progress = screen.getByTestId("progress");
    expect(progress).toHaveClass(
      "relative",
      "h-2",
      "w-full",
      "overflow-hidden",
      "rounded-full",
      "bg-primary/20"
    );
  });

  it("インジケーターの基本スタイルが適用される", () => {
    render(<Progress />);

    const indicator = screen.getByTestId("progress-indicator");
    expect(indicator).toHaveClass(
      "h-full",
      "w-full",
      "flex-1",
      "bg-primary",
      "transition-all"
    );
  });

  it("値が0の時のスタイルが正しい", () => {
    render(<Progress value={0} />);

    const indicator = screen.getByTestId("progress-indicator");
    expect(indicator).toHaveStyle({ transform: "translateX(-100%)" });
  });

  it("値が50の時のスタイルが正しい", () => {
    render(<Progress value={50} />);

    const indicator = screen.getByTestId("progress-indicator");
    expect(indicator).toHaveStyle({ transform: "translateX(-50%)" });
  });

  it("値が100の時のスタイルが正しい", () => {
    render(<Progress value={100} />);

    const indicator = screen.getByTestId("progress-indicator");
    expect(indicator).toHaveStyle({ transform: "translateX(-0%)" });
  });

  it("値が未設定の時は0として扱われる", () => {
    render(<Progress />);

    const indicator = screen.getByTestId("progress-indicator");
    expect(indicator).toHaveStyle({ transform: "translateX(-100%)" });
  });

  it("カスタムクラス名が適用される", () => {
    render(<Progress className="custom-progress" data-testid="progress" />);

    const progress = screen.getByTestId("progress");
    expect(progress).toHaveClass("custom-progress");
  });

  it("プログレス要素として正しく表示される", () => {
    render(<Progress data-testid="progress" />);

    const progress = screen.getByTestId("progress");
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute("role", "progressbar");
  });

  it("aria属性が正しく設定される", () => {
    render(<Progress value={75} data-testid="progress" />);

    const progress = screen.getByTestId("progress");
    expect(progress).toHaveAttribute("role", "progressbar");
  });

  it("カスタムaria属性が適用される", () => {
    render(
      <Progress
        value={30}
        aria-label="Loading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        data-testid="progress"
      />
    );

    const progress = screen.getByTestId("progress");
    expect(progress).toHaveAttribute("aria-label", "Loading progress");
    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "100");
  });

  describe("値の境界テスト", () => {
    it("負の値でも正しく動作する", () => {
      render(<Progress value={-10} />);

      const indicator = screen.getByTestId("progress-indicator");
      expect(indicator).toHaveStyle({ transform: "translateX(-110%)" });
    });

    it("100を超える値でも正しく動作する", () => {
      render(<Progress value={150} />);

      const indicator = screen.getByTestId("progress-indicator");
      expect(indicator).toHaveStyle({ transform: "translateX(--50%)" });
    });

    it("小数点の値が正しく動作する", () => {
      render(<Progress value={33.33} />);

      const indicator = screen.getByTestId("progress-indicator");
      expect(indicator).toHaveStyle({ transform: "translateX(-66.67%)" });
    });
  });

  describe("統合テスト", () => {
    it("完全な設定でプログレスバーが動作する", () => {
      render(
        <Progress
          value={80}
          className="h-4 bg-gray-200"
          aria-label="File upload progress"
          data-testid="upload-progress"
        />
      );

      const progress = screen.getByTestId("upload-progress");
      const indicator = screen.getByTestId("progress-indicator");

      // 基本属性の確認
      expect(progress).toHaveAttribute("aria-label", "File upload progress");
      expect(progress).toHaveClass("h-4", "bg-gray-200");

      // インジケーターの位置確認
      expect(indicator).toHaveStyle({ transform: "translateX(-20%)" });
    });

    it("動的な値の変更が反映される", () => {
      const { rerender } = render(<Progress value={25} />);

      let indicator = screen.getByTestId("progress-indicator");
      expect(indicator).toHaveStyle({ transform: "translateX(-75%)" });

      rerender(<Progress value={75} />);

      indicator = screen.getByTestId("progress-indicator");
      expect(indicator).toHaveStyle({ transform: "translateX(-25%)" });
    });
  });

  describe("アクセシビリティテスト", () => {
    it("スクリーンリーダー用のラベルが設定できる", () => {
      render(
        <Progress
          value={60}
          aria-label="Download progress: 60%"
          data-testid="progress"
        />
      );

      const progress = screen.getByTestId("progress");
      expect(progress).toHaveAttribute("aria-label", "Download progress: 60%");
    });

    it("最小値と最大値が設定できる", () => {
      render(
        <Progress
          value={50}
          aria-valuemin={0}
          aria-valuemax={200}
          data-testid="progress"
        />
      );

      const progress = screen.getByTestId("progress");
      expect(progress).toHaveAttribute("aria-valuemin", "0");
      expect(progress).toHaveAttribute("aria-valuemax", "200");
    });
  });
});