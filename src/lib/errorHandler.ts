/**
 * 統一されたエラーハンドリングユーティリティ
 */

export type ErrorType = 'API_ERROR' | 'NETWORK_ERROR' | 'VALIDATION_ERROR' | 'FILE_ERROR' | 'UNKNOWN_ERROR';

export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: Error;
  timestamp: Date;
}

/**
 * アプリケーション共通のエラーを作成
 */
export function createAppError(
  type: ErrorType,
  message: string,
  originalError?: Error
): AppError {
  return {
    type,
    message,
    originalError,
    timestamp: new Date(),
  };
}

/**
 * APIエラーのハンドリング
 */
export function handleApiError(error: unknown, context: string): AppError {
  if (error instanceof Error) {
    if (error.message.includes('fetch')) {
      return createAppError('NETWORK_ERROR', `ネットワークエラーが発生しました: ${context}`, error);
    }
    return createAppError('API_ERROR', `API呼び出しエラー: ${context} - ${error.message}`, error);
  }
  return createAppError('UNKNOWN_ERROR', `不明なエラー: ${context}`, error as Error);
}

/**
 * ファイル処理エラーのハンドリング
 */
export function handleFileError(error: unknown, filename?: string): AppError {
  const context = filename ? `ファイル "${filename}" の処理中` : 'ファイル処理中';

  if (error instanceof Error) {
    return createAppError('FILE_ERROR', `${context}にエラーが発生しました: ${error.message}`, error);
  }
  return createAppError('FILE_ERROR', `${context}に不明なエラーが発生しました`, error as Error);
}

/**
 * エラーメッセージの統一的な表示
 */
export function getDisplayMessage(error: AppError): string {
  switch (error.type) {
    case 'NETWORK_ERROR':
      return 'インターネット接続を確認してください。';
    case 'API_ERROR':
      return 'サーバーとの通信中にエラーが発生しました。しばらく待ってから再試行してください。';
    case 'FILE_ERROR':
      return 'ファイルの処理中にエラーが発生しました。ファイル形式を確認してください。';
    case 'VALIDATION_ERROR':
      return error.message; // バリデーションエラーはそのまま表示
    default:
      return '予期しないエラーが発生しました。サポートまでお問い合わせください。';
  }
}

/**
 * 開発環境でのエラーログ出力（本番では無効化）
 */
export function logError(error: AppError): void {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.group(`🚨 ${error.type}: ${error.message}`);
    // eslint-disable-next-line no-console
    console.log('Time:', error.timestamp.toISOString());
    if (error.originalError) {
      // eslint-disable-next-line no-console
      console.error('Original Error:', error.originalError);
    }
    // eslint-disable-next-line no-console
    console.groupEnd();
  }
}