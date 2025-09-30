import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn/avatar";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

describe("Avatar components", () => {
  describe("Avatar", () => {
    it("基本的なAvatarが表示される", () => {
      render(<Avatar data-testid="avatar" />);

      const avatar = screen.getByTestId("avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar.tagName).toBe("DIV");
    });

    it("デフォルトサイズが適用される", () => {
      render(<Avatar data-testid="avatar" />);

      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass("h-12", "w-12");
    });

    it("カスタムサイズが適用される", () => {
      render(<Avatar size="lg" data-testid="avatar" />);

      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass("h-24", "w-24");
    });

    it("小サイズが適用される", () => {
      render(<Avatar size="sm" data-testid="avatar" />);

      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass("h-10", "w-10");
    });

    it("中サイズが適用される", () => {
      render(<Avatar size="md" data-testid="avatar" />);

      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass("h-16", "w-16");
    });

    it("カスタムクラス名が適用される", () => {
      render(<Avatar className="custom-avatar" data-testid="avatar" />);

      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass("custom-avatar");
    });

    it("基本スタイルが適用される", () => {
      render(<Avatar data-testid="avatar" />);

      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass(
        "relative",
        "inline-block",
        "overflow-hidden",
        "rounded-full",
        "bg-muted"
      );
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Avatar ref={ref} data-testid="avatar" />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("AvatarImage", () => {
    it("Avatar画像が表示される", () => {
      render(
        <AvatarImage
          src="/test-image.jpg"
          alt="Test Avatar"
          data-testid="avatar-image"
        />
      );

      const image = screen.getByTestId("avatar-image");
      expect(image).toBeInTheDocument();
      expect(image.tagName).toBe("IMG");
      expect(image).toHaveAttribute("src", "/test-image.jpg");
      expect(image).toHaveAttribute("alt", "Test Avatar");
    });

    it("デフォルトの丸い形状が適用される", () => {
      render(<AvatarImage data-testid="avatar-image" />);

      const image = screen.getByTestId("avatar-image");
      expect(image).toHaveClass("rounded-full");
    });

    it("四角い形状が適用される", () => {
      render(<AvatarImage shape="square" data-testid="avatar-image" />);

      const image = screen.getByTestId("avatar-image");
      expect(image).toHaveClass("rounded-md");
    });

    it("基本スタイルが適用される", () => {
      render(<AvatarImage data-testid="avatar-image" />);

      const image = screen.getByTestId("avatar-image");
      expect(image).toHaveClass("h-full", "w-full", "object-cover");
    });

    it("カスタムクラス名が適用される", () => {
      render(<AvatarImage className="custom-image" data-testid="avatar-image" />);

      const image = screen.getByTestId("avatar-image");
      expect(image).toHaveClass("custom-image");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLImageElement>();
      render(<AvatarImage ref={ref} data-testid="avatar-image" />);

      expect(ref.current).toBeInstanceOf(HTMLImageElement);
    });
  });

  describe("AvatarFallback", () => {
    it("フォールバックが表示される", () => {
      render(
        <AvatarFallback data-testid="avatar-fallback">
          JD
        </AvatarFallback>
      );

      const fallback = screen.getByTestId("avatar-fallback");
      expect(fallback).toBeInTheDocument();
      expect(fallback.tagName).toBe("DIV");
      expect(fallback).toHaveTextContent("JD");
    });

    it("デフォルトの丸い形状が適用される", () => {
      render(<AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>);

      const fallback = screen.getByTestId("avatar-fallback");
      expect(fallback).toHaveClass("rounded-full");
    });

    it("四角い形状が適用される", () => {
      render(
        <AvatarFallback shape="square" data-testid="avatar-fallback">
          JD
        </AvatarFallback>
      );

      const fallback = screen.getByTestId("avatar-fallback");
      expect(fallback).toHaveClass("rounded-md");
    });

    it("基本スタイルが適用される", () => {
      render(<AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>);

      const fallback = screen.getByTestId("avatar-fallback");
      expect(fallback).toHaveClass(
        "absolute",
        "inset-0",
        "h-full",
        "w-full",
        "flex",
        "items-center",
        "justify-center"
      );
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <AvatarFallback className="custom-fallback" data-testid="avatar-fallback">
          JD
        </AvatarFallback>
      );

      const fallback = screen.getByTestId("avatar-fallback");
      expect(fallback).toHaveClass("custom-fallback");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <AvatarFallback ref={ref} data-testid="avatar-fallback">
          JD
        </AvatarFallback>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("統合テスト", () => {
    it("完全なAvatarコンポーネントが正しく表示される", () => {
      render(
        <Avatar data-testid="complete-avatar">
          <AvatarImage
            src="/user.jpg"
            alt="User Avatar"
            data-testid="avatar-image"
          />
          <AvatarFallback data-testid="avatar-fallback">
            UA
          </AvatarFallback>
        </Avatar>
      );

      // 全ての要素が存在することを確認
      expect(screen.getByTestId("complete-avatar")).toBeInTheDocument();
      expect(screen.getByTestId("avatar-image")).toBeInTheDocument();
      expect(screen.getByTestId("avatar-fallback")).toBeInTheDocument();

      // コンテンツの確認
      expect(screen.getByTestId("avatar-image")).toHaveAttribute("src", "/user.jpg");
      expect(screen.getByTestId("avatar-fallback")).toHaveTextContent("UA");
    });

    it("異なるサイズとシェイプの組み合わせが動作する", () => {
      render(
        <Avatar size="lg" data-testid="large-avatar">
          <AvatarImage
            shape="square"
            src="/square.jpg"
            data-testid="square-image"
          />
          <AvatarFallback
            shape="square"
            data-testid="square-fallback"
          >
            SQ
          </AvatarFallback>
        </Avatar>
      );

      const avatar = screen.getByTestId("large-avatar");
      const image = screen.getByTestId("square-image");
      const fallback = screen.getByTestId("square-fallback");

      // サイズの確認
      expect(avatar).toHaveClass("h-24", "w-24");

      // シェイプの確認
      expect(image).toHaveClass("rounded-md");
      expect(fallback).toHaveClass("rounded-md");
    });
  });
});