import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// lucide-reactアイコンをモック
jest.mock("lucide-react", () => ({
  X: () => <svg data-testid="x-icon" />,
}));

// Radix UIのDialogをモック
jest.mock("@radix-ui/react-dialog", () => ({
  Root: ({ children, open, onOpenChange, ...props }: any) => (
    <div data-testid="dialog-root" data-open={open} {...props}>
      {children}
    </div>
  ),
  Trigger: ({ children, ...props }: any) => (
    <button data-testid="dialog-trigger" {...props}>
      {children}
    </button>
  ),
  Portal: ({ children }: any) => (
    <div data-testid="dialog-portal">{children}</div>
  ),
  Overlay: ({ className, ...props }: any) => (
    <div
      data-testid="dialog-overlay"
      className={className}
      {...props}
    />
  ),
  Content: ({ children, className, ...props }: any) => (
    <div
      data-testid="dialog-content"
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  Close: ({ children, className, ...props }: any) => (
    <button
      data-testid="dialog-close"
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
  Title: ({ children, className, ...props }: any) => (
    <h2
      data-testid="dialog-title"
      className={className}
      {...props}
    >
      {children}
    </h2>
  ),
  Description: ({ children, className, ...props }: any) => (
    <p
      data-testid="dialog-description"
      className={className}
      {...props}
    >
      {children}
    </p>
  ),
}));

describe("Dialog components", () => {
  describe("Dialog (Root)", () => {
    it("ルートコンポーネントが表示される", () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
        </Dialog>
      );

      expect(screen.getByTestId("dialog-root")).toBeInTheDocument();
    });

    it("開閉状態が管理される", () => {
      render(
        <Dialog open={true}>
          <DialogTrigger>Open Dialog</DialogTrigger>
        </Dialog>
      );

      const root = screen.getByTestId("dialog-root");
      expect(root).toHaveAttribute("data-open", "true");
    });
  });

  describe("DialogTrigger", () => {
    it("トリガーボタンが表示される", () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
        </Dialog>
      );

      const trigger = screen.getByTestId("dialog-trigger");
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent("Open Dialog");
      expect(trigger.tagName).toBe("BUTTON");
    });

    it("カスタムプロパティが適用される", () => {
      render(
        <Dialog>
          <DialogTrigger className="custom-trigger" id="trigger-1">
            Click Me
          </DialogTrigger>
        </Dialog>
      );

      const trigger = screen.getByTestId("dialog-trigger");
      expect(trigger).toHaveClass("custom-trigger");
      expect(trigger).toHaveAttribute("id", "trigger-1");
    });
  });

  describe("DialogContent", () => {
    it("コンテンツが表示される", () => {
      render(
        <Dialog>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <p>Content here</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByTestId("dialog-portal")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-overlay")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
    });

    it("基本スタイルが適用される", () => {
      render(
        <Dialog>
          <DialogContent>Test Content</DialogContent>
        </Dialog>
      );

      const content = screen.getByTestId("dialog-content");
      expect(content).toHaveClass(
        "fixed",
        "left-[50%]",
        "top-[50%]",
        "z-50",
        "grid",
        "w-full",
        "max-w-lg"
      );
    });

    it("閉じるボタンが自動で含まれる", () => {
      render(
        <Dialog>
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const closeButton = screen.getByTestId("dialog-close");
      expect(closeButton).toBeInTheDocument();
      expect(screen.getByTestId("x-icon")).toBeInTheDocument();
      expect(screen.getByText("Close")).toBeInTheDocument();
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Dialog>
          <DialogContent className="custom-content">
            Test
          </DialogContent>
        </Dialog>
      );

      const content = screen.getByTestId("dialog-content");
      expect(content).toHaveClass("custom-content");
    });
  });

  describe("DialogOverlay", () => {
    it("オーバーレイが表示される", () => {
      render(
        <Dialog>
          <DialogOverlay />
        </Dialog>
      );

      const overlay = screen.getByTestId("dialog-overlay");
      expect(overlay).toBeInTheDocument();
    });

    it("基本スタイルが適用される", () => {
      render(
        <Dialog>
          <DialogOverlay />
        </Dialog>
      );

      const overlay = screen.getByTestId("dialog-overlay");
      expect(overlay).toHaveClass(
        "fixed",
        "inset-0",
        "z-50",
        "bg-black/80"
      );
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Dialog>
          <DialogOverlay className="custom-overlay" />
        </Dialog>
      );

      const overlay = screen.getByTestId("dialog-overlay");
      expect(overlay).toHaveClass("custom-overlay");
    });
  });

  describe("DialogTitle", () => {
    it("タイトルが表示される", () => {
      render(
        <Dialog>
          <DialogTitle>Dialog Title</DialogTitle>
        </Dialog>
      );

      const title = screen.getByTestId("dialog-title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Dialog Title");
      expect(title.tagName).toBe("H2");
    });

    it("基本スタイルが適用される", () => {
      render(
        <Dialog>
          <DialogTitle>Title</DialogTitle>
        </Dialog>
      );

      const title = screen.getByTestId("dialog-title");
      expect(title).toHaveClass(
        "text-lg",
        "font-semibold",
        "leading-none",
        "tracking-tight"
      );
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Dialog>
          <DialogTitle className="custom-title">Title</DialogTitle>
        </Dialog>
      );

      const title = screen.getByTestId("dialog-title");
      expect(title).toHaveClass("custom-title");
    });
  });

  describe("DialogDescription", () => {
    it("説明文が表示される", () => {
      render(
        <Dialog>
          <DialogDescription>This is a description</DialogDescription>
        </Dialog>
      );

      const description = screen.getByTestId("dialog-description");
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent("This is a description");
      expect(description.tagName).toBe("P");
    });

    it("基本スタイルが適用される", () => {
      render(
        <Dialog>
          <DialogDescription>Description</DialogDescription>
        </Dialog>
      );

      const description = screen.getByTestId("dialog-description");
      expect(description).toHaveClass("text-sm", "text-muted-foreground");
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Dialog>
          <DialogDescription className="custom-description">
            Description
          </DialogDescription>
        </Dialog>
      );

      const description = screen.getByTestId("dialog-description");
      expect(description).toHaveClass("custom-description");
    });
  });

  describe("DialogHeader", () => {
    it("ヘッダーが表示される", () => {
      render(
        <Dialog>
          <DialogHeader data-testid="dialog-header">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
        </Dialog>
      );

      const header = screen.getByTestId("dialog-header");
      expect(header).toBeInTheDocument();
      expect(header.tagName).toBe("DIV");
    });

    it("基本スタイルが適用される", () => {
      render(
        <Dialog>
          <DialogHeader data-testid="dialog-header">
            Header Content
          </DialogHeader>
        </Dialog>
      );

      const header = screen.getByTestId("dialog-header");
      expect(header).toHaveClass(
        "flex",
        "flex-col",
        "space-y-1.5",
        "text-center",
        "sm:text-left"
      );
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Dialog>
          <DialogHeader className="custom-header" data-testid="dialog-header">
            Header
          </DialogHeader>
        </Dialog>
      );

      const header = screen.getByTestId("dialog-header");
      expect(header).toHaveClass("custom-header");
    });
  });

  describe("DialogFooter", () => {
    it("フッターが表示される", () => {
      render(
        <Dialog>
          <DialogFooter data-testid="dialog-footer">
            <button>Cancel</button>
            <button>OK</button>
          </DialogFooter>
        </Dialog>
      );

      const footer = screen.getByTestId("dialog-footer");
      expect(footer).toBeInTheDocument();
      expect(footer.tagName).toBe("DIV");
    });

    it("基本スタイルが適用される", () => {
      render(
        <Dialog>
          <DialogFooter data-testid="dialog-footer">
            Footer Content
          </DialogFooter>
        </Dialog>
      );

      const footer = screen.getByTestId("dialog-footer");
      expect(footer).toHaveClass(
        "flex",
        "flex-col-reverse",
        "sm:flex-row",
        "sm:justify-end",
        "sm:space-x-2"
      );
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Dialog>
          <DialogFooter className="custom-footer" data-testid="dialog-footer">
            Footer
          </DialogFooter>
        </Dialog>
      );

      const footer = screen.getByTestId("dialog-footer");
      expect(footer).toHaveClass("custom-footer");
    });
  });

  describe("DialogClose", () => {
    it("閉じるボタンが表示される", () => {
      render(
        <Dialog>
          <DialogClose>Close</DialogClose>
        </Dialog>
      );

      const closeButton = screen.getByTestId("dialog-close");
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveTextContent("Close");
      expect(closeButton.tagName).toBe("BUTTON");
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Dialog>
          <DialogClose className="custom-close">Close</DialogClose>
        </Dialog>
      );

      const closeButton = screen.getByTestId("dialog-close");
      expect(closeButton).toHaveClass("custom-close");
    });
  });

  describe("統合テスト", () => {
    it("完全なダイアログが正しく表示される", () => {
      render(
        <Dialog open={true}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmation</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this item?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <button>Delete</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      // 全ての要素が存在することを確認
      expect(screen.getByTestId("dialog-root")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-trigger")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-portal")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-overlay")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-title")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-description")).toBeInTheDocument();

      // コンテンツの確認
      expect(screen.getByText("Open")).toBeInTheDocument();
      expect(screen.getByText("Confirmation")).toBeInTheDocument();
      expect(screen.getByText("Are you sure you want to delete this item?")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByText("Delete")).toBeInTheDocument();
    });

    it("ネストした構造が正しく動作する", () => {
      render(
        <Dialog>
          <DialogContent className="max-w-md">
            <DialogHeader className="text-center">
              <DialogTitle className="text-xl">Important Notice</DialogTitle>
              <DialogDescription className="text-gray-600">
                Please read this carefully.
              </DialogDescription>
            </DialogHeader>
            <div className="my-4">
              <p>Additional content here.</p>
            </div>
            <DialogFooter className="justify-center">
              <DialogClose className="btn-secondary">Got it</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      // カスタムクラスの確認
      expect(screen.getByTestId("dialog-content")).toHaveClass("max-w-md");
      expect(screen.getByTestId("dialog-title")).toHaveClass("text-xl");
      expect(screen.getByTestId("dialog-description")).toHaveClass("text-gray-600");
      const closeButtons = screen.getAllByTestId("dialog-close");
      expect(closeButtons[0]).toHaveClass("btn-secondary");

      // コンテンツの確認
      expect(screen.getByText("Important Notice")).toBeInTheDocument();
      expect(screen.getByText("Please read this carefully.")).toBeInTheDocument();
      expect(screen.getByText("Additional content here.")).toBeInTheDocument();
      expect(screen.getByText("Got it")).toBeInTheDocument();
    });
  });
});