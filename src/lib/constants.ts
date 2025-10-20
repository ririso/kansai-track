// ページネーション設定
export const PAGINATION = {
  RESET_PAGE: 1,
  DEFAULT_ITEMS_PER_PAGE: 5,
  DASHBOARD_TABLE_ITEMS: 3,
} as const;

// 金額関連
export const AMOUNTS = {
  DEFAULT_PAYMENT: 15000, // デフォルト月額返済額
  TOTAL_SCHOLARSHIP_AMOUNT: 2000000, // 奨学金総額
} as const;

// UI設定
export const UI = {
  TOAST_DURATION: 5000,
  ANIMATION_DURATION: 300,
} as const;

// API設定
export const API = {
  TIMEOUT: 30000, // 30秒
  RETRY_COUNT: 3,
} as const;

// 下位互換性のため
export const RESET_PAGE = PAGINATION.RESET_PAGE;
