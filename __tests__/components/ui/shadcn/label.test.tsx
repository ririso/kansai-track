import { Label } from "@/components/ui/shadcn/label";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// Radix UIのLabelをモック
jest.mock("@radix-ui/react-label", () => ({
  Root: ({ children, className, ...props }: any) => (
    <label
      data-testid="radix-label"
      className={className}
      {...props}
    >
      {children}
    </label>
  ),
}));

describe("Label component", () => {
  it("基本的なラベルが表示される", () => {
    render(<Label data-testid="label">Test Label</Label>);

    const label = screen.getByTestId("label");
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveTextContent("Test Label");
  });

  it("Radix UIコンポーネントが使用されている", () => {
    render(<Label>Test</Label>);

    expect(screen.getByTestId("radix-label")).toBeInTheDocument();
  });

  it("基本スタイルが適用される", () => {
    render(<Label data-testid="label">Styled Label</Label>);

    const label = screen.getByTestId("label");
    expect(label).toHaveClass(
      "text-sm",
      "font-medium",
      "leading-none",
      "peer-disabled:cursor-not-allowed",
      "peer-disabled:opacity-70"
    );
  });

  it("カスタムクラス名が適用される", () => {
    render(<Label className="custom-label" data-testid="label">Custom</Label>);

    const label = screen.getByTestId("label");
    expect(label).toHaveClass("custom-label");
  });

  it("htmlFor属性が適用される", () => {
    render(<Label htmlFor="input-id" data-testid="label">Input Label</Label>);

    const label = screen.getByTestId("label");
    expect(label).toHaveAttribute("for", "input-id");
  });

  it("フォーム要素との関連付けができる", () => {
    render(
      <div>
        <Label htmlFor="test-input" data-testid="label">
          Email Address
        </Label>
        <input id="test-input" type="email" data-testid="input" />
      </div>
    );

    const label = screen.getByTestId("label");
    const input = screen.getByTestId("input");

    expect(label).toHaveAttribute("for", "test-input");
    expect(input).toHaveAttribute("id", "test-input");
  });

  it("ラベル要素として正しく表示される", () => {
    render(<Label data-testid="label">Label Element</Label>);

    const label = screen.getByTestId("label");
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe("LABEL");
  });

  it("カスタム属性が適用される", () => {
    render(
      <Label
        data-testid="label"
        id="custom-label"
        role="label"
        aria-required="true"
      >
        Required Field
      </Label>
    );

    const label = screen.getByTestId("label");
    expect(label).toHaveAttribute("id", "custom-label");
    expect(label).toHaveAttribute("role", "label");
    expect(label).toHaveAttribute("aria-required", "true");
  });

  it("子要素が正しく表示される", () => {
    render(
      <Label data-testid="label">
        <span>Required</span>
        Field Name
        <span className="text-red-500">*</span>
      </Label>
    );

    const label = screen.getByTestId("label");
    expect(label).toHaveTextContent("RequiredField Name*");
    expect(label.querySelector("span")).toHaveTextContent("Required");
  });

  describe("アクセシビリティテスト", () => {
    it("aria-labelが適用される", () => {
      render(
        <Label aria-label="Form field label" data-testid="label">
          Username
        </Label>
      );

      const label = screen.getByTestId("label");
      expect(label).toHaveAttribute("aria-label", "Form field label");
    });

    it("aria-describedbyが適用される", () => {
      render(
        <Label aria-describedby="help-text" data-testid="label">
          Password
        </Label>
      );

      const label = screen.getByTestId("label");
      expect(label).toHaveAttribute("aria-describedby", "help-text");
    });

    it("required状態が表現できる", () => {
      render(
        <Label data-testid="label" aria-required="true">
          Required Field *
        </Label>
      );

      const label = screen.getByTestId("label");
      expect(label).toHaveAttribute("aria-required", "true");
      expect(label).toHaveTextContent("Required Field *");
    });
  });

  describe("統合テスト", () => {
    it("完全なフォームラベルとして機能する", () => {
      render(
        <div>
          <Label
            htmlFor="email"
            className="block mb-2"
            data-testid="email-label"
          >
            Email Address
          </Label>
          <input
            id="email"
            type="email"
            className="w-full"
            data-testid="email-input"
          />
        </div>
      );

      const label = screen.getByTestId("email-label");
      const input = screen.getByTestId("email-input");

      expect(label).toHaveAttribute("for", "email");
      expect(input).toHaveAttribute("id", "email");
      expect(label).toHaveClass("block", "mb-2");
    });

    it("複雑なラベルコンテンツが表示される", () => {
      render(
        <Label data-testid="complex-label">
          <strong>Important:</strong>
          <span> Field description </span>
          <em>(required)</em>
        </Label>
      );

      const label = screen.getByTestId("complex-label");
      expect(label).toHaveTextContent("Important: Field description (required)");
      expect(label.querySelector("strong")).toHaveTextContent("Important:");
      expect(label.querySelector("em")).toHaveTextContent("(required)");
    });
  });
});