import { Badge } from "@/components/ui/shadcn/badge";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

describe("Badge component", () => {
  it("基本的なバッジが表示される", () => {
    render(<Badge data-testid="badge">Default Badge</Badge>);

    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge.tagName).toBe("DIV");
    expect(badge).toHaveTextContent("Default Badge");
  });

  it("基本スタイルが適用される", () => {
    render(<Badge data-testid="badge">Test</Badge>);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass(
      "inline-flex",
      "items-center",
      "rounded-md",
      "border",
      "px-2.5",
      "py-0.5",
      "text-xs",
      "font-semibold"
    );
  });

  it("デフォルトバリアントが適用される", () => {
    render(<Badge data-testid="badge">Default</Badge>);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass(
      "border-transparent",
      "bg-primary",
      "text-primary-foreground"
    );
  });

  it("secondaryバリアントが適用される", () => {
    render(<Badge variant="secondary" data-testid="badge">Secondary</Badge>);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass(
      "border-transparent",
      "bg-secondary",
      "text-secondary-foreground"
    );
  });

  it("destructiveバリアントが適用される", () => {
    render(<Badge variant="destructive" data-testid="badge">Destructive</Badge>);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass(
      "border-transparent",
      "bg-destructive",
      "text-destructive-foreground"
    );
  });

  it("outlineバリアントが適用される", () => {
    render(<Badge variant="outline" data-testid="badge">Outline</Badge>);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("text-foreground");
  });

  it("カスタムクラス名が適用される", () => {
    render(<Badge className="custom-badge" data-testid="badge">Custom</Badge>);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("custom-badge");
  });

  it("カスタム属性が適用される", () => {
    render(
      <Badge
        data-testid="badge"
        id="test-badge"
        role="status"
      >
        Test Badge
      </Badge>
    );

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveAttribute("id", "test-badge");
    expect(badge).toHaveAttribute("role", "status");
  });

  it("子要素が正しく表示される", () => {
    render(
      <Badge data-testid="badge">
        <span>Icon</span>
        Badge Text
      </Badge>
    );

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveTextContent("IconBadge Text");
    expect(badge.querySelector("span")).toHaveTextContent("Icon");
  });

  it("数値コンテンツが表示される", () => {
    render(<Badge data-testid="badge">42</Badge>);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveTextContent("42");
  });

  it("空のバッジでも表示される", () => {
    render(<Badge data-testid="badge" />);

    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("");
  });

  describe("バリアントの組み合わせテスト", () => {
    const variants = ["default", "secondary", "destructive", "outline"] as const;

    variants.forEach((variant) => {
      it(`${variant}バリアントでカスタムクラスが併用できる`, () => {
        render(
          <Badge
            variant={variant}
            className="custom-class"
            data-testid="badge"
          >
            {variant}
          </Badge>
        );

        const badge = screen.getByTestId("badge");
        expect(badge).toHaveClass("custom-class");
        expect(badge).toHaveTextContent(variant);
      });
    });
  });

  describe("アクセシビリティテスト", () => {
    it("aria-labelが適用される", () => {
      render(
        <Badge aria-label="Notification count" data-testid="badge">
          5
        </Badge>
      );

      const badge = screen.getByTestId("badge");
      expect(badge).toHaveAttribute("aria-label", "Notification count");
    });

    it("ロールが適用される", () => {
      render(
        <Badge role="img" aria-label="Status indicator" data-testid="badge">
          ●
        </Badge>
      );

      const badge = screen.getByTestId("badge");
      expect(badge).toHaveAttribute("role", "img");
      expect(badge).toHaveAttribute("aria-label", "Status indicator");
    });
  });
});