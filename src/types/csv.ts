// CSV関連の型定義

// 日本語キーのCSVデータ（銀行明細）
export interface JapaneseCsvRow {
  日付?: string;
  内容?: string;
  "出金金額(円)"?: string | number;
  "入金金額(円)"?: string | number;
  "残高(円)"?: string | number;
  メモ?: string;
  [key: string]: string | number | undefined;
}

// パース済みCSVデータ
export interface ParsedCsvData {
  data: JapaneseCsvRow[];
  errors: any[];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
  };
}

// CSVアップロード結果
export interface CsvUploadResult {
  success: boolean;
  data?: JapaneseCsvRow[];
  error?: string;
  recordCount?: number;
}