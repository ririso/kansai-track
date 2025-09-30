import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// lucide-reactアイコンをモック
jest.mock("lucide-react", () => ({
  Check: () => <svg data-testid="check-icon" />,
  ChevronRight: () => <svg data-testid="chevron-right-icon" />,
  Circle: () => <svg data-testid="circle-icon" />,
}));

// Radix UIのDropdownMenuをモック
jest.mock("@radix-ui/react-dropdown-menu", () => ({
  Root: ({ children, open, ...props }: any) => (
    <div data-testid="dropdown-root" data-open={open} {...props}>
      {children}
    </div>
  ),
  Trigger: ({ children, ...props }: any) => (
    <button data-testid="dropdown-trigger" {...props}>
      {children}
    </button>
  ),
  Portal: ({ children }: any) => (
    <div data-testid="dropdown-portal">{children}</div>
  ),
  Content: ({ children, className, sideOffset, ...props }: any) => (
    <div
      data-testid="dropdown-content"
      data-side-offset={sideOffset}
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  Group: ({ children, ...props }: any) => (
    <div data-testid="dropdown-group" {...props}>
      {children}
    </div>
  ),
  Item: ({ children, className, inset, ...props }: any) => (
    <div
      data-testid="dropdown-item"
      data-inset={inset}
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  CheckboxItem: ({ children, className, checked, ...props }: any) => (
    <div
      data-testid="dropdown-checkbox-item"
      data-checked={checked}
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  RadioGroup: ({ children, ...props }: any) => (
    <div data-testid="dropdown-radio-group" {...props}>
      {children}
    </div>
  ),
  RadioItem: ({ children, className, ...props }: any) => (
    <div
      data-testid="dropdown-radio-item"
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  Label: ({ children, className, inset, ...props }: any) => (
    <div
      data-testid="dropdown-label"
      data-inset={inset}
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  Separator: ({ className, ...props }: any) => (
    <div
      data-testid="dropdown-separator"
      className={className}
      {...props}
    />
  ),
  Sub: ({ children, ...props }: any) => (
    <div data-testid="dropdown-sub" {...props}>
      {children}
    </div>
  ),
  SubTrigger: ({ children, className, inset, ...props }: any) => (
    <div
      data-testid="dropdown-sub-trigger"
      data-inset={inset}
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  SubContent: ({ children, className, ...props }: any) => (
    <div
      data-testid="dropdown-sub-content"
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  ItemIndicator: ({ children }: any) => (
    <span data-testid="dropdown-item-indicator">{children}</span>
  ),
}));

describe("DropdownMenu components", () => {
  describe("DropdownMenu (Root)", () => {
    it("ルートコンポーネントが表示される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        </DropdownMenu>
      );

      expect(screen.getByTestId("dropdown-root")).toBeInTheDocument();
    });

    it("開閉状態が管理される", () => {
      render(
        <DropdownMenu open={true}>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        </DropdownMenu>
      );

      const root = screen.getByTestId("dropdown-root");
      expect(root).toHaveAttribute("data-open", "true");
    });
  });

  describe("DropdownMenuTrigger", () => {
    it("トリガーボタンが表示される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        </DropdownMenu>
      );

      const trigger = screen.getByTestId("dropdown-trigger");
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent("Open Menu");
      expect(trigger.tagName).toBe("BUTTON");
    });
  });

  describe("DropdownMenuContent", () => {
    it("コンテンツが表示される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("dropdown-portal")).toBeInTheDocument();
      expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
    });

    it("基本スタイルが適用される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>Content</DropdownMenuContent>
        </DropdownMenu>
      );

      const content = screen.getByTestId("dropdown-content");
      expect(content).toHaveClass(
        "z-50",
        "min-w-[8rem]",
        "overflow-y-auto",
        "overflow-x-hidden",
        "rounded-md",
        "border"
      );
    });

    it("デフォルトsideOffsetが適用される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>Content</DropdownMenuContent>
        </DropdownMenu>
      );

      const content = screen.getByTestId("dropdown-content");
      expect(content).toHaveAttribute("data-side-offset", "4");
    });

    it("カスタムsideOffsetが適用される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent sideOffset={8}>Content</DropdownMenuContent>
        </DropdownMenu>
      );

      const content = screen.getByTestId("dropdown-content");
      expect(content).toHaveAttribute("data-side-offset", "8");
    });
  });

  describe("DropdownMenuItem", () => {
    it("メニューアイテムが表示される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>Menu Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = screen.getByTestId("dropdown-item");
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent("Menu Item");
    });

    it("基本スタイルが適用される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = screen.getByTestId("dropdown-item");
      expect(item).toHaveClass(
        "relative",
        "flex",
        "cursor-default",
        "select-none",
        "items-center",
        "gap-2"
      );
    });

    it("insetプロパティが適用される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem inset>Inset Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = screen.getByTestId("dropdown-item");
      expect(item).toHaveClass("pl-8");
    });
  });

  describe("DropdownMenuCheckboxItem", () => {
    it("チェックボックスアイテムが表示される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem>Checkbox Item</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = screen.getByTestId("dropdown-checkbox-item");
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent("Checkbox Item");
    });

    it("チェック状態が管理される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked={true}>
              Checked Item
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = screen.getByTestId("dropdown-checkbox-item");
      expect(item).toHaveAttribute("data-checked", "true");
    });

    it("チェックアイコンが表示される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem>Item</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("dropdown-item-indicator")).toBeInTheDocument();
      expect(screen.getByTestId("check-icon")).toBeInTheDocument();
    });
  });

  describe("DropdownMenuRadioItem", () => {
    it("ラジオアイテムが表示される", () => {
      render(
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem value="option1">
            Radio Option 1
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      );

      const item = screen.getByTestId("dropdown-radio-item");
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent("Radio Option 1");
    });

    it("ラジオアイコンが表示される", () => {
      render(
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem value="option1">Item</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      );

      expect(screen.getByTestId("dropdown-item-indicator")).toBeInTheDocument();
      expect(screen.getByTestId("circle-icon")).toBeInTheDocument();
    });
  });

  describe("DropdownMenuLabel", () => {
    it("ラベルが表示される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuLabel>Section Label</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const label = screen.getByTestId("dropdown-label");
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Section Label");
    });

    it("基本スタイルが適用される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuLabel>Label</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const label = screen.getByTestId("dropdown-label");
      expect(label).toHaveClass("px-2", "py-1.5", "text-sm", "font-semibold");
    });

    it("insetプロパティが適用される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuLabel inset>Inset Label</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const label = screen.getByTestId("dropdown-label");
      expect(label).toHaveClass("pl-8");
    });
  });

  describe("DropdownMenuSeparator", () => {
    it("セパレーターが表示される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const separator = screen.getByTestId("dropdown-separator");
      expect(separator).toBeInTheDocument();
    });

    it("基本スタイルが適用される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const separator = screen.getByTestId("dropdown-separator");
      expect(separator).toHaveClass("-mx-1", "my-1", "h-px", "bg-muted");
    });
  });

  describe("DropdownMenuShortcut", () => {
    it("ショートカット表示が表示される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>
              Open
              <DropdownMenuShortcut data-testid="dropdown-shortcut">
                ⌘O
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const shortcut = screen.getByTestId("dropdown-shortcut");
      expect(shortcut).toBeInTheDocument();
      expect(shortcut).toHaveTextContent("⌘O");
      expect(shortcut.tagName).toBe("SPAN");
    });

    it("基本スタイルが適用される", () => {
      render(
        <DropdownMenuShortcut data-testid="dropdown-shortcut">
          Ctrl+C
        </DropdownMenuShortcut>
      );

      const shortcut = screen.getByTestId("dropdown-shortcut");
      expect(shortcut).toHaveClass(
        "ml-auto",
        "text-xs",
        "tracking-widest",
        "opacity-60"
      );
    });
  });

  describe("DropdownMenuSub", () => {
    it("サブメニューが表示される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("dropdown-sub")).toBeInTheDocument();
      expect(screen.getByTestId("dropdown-sub-trigger")).toBeInTheDocument();
      expect(screen.getByTestId("dropdown-sub-content")).toBeInTheDocument();
    });

    it("サブトリガーにChevronRightアイコンが表示される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("chevron-right-icon")).toBeInTheDocument();
    });

    it("サブトリガーのinsetプロパティが動作する", () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger inset>Inset Sub</DropdownMenuSubTrigger>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const subTrigger = screen.getByTestId("dropdown-sub-trigger");
      expect(subTrigger).toHaveClass("pl-8");
    });
  });

  describe("統合テスト", () => {
    it("完全なドロップダウンメニューが正しく表示される", () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Options</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Copy</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={true}>
              Show Details
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      // 全ての要素が存在することを確認
      expect(screen.getByTestId("dropdown-root")).toBeInTheDocument();
      expect(screen.getByTestId("dropdown-trigger")).toBeInTheDocument();
      expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
      expect(screen.getByTestId("dropdown-label")).toBeInTheDocument();
      expect(screen.getAllByTestId("dropdown-item")).toHaveLength(2);
      expect(screen.getByTestId("dropdown-checkbox-item")).toBeInTheDocument();
      expect(screen.getByTestId("dropdown-radio-group")).toBeInTheDocument();
      expect(screen.getAllByTestId("dropdown-radio-item")).toHaveLength(2);
      expect(screen.getAllByTestId("dropdown-separator")).toHaveLength(2);

      // コンテンツの確認
      expect(screen.getByText("Options")).toBeInTheDocument();
      expect(screen.getByText("Actions")).toBeInTheDocument();
      expect(screen.getByText("Edit")).toBeInTheDocument();
      expect(screen.getByText("Copy")).toBeInTheDocument();
      expect(screen.getByText("Show Details")).toBeInTheDocument();
      expect(screen.getByText("Light")).toBeInTheDocument();
      expect(screen.getByText("Dark")).toBeInTheDocument();
    });

    it("複雑なネスト構造が動作する", () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>File</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              New
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Recent Files</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>document1.txt</DropdownMenuItem>
                <DropdownMenuItem>document2.txt</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Preferences</DropdownMenuLabel>
              <DropdownMenuItem inset>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      // ショートカットキーの確認
      expect(screen.getByText("⌘N")).toBeInTheDocument();

      // サブメニューの確認
      expect(screen.getByText("Recent Files")).toBeInTheDocument();
      expect(screen.getByText("document1.txt")).toBeInTheDocument();
      expect(screen.getByText("document2.txt")).toBeInTheDocument();

      // グループ化の確認
      expect(screen.getByTestId("dropdown-group")).toBeInTheDocument();
      expect(screen.getByText("Preferences")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();

      // ChevronRightアイコンの確認
      expect(screen.getByTestId("chevron-right-icon")).toBeInTheDocument();
    });
  });
});