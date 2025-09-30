import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// lucide-reactアイコンをモック
jest.mock("lucide-react", () => ({
  Check: () => <svg data-testid="check-icon" />,
  ChevronDown: () => <svg data-testid="chevron-down-icon" />,
  ChevronUp: () => <svg data-testid="chevron-up-icon" />,
}));

// Radix UIのSelectをモック
jest.mock("@radix-ui/react-select", () => ({
  Root: ({ children, value, onValueChange, ...props }: any) => (
    <div data-testid="select-root" data-value={value} {...props}>
      {children}
    </div>
  ),
  Group: ({ children, ...props }: any) => (
    <div data-testid="select-group" {...props}>
      {children}
    </div>
  ),
  Value: ({ children, placeholder, ...props }: any) => (
    <span data-testid="select-value" data-placeholder={placeholder} {...props}>
      {children}
    </span>
  ),
  Trigger: ({ children, className, ...props }: any) => (
    <button
      data-testid="select-trigger"
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
  Icon: ({ children }: any) => (
    <span data-testid="select-icon">{children}</span>
  ),
  Portal: ({ children }: any) => (
    <div data-testid="select-portal">{children}</div>
  ),
  Content: ({ children, className, position, ...props }: any) => (
    <div
      data-testid="select-content"
      data-position={position}
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  Viewport: ({ children, className, ...props }: any) => (
    <div data-testid="select-viewport" className={className} {...props}>
      {children}
    </div>
  ),
  ScrollUpButton: ({ children, className, ...props }: any) => (
    <div
      data-testid="select-scroll-up"
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  ScrollDownButton: ({ children, className, ...props }: any) => (
    <div
      data-testid="select-scroll-down"
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  Label: ({ children, className, ...props }: any) => (
    <div
      data-testid="select-label"
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  Item: ({ children, className, value, ...props }: any) => (
    <div
      data-testid="select-item"
      data-value={value}
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  ItemText: ({ children }: any) => (
    <span data-testid="select-item-text">{children}</span>
  ),
  ItemIndicator: ({ children }: any) => (
    <span data-testid="select-item-indicator">{children}</span>
  ),
  Separator: ({ className, ...props }: any) => (
    <div
      data-testid="select-separator"
      className={className}
      {...props}
    />
  ),
}));

describe("Select components", () => {
  describe("Select (Root)", () => {
    it("ルートコンポーネントが表示される", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </Select>
      );

      expect(screen.getByTestId("select-root")).toBeInTheDocument();
    });

    it("値が正しく設定される", () => {
      render(
        <Select value="test-value">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </Select>
      );

      expect(screen.getByTestId("select-root")).toHaveAttribute("data-value", "test-value");
    });
  });

  describe("SelectTrigger", () => {
    it("トリガーが表示される", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </Select>
      );

      expect(screen.getByTestId("select-trigger")).toBeInTheDocument();
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Select>
          <SelectTrigger className="custom-trigger">
            <SelectValue />
          </SelectTrigger>
        </Select>
      );

      const trigger = screen.getByTestId("select-trigger");
      expect(trigger).toHaveClass("custom-trigger");
    });

    it("ChevronDownアイコンが表示される", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </Select>
      );

      expect(screen.getByTestId("chevron-down-icon")).toBeInTheDocument();
    });

    it("ボタンとして正しく動作する", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </Select>
      );

      const trigger = screen.getByTestId("select-trigger");
      expect(trigger.tagName).toBe("BUTTON");
    });
  });

  describe("SelectValue", () => {
    it("値表示コンポーネントが表示される", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
        </Select>
      );

      const value = screen.getByTestId("select-value");
      expect(value).toBeInTheDocument();
      expect(value).toHaveAttribute("data-placeholder", "Select option");
    });
  });

  describe("SelectContent", () => {
    it("コンテンツが表示される", () => {
      render(
        <Select>
          <SelectContent>
            <SelectItem value="item1">Item 1</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByTestId("select-content")).toBeInTheDocument();
      expect(screen.getByTestId("select-portal")).toBeInTheDocument();
      expect(screen.getByTestId("select-viewport")).toBeInTheDocument();
    });

    it("デフォルトポジションがpopperになっている", () => {
      render(
        <Select>
          <SelectContent>
            <SelectItem value="item1">Item 1</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByTestId("select-content")).toHaveAttribute("data-position", "popper");
    });

    it("カスタムポジションが適用される", () => {
      render(
        <Select>
          <SelectContent position="item-aligned">
            <SelectItem value="item1">Item 1</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByTestId("select-content")).toHaveAttribute("data-position", "item-aligned");
    });

    it("スクロールボタンが表示される", () => {
      render(
        <Select>
          <SelectContent>
            <SelectItem value="item1">Item 1</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByTestId("select-scroll-up")).toBeInTheDocument();
      expect(screen.getByTestId("select-scroll-down")).toBeInTheDocument();
      expect(screen.getByTestId("chevron-up-icon")).toBeInTheDocument();
      expect(screen.getByTestId("chevron-down-icon")).toBeInTheDocument();
    });
  });

  describe("SelectItem", () => {
    it("アイテムが表示される", () => {
      render(
        <Select>
          <SelectContent>
            <SelectItem value="item1">Item 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const item = screen.getByTestId("select-item");
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute("data-value", "item1");
      expect(screen.getByTestId("select-item-text")).toHaveTextContent("Item 1");
    });

    it("アイテムインジケーターが表示される", () => {
      render(
        <Select>
          <SelectContent>
            <SelectItem value="item1">Item 1</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByTestId("select-item-indicator")).toBeInTheDocument();
      expect(screen.getByTestId("check-icon")).toBeInTheDocument();
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Select>
          <SelectContent>
            <SelectItem value="item1" className="custom-item">Item 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const item = screen.getByTestId("select-item");
      expect(item).toHaveClass("custom-item");
    });
  });

  describe("SelectLabel", () => {
    it("ラベルが表示される", () => {
      render(
        <Select>
          <SelectContent>
            <SelectLabel>Category</SelectLabel>
            <SelectItem value="item1">Item 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const label = screen.getByTestId("select-label");
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Category");
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Select>
          <SelectContent>
            <SelectLabel className="custom-label">Category</SelectLabel>
          </SelectContent>
        </Select>
      );

      const label = screen.getByTestId("select-label");
      expect(label).toHaveClass("custom-label");
    });
  });

  describe("SelectGroup", () => {
    it("グループが表示される", () => {
      render(
        <Select>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Group Label</SelectLabel>
              <SelectItem value="item1">Item 1</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );

      expect(screen.getByTestId("select-group")).toBeInTheDocument();
    });
  });

  describe("SelectSeparator", () => {
    it("セパレーターが表示される", () => {
      render(
        <Select>
          <SelectContent>
            <SelectItem value="item1">Item 1</SelectItem>
            <SelectSeparator />
            <SelectItem value="item2">Item 2</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByTestId("select-separator")).toBeInTheDocument();
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Select>
          <SelectContent>
            <SelectSeparator className="custom-separator" />
          </SelectContent>
        </Select>
      );

      const separator = screen.getByTestId("select-separator");
      expect(separator).toHaveClass("custom-separator");
    });
  });

  describe("統合テスト", () => {
    it("完全なSelectコンポーネントが正しく表示される", () => {
      render(
        <Select value="item2">
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Options</SelectLabel>
              <SelectItem value="item1">Option 1</SelectItem>
              <SelectItem value="item2">Option 2</SelectItem>
              <SelectSeparator />
              <SelectItem value="item3">Option 3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );

      // 全ての要素が存在することを確認
      expect(screen.getByTestId("select-root")).toBeInTheDocument();
      expect(screen.getByTestId("select-trigger")).toBeInTheDocument();
      expect(screen.getByTestId("select-value")).toBeInTheDocument();
      expect(screen.getByTestId("select-content")).toBeInTheDocument();
      expect(screen.getByTestId("select-group")).toBeInTheDocument();
      expect(screen.getByTestId("select-label")).toBeInTheDocument();
      expect(screen.getAllByTestId("select-item")).toHaveLength(3);
      expect(screen.getByTestId("select-separator")).toBeInTheDocument();

      // 値が正しく設定されている
      expect(screen.getByTestId("select-root")).toHaveAttribute("data-value", "item2");
    });
  });
});