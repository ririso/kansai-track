# プロジェクト課題分析レポート

> 分析日: 2025-09-27
> 対象: kansai-track プロジェクト全体

## 📋 概要

このレポートは、プロジェクト全体を分析して特定された課題を優先度順にまとめたものです。技術的負債の解消と保守性向上のために、計画的な改善を推奨します。

---

## 🚨 最高優先度課題 (High)

### 1. バックアップディレクトリの混在
- **場所**: `src/components/bak/`
- **問題**: 本番コードと並列でバックアップファイルが存在
- **影響**:
  - プロジェクト構造の混乱
  - 不要なファイルサイズ増加（7ファイル）
  - 開発者の混乱を招く
- **改善案**:
  ```bash
  # オプション1: 削除
  rm -rf src/components/bak/

  # オプション2: .gitignoreに追加
  echo "src/components/bak/" >> .gitignore
  ```

### 2. 重複する関数実装
- **場所**:
  - `src/utils/reconcileScheduleWithCSV.ts`
  - `src/utils/newReconcileScheduleWithCSV.ts`
- **問題**: 同じようなCSV照合機能の重複実装
- **改善案**: 機能差分を明確化し、1つに統合

### 3. 未実装の関数
- **場所**: `src/utils/calculateTotalPayments.ts`
- **問題**:
  ```typescript
  // 実装が空で常に0を返す
  const totalDeposit = 0;
  const totalWithdrawal = 0;
  return { totalDeposit, totalWithdrawal };
  ```
- **改善案**: 実装完了または削除

### 4. デバッグコードの残存 (15箇所)
- **主な場所**:
  - `src/lib/api/` - 9箇所のconsole.log
  - `src/components/repayment/csv/CsvUploader.tsx` - 5箇所
  - `src/app/error.tsx` - 1箇所
- **改善案**:
  ```typescript
  // 削除対象
  console.log(...);
  console.info(...);
  console.error(...);

  // 必要に応じて適切なロギングに置換
  ```

---

## ⚠️ 高優先度課題 (Medium)

### 5. テストファイルの配置不統一
- **問題**: テストが2箇所に分散
  - `__tests__/` (34ファイル)
  - `src/hooks/__tests__/` (1ファイル)
- **改善案**: 配置戦略を統一

### 6. 型定義の未完成
- **場所**: `src/types/repaymentHistoryType.ts:8`
- **問題**: `updatedAt: string; //todo 型を確認する`
- **改善案**:
  ```typescript
  // 現在
  updatedAt: string; //todo 型を確認する

  // 改善後
  updatedAt: Date | string; // ISO 8601形式
  ```

### 7. 設定ファイルの拡張子不統一
- **問題**: JavaScript設定ファイルが混在
  - `.mjs`: `eslint.config.mjs`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.mjs`
  - `.js`: `jest.config.js`, `babel.config.js`
- **改善案**: 拡張子を`.mjs`に統一

---

## 📊 中優先度課題 (Low)

### 8. テストカバレッジ不足
- **現状**: 90個のTSファイルに対し、テスト35個（39%）
- **特に不足**:
  - `src/utils/` - 11ファイル中テストなし
  - `src/lib/` - 7ファイル中テストなし
- **改善案**: ユーティリティ関数とAPIライブラリのテスト追加

### 9. エラーハンドリング不統一
- **場所**: `src/components/repayment/csv/CsvUploader.tsx:63-67`
- **問題**: エラー処理がconsole.errorのみ
- **改善案**: 統一されたエラーハンドリング戦略

---

## 📈 改善ロードマップ

### フェーズ1: 緊急対応 (1週間)
1. ✅ バックアップディレクトリ整理
2. ✅ デバッグコード削除
3. ✅ 未実装関数の対応

### フェーズ2: 構造改善 (2週間)
1. ✅ 重複関数の統合
2. ✅ テストファイル配置統一
3. ✅ 型定義の完成

### フェーズ3: 品質向上 (1ヶ月)
1. ✅ 設定ファイル統一
2. ✅ テストカバレッジ向上
3. ✅ エラーハンドリング統一

---

## 🎯 期待される効果

### 技術的効果
- **コード品質**: ESLint警告15個→0個
- **保守性**: 重複コード削除、明確な構造
- **安全性**: 型安全性向上、エラーハンドリング強化

### チーム効果
- **開発効率**: 統一された規約、明確な構造
- **品質保証**: テストカバレッジ向上
- **新人対応**: 分かりやすいプロジェクト構造

---

## 📝 推奨アクション

### 即座に対応すべき項目
```bash
# 1. バックアップディレクトリ削除
rm -rf src/components/bak/

# 2. デバッグコード一括削除
npm run lint -- --fix

# 3. ビルド確認
npm run build && npm run type-check
```

### 段階的に改善すべき項目
1. **重複関数の統合**: 機能要件を確認後、統合計画を策定
2. **テスト追加**: CI/CD パイプラインでカバレッジ閾値設定
3. **型定義改善**: TypeScript strict モード対応

---

## 🔧 ツール・設定推奨

### 品質管理
```json
// package.json
{
  "scripts": {
    "lint:fix": "eslint src --fix",
    "test:coverage": "jest --coverage --coverageThreshold='{\"global\":{\"lines\":80}}'",
    "quality:check": "npm run lint:check && npm run type-check && npm run test:coverage"
  }
}
```

### Git Hooks
```bash
# pre-commit での品質チェック
npm install --save-dev husky lint-staged
```

このレポートに基づき、計画的な改善により、プロジェクトの長期的な保守性と開発効率を大幅に向上させることができます。