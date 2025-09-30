import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// Radix UIのTabsをモック
jest.mock("@radix-ui/react-tabs", () => ({
  Root: ({ children, value, defaultValue, onValueChange, ...props }: any) => (
    <div
      data-testid="tabs-root"
      data-value={value || defaultValue}
      onClick={() => {
        // テスト用にクリックで値を変更
        if (onValueChange && !value) {
          onValueChange("tab2");
        }
      }}
      {...props}
    >
      {children}
    </div>
  ),
  List: ({ children, className, ...props }: any) => (
    <div
      data-testid="tabs-list"
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  Trigger: ({ children, className, value, ...props }: any) => (
    <button
      data-testid={`tabs-trigger-${value}`}
      data-value={value}
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
  Content: ({ children, className, value, ...props }: any) => (
    <div
      data-testid={`tabs-content-${value}`}
      data-value={value}
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
}));

describe("Tabs components", () => {
  describe("Tabs (Root)", () => {
    it("ルートコンポーネントが表示される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
        </Tabs>
      );

      expect(screen.getByTestId("tabs-root")).toBeInTheDocument();
    });

    it("デフォルト値が正しく設定される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
        </Tabs>
      );

      expect(screen.getByTestId("tabs-root")).toHaveAttribute("data-value", "tab1");
    });

    it("制御された値が正しく設定される", () => {
      render(
        <Tabs value="tab2">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );

      expect(screen.getByTestId("tabs-root")).toHaveAttribute("data-value", "tab2");
    });

    it("値変更コールバックが動作する", () => {
      const onValueChange = jest.fn();
      render(
        <Tabs defaultValue="tab1" onValueChange={onValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const root = screen.getByTestId("tabs-root");
      fireEvent.click(root);

      expect(onValueChange).toHaveBeenCalledWith("tab2");
    });
  });

  describe("TabsList", () => {
    it("タブリストが表示される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      expect(screen.getByTestId("tabs-list")).toBeInTheDocument();
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList className="custom-list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const list = screen.getByTestId("tabs-list");
      expect(list).toHaveClass("custom-list");
    });

    it("テストIDが正しく設定される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      expect(screen.getByTestId("tabs-list")).toBeInTheDocument();
    });
  });

  describe("TabsTrigger", () => {
    it("タブトリガーが表示される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      expect(screen.getByTestId("tabs-trigger-tab1")).toBeInTheDocument();
      expect(screen.getByTestId("tabs-trigger-tab2")).toBeInTheDocument();
      expect(screen.getByText("Tab 1")).toBeInTheDocument();
      expect(screen.getByText("Tab 2")).toBeInTheDocument();
    });

    it("値が正しく設定される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      expect(screen.getByTestId("tabs-trigger-tab1")).toHaveAttribute("data-value", "tab1");
      expect(screen.getByTestId("tabs-trigger-tab2")).toHaveAttribute("data-value", "tab2");
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" className="custom-trigger">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const trigger = screen.getByTestId("tabs-trigger-tab1");
      expect(trigger).toHaveClass("custom-trigger");
    });

    it("テストIDが正しく設定される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      expect(screen.getByTestId("tabs-trigger-tab1")).toBeInTheDocument();
    });

    it("disabled状態が適用される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" disabled>Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const trigger = screen.getByTestId("tabs-trigger-tab1");
      expect(trigger).toBeDisabled();
    });
  });

  describe("TabsContent", () => {
    it("タブコンテンツが表示される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for Tab 1</TabsContent>
        </Tabs>
      );

      expect(screen.getByTestId("tabs-content-tab1")).toBeInTheDocument();
      expect(screen.getByText("Content for Tab 1")).toBeInTheDocument();
    });

    it("値が正しく設定される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );

      expect(screen.getByTestId("tabs-content-tab1")).toHaveAttribute("data-value", "tab1");
      expect(screen.getByTestId("tabs-content-tab2")).toHaveAttribute("data-value", "tab2");
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="custom-content">Content 1</TabsContent>
        </Tabs>
      );

      const content = screen.getByTestId("tabs-content-tab1");
      expect(content).toHaveClass("custom-content");
    });

    it("テストIDが正しく設定される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
        </Tabs>
      );

      expect(screen.getByTestId("tabs-content-tab1")).toBeInTheDocument();
    });
  });

  describe("統合テスト", () => {
    it("完全なタブコンポーネントが正しく表示される", () => {
      render(
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div>Overview content goes here</div>
          </TabsContent>
          <TabsContent value="analytics">
            <div>Analytics content goes here</div>
          </TabsContent>
          <TabsContent value="reports">
            <div>Reports content goes here</div>
          </TabsContent>
        </Tabs>
      );

      // 全ての要素が存在することを確認
      expect(screen.getByTestId("tabs-root")).toBeInTheDocument();
      expect(screen.getByTestId("tabs-list")).toBeInTheDocument();
      expect(screen.getByTestId("tabs-trigger-overview")).toBeInTheDocument();
      expect(screen.getByTestId("tabs-trigger-analytics")).toBeInTheDocument();
      expect(screen.getByTestId("tabs-trigger-reports")).toBeInTheDocument();
      expect(screen.getByTestId("tabs-content-overview")).toBeInTheDocument();
      expect(screen.getByTestId("tabs-content-analytics")).toBeInTheDocument();
      expect(screen.getByTestId("tabs-content-reports")).toBeInTheDocument();

      // デフォルト値の確認
      expect(screen.getByTestId("tabs-root")).toHaveAttribute("data-value", "overview");

      // コンテンツの確認
      expect(screen.getByText("Overview content goes here")).toBeInTheDocument();
      expect(screen.getByText("Analytics content goes here")).toBeInTheDocument();
      expect(screen.getByText("Reports content goes here")).toBeInTheDocument();
    });

    it("グリッドレイアウトのクラスが適用される", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const list = screen.getByTestId("tabs-list");
      expect(list).toHaveClass("grid", "w-full", "grid-cols-3");
    });

    it("複数のコンテンツエリアが正しく関連付けられる", () => {
      render(
        <Tabs defaultValue="first">
          <TabsList>
            <TabsTrigger value="first">First</TabsTrigger>
            <TabsTrigger value="second">Second</TabsTrigger>
          </TabsList>
          <TabsContent value="first">
            <p>First tab content</p>
          </TabsContent>
          <TabsContent value="second">
            <p>Second tab content</p>
          </TabsContent>
        </Tabs>
      );

      // 各コンテンツが正しい値を持っている
      expect(screen.getByTestId("tabs-content-first")).toHaveAttribute("data-value", "first");
      expect(screen.getByTestId("tabs-content-second")).toHaveAttribute("data-value", "second");

      // コンテンツが表示されている
      expect(screen.getByText("First tab content")).toBeInTheDocument();
      expect(screen.getByText("Second tab content")).toBeInTheDocument();
    });
  });
});