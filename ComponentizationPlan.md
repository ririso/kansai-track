# コンポーネント化改善提案書

このドキュメントは、プロジェクト全体を調査してコンポーネント化できる箇所をまとめた改善提案書です。

## 📋 目次

- [高優先度（即座に対応推奨）](#高優先度即座に対応推奨)
- [中優先度（次回スプリント推奨）](#中優先度次回スプリント推奨)
- [低優先度（長期改善）](#低優先度長期改善)
- [実装順序推奨](#実装順序推奨)
- [期待される全体効果](#期待される全体効果)

## 🔧 高優先度（即座に対応推奨）

### 1. 統計カードの重複解消

**対象ファイル:**
- `src/components/dashboard/RepaymentSummary.tsx`
- `src/components/dashboard/RepaymentCount.tsx`
- `src/app/payments/page.tsx`

**現在の問題点:**
- 同じ構造の統計カードが3箇所で重複実装
- アイコン・タイトル・値・背景色のパターンが統一されていない
- スタイリングの一貫性が欠けている

**提案するコンポーネント:**
```typescript
// StatisticCard.tsx
interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor: 'blue' | 'green' | 'orange' | 'red';
  valueColor?: string;
  subtitle?: string;
}
```

**期待される効果:**
- コードの重複を60%削減
- デザインの一貫性向上
- 保守性の大幅改善

---

### 2. 返済スケジュールテーブルの統合

**対象ファイル:**
- `src/components/dashboard/RepaymentScheduleTable.tsx`
- `src/components/repayment/RepaymentScheduleDetailTable.tsx`

**現在の問題点:**
- 99%同じ構造のテーブルが2つ存在
- ステータスバッジのスタイリングロジックが重複
- CalendarIcon + 日付表示のパターンが繰り返し

**提案するコンポーネント:**
```typescript
// 統合版テーブル
RepaymentScheduleTable.tsx

// 分割コンポーネント
RepaymentStatusBadge.tsx
DateWithIcon.tsx
```

**期待される効果:**
- コード重複の95%削除
- テーブル仕様の統一
- バグ修正時の作業効率化

---

### 3. ScheduleMainコンポーネントの分割

**対象ファイル:**
- `src/components/repayment/ScheduleMain.tsx` (123行)

**現在の問題点:**
- フィルタリング・検索・ソート・ページネーションロジックが混在
- 状態管理が複雑化
- 単一コンポーネントが肥大化

**提案する分割構造:**
```
ScheduleMain/
├── ScheduleFilters.tsx      # 検索・フィルタUI
├── ScheduleTable.tsx        # テーブル表示
├── useScheduleFilters.ts    # フィルタリングロジック
└── index.tsx               # メインコンポーネント
```

**期待される効果:**
- 単一責任原則の適用
- テスタビリティの向上
- ロジックの再利用性向上

## 📈 中優先度（次回スプリント推奨）

### 4. Paymentsページの構造分割

**対象ファイル:**
- `src/app/payments/page.tsx` (397行)

**現在の問題点:**
- 巨大なページコンポーネント
- レイアウト・統計・テーブル・フィルタが混在
- 大量のコメントアウトされたコード

**提案する分割構造:**
```
payments/
├── PaymentsHeader.tsx       # ページヘッダー
├── PaymentsStatistics.tsx   # 統計表示
├── PaymentsTable.tsx        # メインテーブル
├── PaymentsNotice.tsx       # 注意書き
└── page.tsx                # 構成のみ
```

**期待される効果:**
- 責任分離による保守性向上
- 不要なコードの削除
- パフォーマンス改善

---

### 5. フィルターコンポーネントの汎用化

**対象ファイル:**
- `src/components/repayment/StatusFilter.tsx`
- `src/components/repayment/PeriodFilter.tsx`

**現在の問題点:**
- 似た構造のフィルターコンポーネントが個別実装
- Select系コンポーネントのパターンが統一されていない

**提案するコンポーネント:**
```typescript
// GenericFilter.tsx
interface GenericFilterProps<T> {
  value: T;
  onChangeValue: (value: T) => void;
  options: Array<{ value: T; label: string }>;
  placeholder: string;
  width?: string;
}
```

**期待される効果:**
- フィルタータイプ追加の容易性
- 一貫したUX提供
- コード量削減

---

### 6. RepaymentHistoryHeaderのProps過多解消

**対象ファイル:**
- `src/components/repayment/RepaymentHistoryHeader.tsx`

**現在の問題点:**
- 10個のpropsを受け取る
- 検索・フィルタ・ソート・ページネーション制御が混在
- Props Drilling発生

**提案する改善:**
```typescript
// カスタムフック
useRepaymentHistoryFilters.ts

// 分割コンポーネント
RepaymentHistoryFilters.tsx  # フィルタ部分のみ
RepaymentHistoryHeader.tsx   # 簡素化版
```

**期待される効果:**
- Props Drillingの解消
- 関心の分離
- テストの簡素化

## 📋 低優先度（長期改善）

### 7. ステータスバッジの統一

**対象:**
- 複数ファイルで重複するBadgeスタイリングロジック

**提案するコンポーネント:**
```typescript
// RepaymentStatusBadge.tsx
interface RepaymentStatusBadgeProps {
  status: RepaymentStatus;
}
```

**期待される効果:**
- スタイル定義の一元化
- ステータス表示の一貫性向上

---

### 8. カード型レイアウトの標準化

**現在の問題点:**
- `border-0 shadow-custom animate-fade-in bg-white`の繰り返し
- カードヘッダーの構造が統一されていない

**提案するコンポーネント:**
```typescript
// StandardCard.tsx
// CardHeader.tsx (titleとactionボタンを含む)
```

**期待される効果:**
- デザインシステムの構築
- 視覚的一貫性の向上

---

### 9. 支払いモーダルの状態別分割

**対象ファイル:**
- `src/components/bak/payment-modal.tsx`

**現在の問題点:**
- 複雑な状態管理による条件分岐
- モーダル内容が状態によって大きく変わる

**提案する分割構造:**
```
PaymentModal/
├── PaymentForm.tsx          # フォーム画面
├── PaymentProcessing.tsx    # 処理中画面
├── PaymentSuccess.tsx       # 完了画面
├── usePaymentFlow.ts        # 状態管理
└── index.tsx               # メインコンポーネント
```

**期待される効果:**
- 各状態のロジック分離
- テストの容易性向上
- 状態遷移の明確化

## 🎯 実装順序推奨

### フェーズ1: 重複解消（1週間）
1. **統計カード統合** → 即座に大きな効果
2. **テーブル統合** → バグ修正効率大幅向上

### フェーズ2: 構造改善（2週間）
3. **ScheduleMain分割** → 開発体験向上
4. **Paymentsページ分割** → パフォーマンス改善

### フェーズ3: 汎用化（1週間）
5. **フィルター汎用化** → 機能拡張の基盤構築
6. **Props過多解消** → 保守性向上

### フェーズ4: 長期改善（随時）
7. **デザインシステム構築** → ブランド価値向上

## 📊 期待される全体効果

### 🎯 定量的効果
- **コード削減**: 30-40%の重複削除
- **ファイル数削減**: 大型コンポーネントの分割による管理効率化
- **バグ修正時間**: 70%短縮（共通コンポーネント化により）

### 🚀 定性的効果
- **保守性向上**: バグ修正・デザイン変更工数削減
- **開発効率**: 既存コンポーネント再利用促進
- **品質向上**: テスト可能性向上、バグ発生率削減
- **一貫性**: UI/UXの統一とブランド価値向上
- **チーム生産性**: 新機能開発時の効率化

### 🔍 技術的メリット
- **単一責任原則**: 各コンポーネントの役割明確化
- **再利用性**: 汎用コンポーネントによる開発速度向上
- **テスタビリティ**: 小さなコンポーネント単位でのテスト容易性
- **型安全性**: TypeScriptの恩恵を最大化

## 📅 次のアクション

1. **優先順位の決定**: どのフェーズから開始するかチーム内で合意
2. **実装担当者の割り当て**: 各コンポーネントの責任者決定
3. **影響範囲の確認**: 既存テストの修正必要箇所の洗い出し
4. **段階的実装**: 一度に全てを変更せず、段階的にリファクタリング

---

**作成日**: 2025-01-25
**最終更新**: 2025-01-25
**ステータス**: 🔄 提案中