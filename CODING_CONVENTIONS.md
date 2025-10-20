# コーディング規約

このドキュメントは Kansai Track プロジェクトにおけるコーディング規約を定義します。

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [技術スタック](#技術スタック)
3. [ディレクトリ構造](#ディレクトリ構造)
4. [命名規則](#命名規則)
5. [TypeScript規約](#typescript規約)
6. [React コンポーネント規約](#react-コンポーネント規約)
7. [スタイリング規約](#スタイリング規約)
8. [インポート・エクスポート規約](#インポートエクスポート規約)
9. [テスト規約](#テスト規約)
10. [ユーティリティ関数規約](#ユーティリティ関数規約)
11. [API規約](#api規約)
12. [コメント・ドキュメント規約](#コメントドキュメント規約)
13. [Linter・フォーマッター設定](#linterフォーマッター設定)

## プロジェクト概要

Kansai Track は奨学金返済管理システムです。日本語UIを使用し、TypeScriptで型安全性を重視した開発を行います。

## 技術スタック

### コア技術
- **フレームワーク**: Next.js 15 (App Router)
- **ライブラリ**: React 18
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS + shadcn/ui
- **テスト**: Jest + @testing-library/react
- **認証**: NextAuth.js
- **トランスパイラ**: SWC

### 開発ツール
- **Linter**: ESLint
- **フォーマッター**: Prettier
- **パッケージマネージャー**: npm

## ディレクトリ構造

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/          # ダッシュボードページ
│   ├── schedule/           # スケジュールページ
│   ├── layout.tsx          # レイアウトコンポーネント
│   └── page.tsx            # ページコンポーネント
├── components/             # Reactコンポーネント
│   ├── common/             # 共通コンポーネント
│   ├── dashboard/          # ダッシュボード固有
│   ├── layout/             # レイアウト関連
│   ├── repayment/          # 返済関連
│   ├── ui/                 # UIコンポーネント
│   │   └── shadcn/         # shadcn/uiコンポーネント
│   └── __tests__/          # テストファイル
├── hooks/                  # カスタムフック
├── lib/                    # ライブラリ・設定
│   └── api/                # API関連
├── types/                  # TypeScript型定義
│   └── enums/              # Enum定義
└── utils/                  # ユーティリティ関数
```

### ディレクトリ構造ルール

1. **機能別分割**: コンポーネントは機能（dashboard, repayment等）ごとに分割
2. **共通要素の抽出**: 複数箇所で使用される要素は `common/` または `ui/` に配置
3. **テストファイル配置**: `__tests__/` ディレクトリ内に対応する構造で配置
4. **型定義の集約**: すべての型定義は `types/` ディレクトリに集約

## 命名規則

### ファイル・ディレクトリ名

| 種類 | 規則 | 例 |
|------|------|-----|
| Reactコンポーネント | PascalCase | `DashboardCard.tsx` |
| ページコンポーネント | page.tsx | `app/dashboard/page.tsx` |
| レイアウトコンポーネント | layout.tsx | `app/layout.tsx` |
| ユーティリティ関数 | camelCase | `formatJapaneseDate.ts` |
| API関数 | camelCase | `getRepaymentSchedule.ts` |
| 型定義ファイル | camelCase | `repaymentInfo.ts` |
| Enumファイル | camelCase | `paymentCategory.ts` |
| テストファイル | {対象名}.test.tsx | `Pagination.test.tsx` |
| フックファイル | camelCase (use prefix) | `useScheduleFilters.ts` |
| ディレクトリ | kebab-case | `repayment-history/` |

### 変数・関数名

| 種類 | 規則 | 例 |
|------|------|-----|
| 変数 | camelCase | `currentPage`, `totalCount` |
| 関数 | camelCase | `formatJapaneseDate`, `calculateProgress` |
| 定数 | UPPER_SNAKE_CASE | `TRANSFER_PATTERN`, `MAX_ITEMS_PER_PAGE` |
| Reactコンポーネント | PascalCase | `DashboardCard`, `Pagination` |
| TypeScript型 | PascalCase | `RepaymentInfo`, `PaymentCategory` |
| TypeScript interface | PascalCase | `Props`, `ApiResponse` |
| Enum | PascalCase | `PaymentCategory` |
| Enum値 | PascalCase | `Normal`, `Special` |

### CSS クラス名

- **Tailwind CSS**: 標準のクラス名を使用
- **カスタムクラス**: kebab-case （`fade-in`, `custom-shadow`）

## TypeScript規約

### 基本ルール

1. **strict モード**: 必須
2. **型アノテーション**: 推論できない場合は明示的に記述
3. **any型の禁止**: 特別な理由がない限り使用禁止
4. **null/undefined チェック**: strict null checksを活用

### 型定義

#### Interface vs Type

```typescript
// Props定義 - type を使用
type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

// データ構造 - type を使用（既存パターンに従う）
export type RepaymentInfo = {
  id: string;
  date: string;
  transactionName: string;
  credit: number;
  note: string;
};
```

#### Enum定義

```typescript
// 日本語の値を持つEnum
export enum PaymentCategory {
  Normal = "通常",
  Special = "特別",
}

export enum RepaymentStatus {
  Pending = "未払い",
  Paid = "支払済み",
  Overdue = "延滞",
}
```

#### 関数型定義

```typescript
// コールバック関数
type EventHandler = (event: React.MouseEvent) => void;
type AsyncHandler = () => Promise<void>;

// ユーティリティ関数
type DateFormatter = (dateStr: string) => string;
```

### 型ガード

```typescript
// 型ガードの実装
function isValidTransaction(obj: unknown): obj is Transaction {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'paidDate' in obj &&
    'transactionName' in obj &&
    'credit' in obj
  );
}
```

## React コンポーネント規約

### 基本構造

```typescript
// インポート（順序重要）
import React from 'react'; // React関連
import { useState, useEffect } from 'react'; // Reactフック
import Link from 'next/link'; // Next.js関連
import { Button } from '@/components/ui/shadcn/button'; // UIコンポーネント
import { CustomComponent } from '@/components/common/CustomComponent'; // 独自コンポーネント
import { formatDate } from '@/utils/formatDate'; // ユーティリティ
import { RepaymentInfo } from '@/types/repaymentInfo'; // 型定義

// Props型定義
type Props = {
  data: RepaymentInfo[];
  onUpdate: (id: string) => void;
  isLoading?: boolean; // オプショナルプロパティ
};

// メインコンポーネント（default export）
export default function ComponentName({ data, onUpdate, isLoading = false }: Props) {
  // ステート定義
  const [currentPage, setCurrentPage] = useState(1);

  // エフェクト
  useEffect(() => {
    // 処理
  }, [data]);

  // イベントハンドラ
  const handleClick = (id: string) => {
    onUpdate(id);
  };

  // 条件分岐での早期リターン
  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  // JSX
  return (
    <div className="p-4">
      {/* コンポーネント内容 */}
    </div>
  );
}
```

### コンポーネント設計ルール

1. **単一責任原則**: 1つのコンポーネントは1つの責任のみ
2. **Props の明示的な型定義**: 必ず `Props` 型を定義
3. **default export**: メインコンポーネントは default export
4. **早期リターン**: 条件分岐は早期リターンを活用
5. **日本語UI**: ユーザー向け文字列は日本語

### フック使用ルール

```typescript
// カスタムフック例
export function useScheduleFilters(initialData: RepaymentInfo[]) {
  const [filteredData, setFilteredData] = useState(initialData);
  const [statusFilter, setStatusFilter] = useState<RepaymentStatus | null>(null);

  // フィルタリングロジック
  useEffect(() => {
    let filtered = initialData;
    if (statusFilter) {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    setFilteredData(filtered);
  }, [initialData, statusFilter]);

  return {
    filteredData,
    statusFilter,
    setStatusFilter,
  };
}
```

## スタイリング規約

### Tailwind CSS

1. **クラス名の順序**: レスポンシブ → 状態 → その他
2. **カスタムクラス**: `tailwind.config.mjs` で定義
3. **日本語対応**: 適切なフォントファミリーを指定

```typescript
// 良い例
<Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white">
  送信する
</Button>

// 長いクラス名は分割
<div className={`
  flex flex-col sm:flex-row
  items-center justify-between
  mt-6 gap-4
  border rounded-lg
  p-4 shadow-custom
`}>
```

### カスタムスタイル

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* カスタムコンポーネントクラス */
@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
  }
}

/* カスタムユーティリティ */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## インポート・エクスポート規約

### インポート順序

```typescript
// 1. React関連
import React from 'react';
import { useState, useEffect } from 'react';

// 2. 外部ライブラリ
import Link from 'next/link';
import { clsx } from 'clsx';

// 3. UIコンポーネント（shadcn/ui）
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent } from '@/components/ui/shadcn/card';

// 4. 内部コンポーネント
import { Header } from '@/components/layout/Header';
import { Pagination } from '@/components/common/Pagination';

// 5. フック
import { useScheduleFilters } from '@/hooks/useScheduleFilters';

// 6. ユーティリティ・ライブラリ
import { formatJapaneseDate } from '@/utils/formatJapaneseDate';
import { getRepaymentSchedule } from '@/lib/api/getRepaymentSchedule';

// 7. 型定義
import { RepaymentInfo } from '@/types/repaymentInfo';
import { PaymentCategory } from '@/types/enums/paymentCategory';
```

### エクスポートルール

```typescript
// デフォルトエクスポート（メインコンポーネント）
export default function DashboardCard() {
  // ...
}

// 名前付きエクスポート（型定義、ユーティリティ）
export type RepaymentInfo = {
  // ...
};

export function formatJapaneseDate(dateStr: string): string {
  // ...
}

// 複数エクスポート
export {
  formatJapaneseDate,
  calculateProgress
} from './utils';
```

## テスト規約

### ファイル構造

```
src/components/__tests__/
├── common/
│   └── Pagination.test.tsx
├── dashboard/
│   └── DashboardCard.test.tsx
└── ui/
    └── shadcn/
        └── button.test.tsx
```

### テスト記述ルール

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '@/components/common/Pagination';

describe('Pagination component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  // テスト名は日本語で記述
  it('正しい表示情報が表示される', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalCount={50}
        itemsPerPage={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('50件中 1-10件を表示')).toBeInTheDocument();
  });

  it('前へボタンが最初のページで無効になっている', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalCount={50}
        itemsPerPage={10}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByText('前へ');
    expect(prevButton).toBeDisabled();
  });
});
```

### テストのベストプラクティス

1. **テスト名**: 日本語で記述、動作を明確に表現
2. **アクセシビリティ**: `getByRole`, `getByLabelText` を優先使用
3. **モック**: 外部依存は適切にモック化
4. **カバレッジ**: 重要な分岐は必ずテスト
5. **非同期テスト**: `waitFor`, `findBy*` を適切に使用

## ユーティリティ関数規約

### 基本ルール

```typescript
// 単一目的の関数
export function formatJapaneseDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('/');
  return `${year}年${month}月${day}日`;
}

// 型ガード付きの変換関数
export function mapJapaneseKeysToEnglish(parsedData: JapaneseCsvRow[]): Transaction[] {
  const keyMap: Record<JapaneseKey, EnglishKey> = {
    日付: 'paidDate',
    内容: 'transactionName',
    '出金金額(円)': 'credit',
    メモ: 'note',
  };

  // 実装...
  return validRows;
}

// エラーハンドリング付きの計算関数
export function calculateRepaymentProgress(
  totalAmount: number,
  paidAmount: number
): number {
  if (totalAmount <= 0) {
    throw new Error('総額は正の数である必要があります');
  }

  return Math.min((paidAmount / totalAmount) * 100, 100);
}
```

### ユーティリティ関数の設計原則

1. **純粋関数**: 副作用がない
2. **単一責任**: 1つの関数は1つの機能のみ
3. **型安全**: 入力と出力の型を明示
4. **エラーハンドリング**: 適切な例外処理
5. **日本語対応**: 日本固有のフォーマット処理

## API規約

### API関数の定義

```typescript
// APIレスポンス型定義
type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

// API関数の実装
export async function getRepaymentSchedule(): Promise<RepaymentScheduleItem[]> {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

  try {
    const res = await fetch(`${endpoint}/repayments/schedule`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.items;
  } catch (error) {
    console.error('返済スケジュール取得エラー:', error);
    throw error;
  }
}
```

### API呼び出しのベストプラクティス

1. **エラーハンドリング**: 必ず try-catch で囲む
2. **型安全**: レスポンスの型を定義
3. **ログ出力**: エラー時は日本語でログ出力
4. **環境変数**: エンドポイントは環境変数で管理
5. **再利用性**: 共通処理は抽象化

## コメント・ドキュメント規約

### コメントルール

```typescript
/**
 * 日本語の日付文字列を和暦形式でフォーマットする
 * @param dateStr - YYYY/MM/DD形式の日付文字列
 * @returns YYYY年MM月DD日形式の文字列
 * @example formatJapaneseDate('2024/03/15') // '2024年3月15日'
 */
export function formatJapaneseDate(dateStr: string): string {
  // 日付を分割
  const [year, month, day] = dateStr.split('/');
  return `${year}年${month}月${day}日`;
}

// 複雑なロジックには説明コメント
export function mapJapaneseKeysToEnglish(parsedData: JapaneseCsvRow[]): Transaction[] {
  // CSVの日本語キーを英語キーにマッピング
  const keyMap: Record<JapaneseKey, EnglishKey> = {
    日付: 'paidDate',
    内容: 'transactionName',
    '出金金額(円)': 'credit',
    メモ: 'note',
  };

  // 行頭が"振込"で、その後に1文字以上続くパターン
  const TRANSFER_PATTERN = /^振込＊.+/;

  // 処理続行...
}
```

### README更新ルール

1. **機能追加時**: 対応する機能説明を追加
2. **環境設定変更時**: セットアップ手順を更新
3. **依存関係変更時**: 必要なバージョン情報を更新

## Linter・フォーマッター設定

### ESLint設定

```javascript
// eslint.config.mjs
export default [
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-unused-vars': 'off', // TypeScriptが処理
      'no-console': 'warn',    // 本番前に確認
      'prefer-const': 'error', // 不変変数の推奨
    },
  },
];
```

### Prettier設定

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### 実行コマンド

```bash
# リンターチェック
npm run lint:check

# リンター自動修正
npm run lint

# フォーマッターチェック
npm run format:check

# フォーマッター実行
npm run format

# 型チェック
npm run type-check

# テスト実行
npm run test

# ビルド
npm run build
```

## 開発ワークフロー

### コミット前チェックリスト

- [ ] `npm run lint` でエラーなし
- [ ] `npm run type-check` でエラーなし
- [ ] `npm run test` で全テストパス
- [ ] `npm run build` でビルド成功
- [ ] 関連テストを追加・更新済み
- [ ] 日本語UI文字列の確認済み

### ブランチ戦略

- `main`: 本番環境用
- `develop`: 開発環境用
- `feature/*`: 機能開発用
- `hotfix/*`: 緊急修正用

この規約に従い、一貫性のある高品質なコードベースを維持しましょう。