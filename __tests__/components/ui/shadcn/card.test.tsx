import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

describe("Card components", () => {
  describe("Card", () => {
    it("基本的なカードが表示される", () => {
      render(<Card data-testid="card">Card Content</Card>);

      const card = screen.getByTestId("card");
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent("Card Content");
    });

    it("カスタムクラス名が適用される", () => {
      render(<Card className="custom-class" data-testid="card">Card Content</Card>);

      const card = screen.getByTestId("card");
      expect(card).toHaveClass("custom-class");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref} data-testid="card">Card Content</Card>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("その他のpropsが正しく渡される", () => {
      render(<Card data-testid="card" aria-label="test-card">Card Content</Card>);

      const card = screen.getByTestId("card");
      expect(card).toHaveAttribute("aria-label", "test-card");
    });
  });

  describe("CardHeader", () => {
    it("ヘッダーが表示される", () => {
      render(<CardHeader data-testid="card-header">Header Content</CardHeader>);

      const header = screen.getByTestId("card-header");
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent("Header Content");
    });

    it("カスタムクラス名が適用される", () => {
      render(<CardHeader className="custom-header" data-testid="card-header">Header</CardHeader>);

      const header = screen.getByTestId("card-header");
      expect(header).toHaveClass("custom-header");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardHeader ref={ref} data-testid="card-header">Header</CardHeader>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("CardTitle", () => {
    it("タイトルが表示される", () => {
      render(<CardTitle data-testid="card-title">Card Title</CardTitle>);

      const title = screen.getByTestId("card-title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Card Title");
    });

    it("カスタムクラス名が適用される", () => {
      render(<CardTitle className="custom-title" data-testid="card-title">Title</CardTitle>);

      const title = screen.getByTestId("card-title");
      expect(title).toHaveClass("custom-title");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardTitle ref={ref} data-testid="card-title">Title</CardTitle>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("CardDescription", () => {
    it("説明が表示される", () => {
      render(<CardDescription data-testid="card-description">Card Description</CardDescription>);

      const description = screen.getByTestId("card-description");
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent("Card Description");
    });

    it("カスタムクラス名が適用される", () => {
      render(<CardDescription className="custom-desc" data-testid="card-description">Desc</CardDescription>);

      const description = screen.getByTestId("card-description");
      expect(description).toHaveClass("custom-desc");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardDescription ref={ref} data-testid="card-description">Description</CardDescription>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("CardContent", () => {
    it("コンテンツが表示される", () => {
      render(<CardContent data-testid="card-content">Card Content</CardContent>);

      const content = screen.getByTestId("card-content");
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent("Card Content");
    });

    it("カスタムクラス名が適用される", () => {
      render(<CardContent className="custom-content" data-testid="card-content">Content</CardContent>);

      const content = screen.getByTestId("card-content");
      expect(content).toHaveClass("custom-content");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardContent ref={ref} data-testid="card-content">Content</CardContent>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("CardFooter", () => {
    it("フッターが表示される", () => {
      render(<CardFooter data-testid="card-footer">Card Footer</CardFooter>);

      const footer = screen.getByTestId("card-footer");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveTextContent("Card Footer");
    });

    it("カスタムクラス名が適用される", () => {
      render(<CardFooter className="custom-footer" data-testid="card-footer">Footer</CardFooter>);

      const footer = screen.getByTestId("card-footer");
      expect(footer).toHaveClass("custom-footer");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardFooter ref={ref} data-testid="card-footer">Footer</CardFooter>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("統合テスト", () => {
    it("完全なカード構造が正しく表示される", () => {
      render(
        <Card data-testid="full-card">
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Test Content</p>
          </CardContent>
          <CardFooter>
            <span>Test Footer</span>
          </CardFooter>
        </Card>
      );

      expect(screen.getByTestId("full-card")).toBeInTheDocument();
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
      expect(screen.getByText("Test Footer")).toBeInTheDocument();
    });
  });
});