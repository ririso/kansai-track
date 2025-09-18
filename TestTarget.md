# テスト対象コンポーネント一覧

このファイルは、テストが未作成のコンポーネントをまとめたものです。優先度順に整理されています。

## 完了済み（テストファイル作成済み）
- ✅ `src/components/common/Pagination.tsx`
- ✅ `src/components/common/ReturnLink.tsx`
- ✅ `src/components/dashboard/Greeting.tsx`
- ✅ `src/components/layout/Footer.tsx`
- ✅ `src/components/layout/Header.tsx`
- ✅ `src/components/ui/shadcn/button.tsx`

## 高優先度（機能コンポーネント）

### Dashboard関連
- 📋 `src/components/dashboard/ActivityCard.tsx`
  - タブ切り替え機能のテスト
  - カードレイアウトの表示テスト
  - RecentActivityコンポーネントとの連携テスト

- 📋 `src/components/dashboard/DashboardCard.tsx`
  - プロパティ（title, children等）の表示テスト
  - カードスタイルの適用テスト

- 📋 `src/components/dashboard/RepaymentCount.tsx`
  - 返済回数の表示テスト
  - 数値フォーマットのテスト

- 📋 `src/components/dashboard/RepaymentProgress.tsx`
  - プログレスバーの表示テスト
  - 進捗率の計算・表示テスト

- 📋 `src/components/dashboard/RepaymentSummary.tsx`
  - サマリー情報の表示テスト
  - 金額フォーマットのテスト

### Repayment関連
- 📋 `src/components/repayment/SortButton.tsx`
  - ソート方向の切り替えテスト
  - アイコンと表示テキストの変更テスト
  - onChangeDirectionコールバックのテスト

- 📋 `src/components/repayment/PeriodFilter.tsx`
  - 期間フィルタリング機能のテスト
  - フィルタ選択時のコールバックテスト

- 📋 `src/components/repayment/StatusFilter.tsx`
  - ステータスフィルタリング機能のテスト
  - フィルタ選択時のコールバックテスト

- 📋 `src/components/repayment/csv/CsvUploader.tsx`
  - ファイルアップロード機能のテスト
  - CSVファイルの検証テスト
  - エラーハンドリングのテスト

## 中優先度（UIコンポーネント）

### Shadcn UI関連
- 📋 `src/components/ui/shadcn/card.tsx`
  - Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter の表示テスト
  - className プロパティの適用テスト
  - forwardRef の動作テスト

- 📋 `src/components/ui/shadcn/input.tsx`
  - 基本入力機能のテスト
  - バリデーション機能のテスト
  - disabled状態のテスト

- 📋 `src/components/ui/shadcn/select.tsx`
  - 選択機能のテスト
  - オプション表示のテスト
  - 選択変更時のコールバックテスト

- 📋 `src/components/ui/shadcn/table.tsx`
  - テーブル構造の表示テスト
  - レスポンシブ対応のテスト

- 📋 `src/components/ui/shadcn/tabs.tsx`
  - タブ切り替え機能のテスト
  - アクティブタブの表示テスト

## 低優先度（表示中心・複雑なコンポーネント）

### Dashboard関連
- 📋 `src/components/dashboard/DashboardMain.tsx`
  - メインレイアウトの表示テスト
  - 子コンポーネントとの連携テスト

- 📋 `src/components/dashboard/RepaymentHistory.tsx`
  - 履歴データの表示テスト
  - ページネーションとの連携テスト

- 📋 `src/components/dashboard/RepaymentHistoryArea.tsx`
  - 履歴エリアの表示テスト

- 📋 `src/components/dashboard/RepaymentScheduleTable.tsx`
  - スケジュールテーブルの表示テスト
  - データソートのテスト

### Repayment関連
- 📋 `src/components/repayment/RepaymentHistoryHeader.tsx`
  - ヘッダー情報の表示テスト

- 📋 `src/components/repayment/RepaymentScheduleDetailTable.tsx`
  - 詳細テーブルの表示テスト
  - フィルタリング機能のテスト

- 📋 `src/components/repayment/ScheduleMain.tsx`
  - メインスケジュール画面の表示テスト

- 📋 `src/components/repayment/DummyRow.tsx`
  - ダミーデータ行の表示テスト

### その他UI関連
- 📋 `src/components/ui/shadcn/avatar.tsx`
  - アバター表示のテスト
  - フォールバック表示のテスト

- 📋 `src/components/ui/shadcn/badge.tsx`
  - バッジの表示テスト
  - バリアント（色・サイズ）のテスト

- 📋 `src/components/ui/shadcn/dialog.tsx`
  - ダイアログの開閉テスト
  - オーバーレイ機能のテスト

- 📋 `src/components/ui/shadcn/dropdown-menu.tsx`
  - ドロップダウンメニューの表示・選択テスト

- 📋 `src/components/ui/shadcn/label.tsx`
  - ラベルの表示テスト
  - フォーム要素との関連付けテスト

- 📋 `src/components/ui/shadcn/progress.tsx`
  - プログレスバーの表示・進捗テスト

## テスト作成時の注意事項

### 依存関係の多いコンポーネント
以下のコンポーネントは外部依存が多いため、適切なモックが必要：
- `ActivityCard.tsx` - RecentActivityコンポーネントに依存
- `CsvUploader.tsx` - ファイルアップロード機能、外部API依存の可能性
- `RepaymentScheduleDetailTable.tsx` - 複数のフィルターコンポーネントに依存

### モックが必要なライブラリ
- `lucide-react` - SortButton等で使用されるアイコン
- `@/lib/utils` - cn関数（クラス名結合）
- `@/types/enums/sortDirection` - SortButton等で使用される型

### 推奨テスト作成順序
1. 高優先度の機能コンポーネントから開始
2. UIコンポーネント（shadcn）を中優先度で実装
3. 複雑な表示コンポーネントを最後に実装

## 進捗管理
- 各コンポーネントのテスト完了時は、このファイルの該当行を ✅ に変更
- 新しいコンポーネントが追加された場合は、適切な優先度で追加