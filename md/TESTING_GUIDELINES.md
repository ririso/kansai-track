# テストコード作成ガイドライン

このプロジェクトでのテストコード作成時に従うべきガイドラインです。Claude Codeや開発者が一貫性のあるテストを作成するための参考資料として使用してください。

## プロジェクト構成

### テスト環境
- **フレームワーク**: Jest
- **テストライブラリ**: @testing-library/react
- **マッチャー**: @testing-library/jest-dom
- **実行コマンド**:
  - 開発時: `npm test` (watch mode)
  - CI: `npm run test:ci` (coverage付き)

### ディレクトリ構造
```
__tests__/
├── components/
│   ├── common/
│   ├── dashboard/
│   ├── layout/
│   ├── repayment/
│   └── ui/
│       └── shadcn/
└── [その他のテストディレクトリ]
```

## テストファイル命名規則

- **ファイル名**: `{コンポーネント名}.test.tsx`
- **配置場所**: `__tests__/components/{カテゴリ}/{コンポーネント名}.test.tsx`
- **例**:
  - `src/components/common/Pagination.tsx` → `__tests__/components/common/Pagination.test.tsx`
  - `src/components/dashboard/Greeting.tsx` → `__tests__/components/dashboard/Greeting.test.tsx`

## テストコードの基本構造

### 必須インポート
```tsx
import ComponentName from "@/components/path/ComponentName";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
```

### 追加で必要な場合のインポート
```tsx
import { fireEvent } from "@testing-library/react"; // ユーザーインタラクション用
```

### 基本テンプレート
```tsx
import ComponentName from "@/components/path/ComponentName";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("ComponentName component", () => {
  it("基本的な表示テスト", () => {
    render(<ComponentName />);

    expect(screen.getByText("期待するテキスト")).toBeInTheDocument();
  });
});
```

## テストケースの分類

### 1. 基本表示テスト
- コンポーネントが正しくレンダリングされるか
- 期待するテキスト・要素が表示されるか

```tsx
it("コンポーネントが正しく表示される", () => {
  render(<ComponentName />);

  expect(screen.getByText("期待するテキスト")).toBeInTheDocument();
});
```

### 2. プロパティテスト
- propsが正しく反映されるか
- 条件付きレンダリングが正しく動作するか

```tsx
it("プロパティが正しく反映される", () => {
  render(<ComponentName title="テストタイトル" />);

  expect(screen.getByText("テストタイトル")).toBeInTheDocument();
});
```

### 3. インタラクションテスト
- クリック、フォーム入力などのユーザーアクションテスト
- コールバック関数の呼び出しテスト

```tsx
it("クリックイベントが正しく動作する", () => {
  const handleClick = jest.fn();
  render(<ComponentName onClick={handleClick} />);

  const button = screen.getByRole("button");
  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 4. 状態テスト
- disabled状態、アクティブ状態などの確認

```tsx
it("disabled状態が正しく動作する", () => {
  render(<ComponentName disabled />);

  const button = screen.getByRole("button");
  expect(button).toBeDisabled();
});
```

## モック作成のガイドライン

### lucide-reactアイコンのモック
```tsx
jest.mock("lucide-react", () => ({
  IconName: () => <svg data-testid="icon-name" />,
  AnotherIcon: () => <svg data-testid="another-icon" />,
}));
```

### ユーティリティ関数のモック
```tsx
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));
```

### 外部ライブラリのモック
```tsx
jest.mock("external-library", () => ({
  exportedFunction: jest.fn(),
}));
```

## テストの書き方のベストプラクティス

### 1. describe文
- コンポーネント名を含める: `"ComponentName component"`

### 2. it文
- 日本語で具体的に: `"ユーザー名付きの挨拶メッセージが表示される"`
- 1つのテストに1つの観点

### 3. アサーション
- 明確で読みやすい期待値を設定
- 適切なマッチャーを使用

### 4. セットアップとクリーンアップ
```tsx
describe("ComponentName component", () => {
  const mockFunction = jest.fn();

  beforeEach(() => {
    mockFunction.mockClear();
  });

  // テストケース...
});
```

## 各コンポーネントタイプ別のテスト観点

### UIコンポーネント（Button, Input等）
- 基本表示
- バリアント（variant）の確認
- サイズの確認
- disabled状態
- クリックイベント
- カスタムクラスの適用

### レイアウトコンポーネント（Header, Footer等）
- 基本表示
- 各要素の存在確認
- アイコンの表示
- 適切なセマンティック要素（header, footer等）

### 機能コンポーネント（Pagination, Greeting等）
- 基本表示
- プロパティの反映
- ユーザーインタラクション
- 条件付きレンダリング

### データ表示コンポーネント
- データの正しい表示
- 空データ時の表示
- フィルタリング機能
- ソート機能

## テスト実行とカバレッジ

### 実行方法
```bash
# 開発時（watch mode）
npm test

# CI環境（カバレッジ付き）
npm run test:ci

# 特定のファイルのみ
npm test ComponentName.test.tsx
```

### カバレッジ目標
- 文（Statements）: 80%以上
- 分岐（Branch）: 70%以上
- 関数（Functions）: 80%以上
- 行（Lines）: 80%以上

## よくある問題と解決方法

### 1. モジュールが見つからない
```tsx
// エラー: Cannot find module '@/components/...'
// 解決: tsconfig.jsonのbaseUrlとpathsの設定を確認
```

### 2. lucide-reactアイコンのエラー
```tsx
// 解決: 適切なモックを追加
jest.mock("lucide-react", () => ({
  ArrowLeft: () => <svg data-testid="arrow-left" />,
}));
```

### 3. CSS-in-JSライブラリのエラー
```tsx
// 解決: クラス名結合関数のモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));
```

## チェックリスト

新しいコンポーネントのテスト作成時は以下を確認：

- [ ] テストファイルが適切な場所に配置されている
- [ ] 必要なインポートが全て含まれている
- [ ] describe文にコンポーネント名が含まれている
- [ ] 基本表示テストが含まれている
- [ ] プロパティがある場合、プロパティテストが含まれている
- [ ] ユーザーインタラクションがある場合、インタラクションテストが含まれている
- [ ] 必要なモックが適切に設定されている
- [ ] 全てのテストが通る
- [ ] テストケース名が日本語で分かりやすい

## 参考リンク

- [Jest公式ドキュメント](https://jestjs.io/docs/getting-started)
- [Testing Library公式ドキュメント](https://testing-library.com/docs/react-testing-library/intro/)
- [jest-dom公式ドキュメント](https://github.com/testing-library/jest-dom)